const express = require('express');
const ownerRouter = express.Router();

// const AuthMiddleware = require('../middleware/auth.middleware');
// const auth = new AuthMiddleware();

const OwnerController = require('../controllers/owner.controller');
const ownerController = new OwnerController();

//회원가입
ownerRouter.post('/signup/owner', ownerController.signupOwner);

//로그인
ownerRouter.post('/login/owner', ownerController.loginOwner);

//로그인 이메일 인증
ownerRouter.post('login/owner/email', ownerController.sendVerificationEmail);

//회원 탈퇴
ownerRouter.delete('/leave/owner', ownerController.leaveOwner);

module.exports = ownerRouter;
