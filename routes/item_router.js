const express = require('express');
const ItemController = require('../controllers/item.controller');
const itemRouter = express.Router();

const itemController = new ItemController();

// 상품 조회
router.post('/item', itemController.getItem);

// 상품 등록

// 상품 수정

// 상품 삭제

module.exports = itemRouter;
