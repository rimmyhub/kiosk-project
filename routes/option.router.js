const express = require('express');
const optionRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const OptionController = require('../controllers/option.controller');
const optionController = new OptionController();

// 옵션 등록
optionRouter.post('/option', auth.verifyAccessToken, optionController.crateOption);

// 옵션 수정
optionRouter.put('/option/:option_id', auth.verifyAccessToken, optionController.modifyOption);

module.exports = optionRouter;
