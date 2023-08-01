const { Order_item, Item, sequelize } = require('../models');
const { Transaction } = require('sequelize');

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

  // 발주 상품 상태 변경
  createStateTransaction = async (item_id, order_item_id, amount, state) => {
    // 주문 아이템 id 찾기
    const orderItem = await Order_item.findOne({
      where: { order_item_id },
    });

    // orderitem 내의 item_id 찾기
    const item = await Item.findByPk(orderItem.item_id);

    // Item에 item_id 찾기
    const currentStock = await Item.findOne({ where: { item_id } });

    // 상품을 취소하는데 가지고 있는 상품보다 취소할 상품이 더 많을 경우 에러 반환
    if (amount > currentStock.amount && state === 'canceled') {
      throw new Error('현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.');
    }

    // 트랜직션 제한 레벨 설정
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      // 조건 없이 수정
      if (orderItem.state === 'ordered' && state === 'pending') {
        await orderItem.update({ state }, { transaction: t });
      } else if (
        (orderItem.state === 'ordered' || orderItem.state === 'pending') &&
        state === 'canceled'
      ) {
        await orderItem.update({ state }, { transaction: t });
      }

      // pending 상태에서 completed로 변환할 경우
      //item의 갯수는 발주한 상품 갯수만큼 커지고 상태는 completed로 표시
      if (orderItem.state === 'pending' && state === 'completed') {
        await item.increment({ amount }, { transaction: t });
        await orderItem.update({ state }, { transaction: t });
      }

      // 이미 상품발주가 완료된 상황에서 변화할 경우 취소한 상품만큼 갯수 감소시키고 제공하는 상태값으로 변화
      if (
        orderItem.state === 'completed' &&
        (state === 'canceled' || state === 'pending' || state === 'ordered')
      ) {
        await item.increment({ amount: -amount }, { transaction: t });
        await orderItem.update({ state }, { transaction: t });
      }

      // 위 내용을 저장
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
