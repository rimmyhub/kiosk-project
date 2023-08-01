const nodemailer = require('nodemailer');

class VerificationEmail {
  // 인증 메일
  transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      password: process.env.NODEMAILER_PASSWORD,
    },
  });

  // 6자리 난수 생성
  generateVerificationCode = () => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    return verificationCode;
  };

  // 보내는 이메일 생성
  sandEmail = async (email) => {
    const randomNumber = this.generateVerificationCode();
    const emailOption = {
      from: `"브랜드명" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: '[브랜드명] 회원가입 인증 메일입니다.',
      html: `
            <h2 style="margin: 20px 0">[브랜드명] 인증 메일 확인</h2>
            <p>아래 인증번호를 인증번호 입력란에 기입해 주세요.</p>
            <p style='color: red; font-size: 40px;'>${randomNumber}</p>
            `,
    };
    await this.transporter.sendMail(emailOption);
    return randomNumber;
  };
}

module.exports = VerificationEmail;
