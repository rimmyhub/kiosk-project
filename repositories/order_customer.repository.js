const { Order_customer } = require('../models');

class OrderCustomerRepository {
  createOrderCustomer = async (state) => {
    const createOrderCustomer = await Order_customer.create({ state });
    return createOrderCustomer;
  };
}

module.exports = OrderCustomerRepository;
