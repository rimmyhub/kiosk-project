const { Order_item, Item } = require('../models');

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
    console.log(owner_id);
    const modifyOrderItem = await Order_item.update(
      { amount, state },
      {
        where: {
          order_item_id,
          owner_id,
        },
        // include: [
        //   {
        //     model: Item,
        //     // attributes: ['owner_id'], // 모델에 owner_id가 있어야 조회할 수 있어..
        //   },
        // ],
      }
    );
    return modifyOrderItem;
  };
}

module.exports = OrderItemRepository;
