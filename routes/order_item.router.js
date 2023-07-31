const express = require('express');
const OrderItemRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const OrderItemController = require('../controllers/order_item.controller');

const orderItemController = new OrderItemController();

// 상품 발주
OrderItemRouter.post(
  '/items/:item_id/order-items',
  auth.verifyAccessToken,
  orderItemController.createOrderItem
);

// 상품 발주 수정
// OrderItemRouter.put(
//   '/items/:item_id/order-items/:order_item_id',
//   auth.verifyAccessToken,
//   orderItemController.modifyOrderItem
// );

// 상품 발주 상태 수정 ** 나중에 경로 다르게 바꾸기
OrderItemRouter.put(
  '/items/:item_id/order-items/:order_item_id',
  orderItemController.createStateTransaction
);

module.exports = OrderItemRouter;
