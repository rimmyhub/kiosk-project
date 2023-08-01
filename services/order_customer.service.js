const OrderCustomerRepository = require('../repositories/order_customer.repository');

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();

  createOrderCustomer = async (state) => {
    const orderCustomer = await this.orderCustomerRepository.createOrderCustomer(state);
    return orderCustomer;
  };

  modifyOrderCustomer = async (order_customer_id, state) => {
    const orderCustomer = await this.orderCustomerRepository.modifyOrderCustomer(
      order_customer_id,
      state
    );
    return orderCustomer;
  };
}

module.exports = OrderCustomerService;
