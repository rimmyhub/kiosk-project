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

// 발주 상품 상태 변경
OrderItemRouter.put(
  '/items/:item_id/order-items/:order_item_id',
  orderItemController.createStateTransaction
);

module.exports = OrderItemRouter;
