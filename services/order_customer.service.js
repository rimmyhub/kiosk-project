const OrderCustomerRepository = require('../repositories/order_customer.repository');

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();

  createOrderCustomer = async (state) => {
    const createOrderCustomer = await this.orderCustomerRepository.createOrderCustomer(state);
    return createOrderCustomer;
  };
}

module.exports = OrderCustomerService;
