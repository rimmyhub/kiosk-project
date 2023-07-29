const ItemService = require('../services/item.service');
// const { itemType } = require('../contents');

class ItemController {
  itemService = new ItemService();

  findAllItem = async (req, res) => {
    try {
      const item = await this.itemService.findAllItem();

      if (!item) return res.status(404).json({ message: '상품 정보가 없습니다' });

      res.status(200).json({ data: item });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ massage: `${err.message}` });
    }
  };

  findItem = async (req, res) => {
    try {
      const { item_id } = req.params;
      const item = await this.itemService.findItem(item_id);

      if (!item) return res.status(404).json({ message: '상품 정보가 없습니다' });

      res.status(200).json({ data: item });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  createItem = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      const { name, price, type, amount, option_id } = req.body;

      const item = await this.itemService.createItem(
        name,
        price,
        type,
        amount,
        option_id,
        owner_id
      );
      // 이름과 가격이 없을 경우 에러 반환
      if (!name || !price) return res.status(400).json({ message: '이름과 가격을 입력해주세요' });

      // 알맞은 타입이 아닐 경우 에러 반환
      // enum.type 가 string으로 나와서 이런 조건을 설정했는데 맞는지? -- 튜터님께 질문하기
      // !Object.values(itemType).includes(type)
      if (typeof type !== 'string')
        return res.status(400).json({ message: '알맞은 타입을 지정해주세요' });

      // 상품이 있을 경우 자동적으로 갯수 1나 증가
      if (item) item.amount += 1;
      await item.save();
      return res.status(200).json({ message: '상품 등록을 완료하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  modifyItem = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      const { item_id } = req.params;
      const { name, price, type, amount, option_id } = req.body;

      // 이름이 빈칸일 경우
      if (!name || name.trim() === '') {
        return res.status(400).json({
          message: '이름을 입력해주세요',
        });
      }

      // 가격이 음수일 경우
      if (price < 0) {
        return res.status(400).json({ message: '알맞은 가격을 입력해주세요' });
      }

      const item = await this.itemService.findItem(item_id);

      // 상품이 없을 경우
      if (!item) return res.status(404).json({ message: '상품 정보가 없습니다' });

      if (owner_id !== item.owner_id)
        return res.status(412).json({ message: '수정 권한이 없습니다' });

      await this.itemService.modifyItem(owner_id, item_id, name, price, type, amount, option_id);

      // 알맞은 타입이 아닐 경우 에러 반환
      // enum.type 가 string으로 나와서 이런 조건을 설정했는데 맞는지? -- 튜터님께 질문하기
      // !Object.values(itemType).includes(type)
      if (typeof type !== 'string')
        return res.status(400).json({ message: '알맞은 타입을 지정해주세요' });

      res.status(200).json({ message: '상품 수정을 완료하였습니다' });
    } catch (err) {
      console.log(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  deleteItem = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      const { item_id } = req.params;

      const item = await this.itemService.findItem(item_id);

      // 상품이 없을 경우
      if (!item) return res.status(404).json({ message: '상품 정보가 없습니다' });

      if (owner_id !== item.owner_id)
        return res.status(412).json({ message: '삭제 권한이 없습니다' });

      // 갯수가 0일 경우 바로 삭제
      if (item.amount === 0) {
        await this.itemService.deleteItem(owner_id, item_id);
        return res.status(200).json({ message: '상품 삭제를 완료하였습니다' });
      } else {
        // 단, 갯수가 0이 아니면 확인메세지 제공
        return res.status(200).json({ message: `ID가 ${item_id}인 물품을 삭제하시겠습니까?` });
      }
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(500).json({ message: '서버 오류로 인해 작업을 완료할 수 없습니다' });
    }
  };
}

module.exports = ItemController;
