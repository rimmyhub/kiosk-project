const OwnerRepository = require('../repositories/owner.repository');

class OwnerService {
  ownerRepository = new OwnerRepository();

  // 관리자 생성
  createOwner = async (email, password, name) => {
    const createOwner = await this.ownerRepository.createOwner(email, password, name);
    return createOwner;
  };

  // 관리자 아이디를 먼저 검색하고 결과가 없을 경우 이메일을 찾음
  findOwnerAllData = async (ownerInfo) => {
    const findOwnerData =
      (await this.ownerRepository.findOwnerById(ownerInfo)) ??
      (await this.ownerRepository.findOwnerByEmail(ownerInfo));

    if (findOwnerData === null) return false; // 조회 결과 없으면 false
    return findOwnerData;
  };

  findAllOwner = async () => {
    const findAllOwner = await this.ownerRepository.fideAllOwner();

    return findAllOwner.map((owner) => {
      return { owner_id: owner.owner_id, email: owner.email, name: owner.name };
    });
  };

  // 회원 탈퇴
  deleteOwner = async (owner_id) => {
    const deleteOwner = await this.ownerRepository.deleteOwner(owner_id);
    return deleteOwner;
  };

  //리프레쉬 토큰 db 저장
  createRefreshToken = async (refreshToken, owner_id) => {
    const findRefreshToken = await this.ownerRepository.findRefreshTokenByOwner(owner_id);

    // 리프레쉬 토큰이 있으면 삭제
    if (findRefreshToken) {
      await this.ownerRepository.deleteRefreshToken(owner_id);
    }

    // 리프레쉬 토큰 생성
    const createRefreshToken = await this.ownerRepository.createRefreshToken(
      refreshToken,
      owner_id
    );
    if (createRefreshToken) {
      await this.ow;
    }
  };
}

module.exports = OwnerService;
