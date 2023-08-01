const { Order_customer, Item_order_customer, Item, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class OrderCustomerRepository {
  // 고객 상품 생성
  createOrderCustomer = async (state) => {
    const createOrderCustomer = await Order_customer.create({ state });
    return createOrderCustomer;
  };

  //고객 상품 주문
  // 1. 완료된 주문은 취소할 수 없음, false로 취소할 경우 주문 데이터 삭제
  // 2. 완료된 주문일 경우 주문 갯수만큼 item의 amount가 감소
  modifyOrderCustomer = async (order_customer_id, state) => {
    // 트랜직션 제한 수준 설정
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    // 주문 고객 아이디 가져오기
    const orderCustomer = await Order_customer.findOne({
      where: { order_customer_id },
    });

    // itemordercustomer db안에 order_customer_id 가져오기
    const itemOrderCustomer = await Item_order_customer.findOne({ where: { order_customer_id } });

    try {
      // 이미 완료된 주문은 취소 불가
      if (orderCustomer.state === true) {
        throw new Error('완료된 주문은 취소할 수 없습니다');
        // false로 수정요청한다면 데이터 삭제
      } else if (state === false) {
        await itemOrderCustomer.destroy({ transaction: t });
        await orderCustomer.destroy({ transaction: t });
      }

      // 위 내용을 ordercustomer에 상태 업데이트
      await orderCustomer.update({ state }, { transaction: t });

      // 고객 주문이 true일 경우 Item의 amount를 가져와서 주문 갯수만큼 감소시켜줌
      const item = await Item.findByPk(itemOrderCustomer.item_id, { transaction: t });
      await item.decrement('amount', { by: itemOrderCustomer.amount, transaction: t });

      await t.commit();
      return { message: '고객 주문 상태 변경에 성공하였습니다' };
    } catch (err) {
      console.log(err);
      await t.rollback();
      throw new Error(err.message);
    }
  };
}

module.exports = OrderCustomerRepository;
