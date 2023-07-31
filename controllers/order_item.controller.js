const OrderItemService = require('../services/order_item.service');

class OrderItemController {
  orderItemService = new OrderItemService();

  // 상품 발주
  createOrderItem = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      const { item_id } = req.params;
      const { amount, state } = req.body;

      if (!item_id) return res.status(400).json({ message: '상품이 존재하지 않습니다' });
      console.log(item_id);

      const orderItem = await this.orderItemService.createOrderItem(
        owner_id,
        item_id,
        amount,
        state
      );

      if (!orderItem)
        return res.status(400).json({ message: '발주된 상품 정보 등록을 실패하였습니다' });

      res.status(200).json({ message: '발주된 상품 정보를 등록하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 상품 발주 수정
  modifyOrderItem = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      const { amount, state } = req.body;
      const { order_item_id } = req.params;
      const orderItem = await this.orderItemService.findOrderItemById(order_item_id);

      if (!orderItem) return res.status(404).json({ message: '상품 발주 정보가 없습니다' });

      await this.orderItemService.modifyOrderItem(order_item_id, owner_id, amount, state);
      res.status(200).json({ message: '발주된 상품 정보를 수정하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 상품 상태 변경
  createStateTransaction = async (req, res) => {
    try {
      const { amount, state } = req.body;
      const { item_id, order_item_id } = req.params;

      const createStateTransaction = await this.orderItemService.createStateTransaction(
        item_id,
        order_item_id,
        amount,
        state
      );
      if (!createStateTransaction)
        return res.status(404).json({ message: '주문 항목을 찾을 수 없습니다' });

      res.status(200).json(createStateTransaction);
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };
}
module.exports = OrderItemController;
