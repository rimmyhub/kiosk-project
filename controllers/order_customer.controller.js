const OrderCustomerService = require('../services/order_customer.service');

class OrderCustomerController {
  orderCustomerService = new OrderCustomerService();

  createOrderCustomer = async (req, res) => {
    try {
      const { state } = req.body;

      const orderCustomer = await this.orderCustomerService.createOrderCustomer(state);

      if (!orderCustomer) {
        return res.status(400).json({ message: '주문한 고객 정보가 없습니다' });
      }

      return res.status(200).json({ message: '주문이 완료되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  modifyOrderCustomer = async (req, res) => {
    try {
      const { order_customer_id } = req.params;
      const { state } = req.body;

      const orderCustomer = await this.orderCustomerService.modifyOrderCustomer(
        order_customer_id,
        state
      );

      if (!orderCustomer) {
        return res.status(400).json({ message: '주문한 고객 정보가 없습니다' });
      }

      return res.status(200).json({ message: '주문 정보가 수정되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };
}

module.exports = OrderCustomerController;
