const ItemOrderCustomerRepository = require('../repositories/item_order_customer.repository');

class ItemOrderCustomerService {
  itemOrderCustomerRepository = new ItemOrderCustomerRepository();

  // 고객 상품 주문
  createItemOrderCustomer = async (item_id, order_customer_id, option_id, amount, price) => {
    const itemOrderCustomer = await this.itemOrderCustomerRepository.createItemOrderCustomer(
      item_id,
      order_customer_id,
      option_id,
      amount,
      price
    );
    return itemOrderCustomer;
  };

  modifyItemOrderCustomer = async (item_order_customer_id) => {
    const itemOrderCustomer = await this.itemOrderCustomerRepository.modifyItemOrderCustomer(
      item_order_customer_id
    );
    return itemOrderCustomer;
  };
}

module.exports = ItemOrderCustomerService;
