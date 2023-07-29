const { Owner, RefreshToken } = require('../models');

class OwnerRepository {
  // 관리자 생성
  createOwner = async (email, password, name) => {
    const createOwner = await Owner.create({ email, password, name });
    return createOwner;
  };

  // 관리자 아이디 찾기
  findOwnerById = async (owner_id) => {
    const findOwner = await Owner.findByPk(owner_id);
    console.log(owner_id);
    return findOwner;
  };

  // 이메일 찾기
  findOwnerByEmail = async (email) => {
    const findOwner = await Owner.findOne({ where: { email } });
    return findOwner;
  };

  // 전체 조회
  fideAllOwner = async () => {
    const findAllOwner = await Owner.findAll();
    return findAllOwner;
  };

  // 회원 탈퇴
  deleteOwner = async (owner_id) => {
    const deleteOwner = await Owner.destroy({ where: { owner_id } });
    return deleteOwner;
  };

  // 리프레쉬토큰 찾기
  findRefreshTokenByOwner = async (owner_id) => {
    const findRefreshToken = await RefreshToken.findOne({ owner_id });
    return findRefreshToken;
  };

  // 리프레쉬 토큰 삭제
  deleteRefreshToken = async (owner_id) => {
    const deleteRefreshToken = await RefreshToken.destroy({ where: { owner_id } });
    return deleteRefreshToken;
  };

  // 리프레쉬 토근 생성
  createRefreshToken = async (refreshToken, owner_id) => {
    const createdRefreshToken = await RefreshToken.create({ refreshToken, owner_id });
    return createdRefreshToken;
  };
}

module.exports = OwnerRepository;
