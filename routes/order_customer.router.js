const express = require('express');
const OrderCustomerController = require('../controllers/order_customer.controller');
const orderCustomerRouter = express.Router();

const orderCustomerController = new OrderCustomerController();

// 고객 상품 주문 등록
orderCustomerRouter.post('/order-customer', orderCustomerController.createOrderCustomer);

// 상품 주문 수정
orderCustomerRouter.put(
  '/order-customer/:order_customer_id',
  orderCustomerController.modifyOrderCustomer
);

module.exports = orderCustomerRouter;
