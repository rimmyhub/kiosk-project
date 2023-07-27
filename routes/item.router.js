const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

// 전체 상품 조회
router.get('/items', itemController.getAllItem);

// 상품 조회
router.get('/items/:item_id', itemController.getItem);

// 상품 등록 (유저정보 추가 예정)
router.post('/items', itemController.postItem);

// 상품 수정

// 상품 삭제

module.exports = router;
