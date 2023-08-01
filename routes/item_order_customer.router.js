const express = require('express');
const ItemOrderCustomerController = require('../controllers/item_order_customer.controller');

const itemOrderCustomerRouter = express.Router();

const itemOrderCustomerController = new ItemOrderCustomerController();

// 고객 상품 주문
itemOrderCustomerRouter.post(
  '/item-order-customer/item/:item_id/order-customer/:order_customer_id/option/:option_id',
  itemOrderCustomerController.createItemOrderCustomer
);

module.exports = itemOrderCustomerRouter;
