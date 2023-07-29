const OrderItemRepository = require('../repositories/order_item.repository');

class OrderItemService {
  orderItemRepository = new OrderItemRepository();

  // 상품 발주 내역 추가
  createOrderItem = async (owner_id, item_id, amount, state) => {
    const createOrderItem = await this.orderItemRepository.createOrderItem(
      owner_id,
      item_id,
      amount,
      state
    );
    return createOrderItem;
  };

  // 상품 발주 조회
  findOrderItemById = async (order_item_id) => {
    const findOrderItem = await this.orderItemRepository.findOrderItemById(order_item_id);
    return findOrderItem;
  };

  // 상품 발주 상태 수정
  modifyOrderItem = async (order_item_id, owner_id, amount, state) => {
    const modifyOrderItem = await this.orderItemRepository.modifyOrderItem(
      order_item_id,
      owner_id,
      amount,
      state
    );
    return modifyOrderItem;
  };
}
module.exports = OrderItemService;
