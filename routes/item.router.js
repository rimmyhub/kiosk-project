const express = require('express');
const itemRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

// 전체 상품 조회
itemRouter.get('/items', itemController.findAllItem);

// 특정 상품 조회
itemRouter.get('/items/:item_id', itemController.findItem);

// 상품 등록
itemRouter.post('/items', auth.verifyAccessToken, itemController.createItem);

// 상품 수정
itemRouter.put('/items/:item_id', auth.verifyAccessToken, itemController.modifyItem);

// 상품 삭제
itemRouter.delete('/items/:item_id', auth.verifyAccessToken, itemController.deleteItem);

module.exports = itemRouter;
