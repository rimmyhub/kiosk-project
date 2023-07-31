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

  // // 상품 발주 수정
  // modifyOrderItem = async (order_item_id, owner_id, amount, state) => {
  //   const modifyOrderItem = await this.orderItemRepository.modifyOrderItem(
  //     order_item_id,
  //     owner_id,
  //     amount,
  //     state
  //   );
  //   return modifyOrderItem;
  // };

  // 상품 상태 변경
  createStateTransaction = async (item_id, order_item_id, amount, state) => {
    try {
      const createStateTransaction = await this.orderItemRepository.createStateTransaction(
        item_id,
        order_item_id,
        amount,
        state
      );
      return createStateTransaction;
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  };
}
module.exports = OrderItemService;
