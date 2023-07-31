const express = require('express');
const OrderCustomerController = require('../controllers/order_customer.controller');
const orderCustomerRouter = express.Router();

const orderCustomerController = new OrderCustomerController();

// 상품 주문
orderCustomerRouter.post('/order_customer', orderCustomerController.createOrderCustomer);

// 상품 주문 수정
orderCustomerRouter.put(
  '/order_customer/:order_customer',
  orderCustomerController.modifyOrderCustomer
);

module.exports = orderCustomerRouter;
