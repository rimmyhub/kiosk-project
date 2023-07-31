const OrderCustomerService = require('../services/order_customer.service');

class OrderCustomerController {
  orderCustomerService = new OrderCustomerService();

  createOrderCustomer = async (req, res) => {
    try {
      const { state } = req.body;

      const orderCustomer = await this.orderCustomerService.createOrderCustomer(state);
      return res.status(200).json({ message: '주문이 완료되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  modifyOrderCustomer = async (req, res) => {
    const { order_customer_id } = req.params;
    const { state } = req.body;
  };
}

module.exports = OrderCustomerController;
