const { Order_item, Item, sequelize } = require('../models');
const { Transaction } = require('sequelize');
// const sqlite3 = require('sqlite3').verbose()

// const db = new sqlite3.Database(':memory:')

class OrderItemRepository {
  //상품 발주 내역 추가
  createOrderItem = async (owner_id, item_id, amount, state) => {
    const createOrderItem = await Order_item.create({ owner_id, item_id, amount, state });
    return createOrderItem;
  };

  // 상품 발주 아이디 찾기
  findOrderItemById = async (order_item_id) => {
    const findOrderItem = await Order_item.findByPk(order_item_id);
    return findOrderItem;
  };

  // 상품 발주 수정

  modifyOrderItem = async (order_item_id, owner_id, amount, state) => {
    const modifyOrderItem = await Order_item.update(
      { amount, state },
      {
        where: {
          order_item_id,
          owner_id,
        },
      }
    );
    return modifyOrderItem;
  };

  createStateTransaction = async (item_id, order_item_id, amount, state) => {
    const orderItem = await Order_item.findOne({
      where: { order_item_id },
    });

    const item = await Item.findByPk(orderItem.item_id);

    const currentStock = await Item.findOne({ where: { item_id } });

    if (amount > currentStock.amount && state === 'canceled') {
      throw new Error('현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.');
    }

    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      if (orderItem.state === 'ordered' && state === 'pending') {
        await orderItem.update({ state }, { transaction: t });
      } else if (
        (orderItem.state === 'ordered' || orderItem.state === 'pending') &&
        state === 'canceled'
      ) {
        await orderItem.update({ state }, { transaction: t });
      }

      if (orderItem.state === 'pending' && state === 'completed') {
        await item.increment({ amount }, { transaction: t });
        await orderItem.update({ state }, { transaction: t });
      }

      if (
        orderItem.state === 'completed' &&
        (state === 'canceled' || state === 'pending' || state === 'ordered')
      ) {
        await item.increment({ amount: -amount }, { transaction: t });
        await orderItem.update({ state }, { transaction: t });
      }

      await orderItem.save({ transaction: t });

      await t.commit();
      return { message: '상태 변경에 성공하였습니다' };
    } catch (err) {
      console.log(err);
      if (t) await t.rollback();
      throw new Error(err.message);
    }
  };
}

module.exports = OrderItemRepository;
