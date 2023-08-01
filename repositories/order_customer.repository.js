const { Order_customer, Item_order_customer, Item, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class OrderCustomerRepository {
  createOrderCustomer = async (state) => {
    const createOrderCustomer = await Order_customer.create({ state });
    return createOrderCustomer;
  };

  //고객 상품 주문
  modifyOrderCustomer = async (order_customer_id, state) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    const orderCustomer = await Order_customer.findOne({
      where: { order_customer_id },
    });

    const itemOrderCustomer = await Item_order_customer.findOne({ where: { order_customer_id } });

    console.log(itemOrderCustomer);
    try {
      if (state === true) {
        throw new Error('완료된 주문은 취소할 수 없습니다');
      } else if (state === false) {
        await itemOrderCustomer.destroy({ transaction: t });
        await orderCustomer.destroy({ transaction: t });
      }

      await orderCustomer.update({ state }, { transaction: t });

      // 아래의 코드는 itemOrderCustomer와 item의 관계에 따라 amount를 감소시키는 방식을 예시로 제공합니다.
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
