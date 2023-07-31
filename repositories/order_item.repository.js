const { Order_item, StateTransaction, Item, sequelize } = require('../models');
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

  // 상품 상태 변경
  createStateTransaction = async (order_item_id, amount, state, newStat) => {
    try {
      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      }); // 격리 수준 설정

      // 주문 항목을 조회
      const orderItem = await Order_item.findOne({
        where: { order_item_id },
        transaction: t,
      });

      if (!orderItem) {
        await t.rollback();
        throw new Error('주문 항목을 찾을 수 없습니다');
      }
      console.log(newStat, state);
      // 새로운 보류중 상태, 주문됨 상태일 때는 조건 없이 발주 상태 수정
      if (newStat === 'Pending' && state === 'Ordered') {
        await StateTransaction.create(
          {
            order_item_id,
            beforeState: orderItem.state, // orderItem의 state 상태값을
            afterState: newStat, // newStat
          },
          { transaction: t }
        );

        orderItem.state = newStat; // 주문 항목의 상태를 새로운 상태로 업데이트
        await orderItem.save({ transaction: t }); // 변경된 주문 항목의 상태를 데이터베이스에 저장
      } else if (
        // 하나의 조건만 있어야함 더 나눠서 하나씩만 판단할 수 있게 함
        // 새로운 주문 항목 상태가 취소로 변경되었고 현재가 주문됨, 대기중 상태일 경우
        (newStat === 'Canceled' && (state === 'Ordered' || state === 'Pending')) ||
        // 새로운 주문 항목 상태가 완료로 변경되었고 현재가 대기 중 상태인경우
        (newStat === 'Completed' && state === 'Pending')
        // 항목의 상태를 취소 또는 완료로 변경할 수 있는지 보는 것
      ) {
        const currentStock = await Item.findOne({ where: { amount } }); //현재 상품 재고를 가져옴

        // 발주 상태가 'Canceled'이고 주문한 수량(amount)이 현재 상품의 재고(currentStock)보다 큰 경우를 검사
        if (newStat === 'Canceled' && amount > currentStock) {
          await t.rollback();
          throw new Error('현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.');
        }

        await StateTransaction.create(
          //StateTransaction모델에 저장
          {
            order_item_id,
            beforeState: orderItem.state, // 변경 전 상태
            afterState: newStat, // 변경 후 상태
          },
          { transaction: t }
        );

        orderItem.state = newStat;
        // 주문 항목의 상태를 새로운 상태 newStat으로 업데이트. 이로 인해 주문 항목의 상태가 실제로 변경
        if (newStat === 'Canceled') {
          // 발주 취소 시 상품의 amount를 감소
          await Order_item.increment(
            { amount: -amount },
            { where: { order_item_id } },
            { transaction: t }
          );
        } else {
          // 'Canceled'가 아닌 경우 주문 항목의 상품 수량(amount)을 amount 만큼 증가
          await Order_item.increment({ amount }, { where: { order_item_id } }, { transaction: t });
        }
        await orderItem.save({ transaction: t }); // 상태를 orderItem에 저장

        //주문 항목의 상태가 'Completed'에서 'Ordered'로 변경되는 경우 다시 업데이트
      } else if (newStat === 'Ordered' && state === 'Completed') {
        await StateTransaction.create(
          {
            order_item_id,
            beforeState: orderItem.state,
            afterState: newStat,
          },
          { transaction: t }
        );

        orderItem.state = newStat;
        await orderItem.save({ transaction: t }); // 변경을 저장
      } else {
        // 잘못된 상태 변경 요청
        await t.rollback();
        throw new Error('유효하지 않은 상태 변경 요청입니다');
      }

      await t.commit();
      return { message: '상태 변경에 성공하였습니다' };
    } catch (err) {
      console.log(err);
      throw new Error('서버 오류로 인해 상태 변경에 실패하였습니다');
    }
  };
}

module.exports = OrderItemRepository;
