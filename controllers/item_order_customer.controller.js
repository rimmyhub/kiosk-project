const ItemOrderCustomerService = require('../services/item_order_customer.service');

class ItemOrderCustomerController {
  itemOrderCustomerService = new ItemOrderCustomerService();

  // 고객 상품 주문
  createItemOrderCustomer = async (req, res) => {
    try {
      const { item_id, order_customer_id, option_id } = req.params;
      const { amount, price } = req.body;

      const itemOrderCustomer = await this.itemOrderCustomerService.createItemOrderCustomer(
        item_id,
        order_customer_id,
        option_id,
        amount,
        price
      );

      if (!itemOrderCustomer) {
        return res.status(400).json({ message: '주문된 상품 정보가 없습니다' });
      }
      res.status(200).json({ message: '상품 주문이 완료되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      res.status(400).json({ message: `${err.message}` });
    }
  };
}

module.exports = ItemOrderCustomerController;
