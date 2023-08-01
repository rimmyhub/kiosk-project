const AuthMiddleware = require('../middleware/auth.middleware');
const OwnerService = require('../services/owner.service');
const VerificationEmail = require('../assets/nodemailer');
const bcrypt = require('bcrypt');

class OwnerController {
  ownerService = new OwnerService();
  authMiddleware = new AuthMiddleware();

  // 관리자 회원가입
  signupOwner = async (req, res) => {
    try {
      const { email, password, confirm, name } = req.body;

      // 비밀번호 확인 비밀번호 일치 확인
      if (password !== confirm)
        return res.status(412).json({ message: '암호가 일치하지 않습니다' });

      //해시화 및 생성
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.ownerService.createOwner(email, hashedPassword, confirm, name);
      res.status(200).json({ message: '회원가입을 완료하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 관리자 로그인
  loginOwner = async (req, res) => {
    try {
      const { email, password } = req.body;

      // 관리자 회원가입 확인
      const findOwner = await this.ownerService.findOwnerAllData(email);

      if (!findOwner)
        return res.status(404).json({ message: '회원이 아닙니다. 회원가입을 진행해주세요.' });

      // 비밀번호 입력 실패
      const findOwnerPassword = await bcrypt.compare(password, findOwner.password);
      if (!findOwnerPassword)
        return res.status(412).json({ message: '비밀번호를 잘못 입력하셨습니다' });

      // 토큰 생성
      const owner_id = findOwner.owner_id;
      const accessToken = this.authMiddleware.createAccessToken(owner_id);
      const refreshToken = this.authMiddleware.createRefreshToken();

      //리프레시 토큰을 DB 저장
      await this.ownerService.createRefreshToken(refreshToken, owner_id);

      // 쿠키 저장
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);

      res.status(200).json({ message: '로그인 되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 관리자 이메일 인증
  sendVerificationEmail = async (req, res) => {
    try {
      const { email } = req.body;

      const verificationEmail = new VerificationEmail();
      const randomNumber = await verificationEmail.sandEmail(email);
      req.session.verificationCode = randomNumber;

      res.status(200).json({ message: '인증 메일이 전송 되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  //회원 탈퇴
  leaveOwner = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      await this.ownerService.deleteOwner(owner_id);
      res.status(200).json({ message: '회원 탈퇴가 완료 되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };
}

module.exports = OwnerController;
