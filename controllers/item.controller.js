const ItemService = require('../services/item.service');

class ItemController {
  itemService = new ItemService();

  getItem = async (req, res) => {
    try {
      const { item_id } = req.params;
      const item = await this.itemService.getItem(item_id);

      if (!item) return res.status(404).send({ message: '상품 정보가 없습니다' });

      res.status(200).send({ data: item });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  postItem = async (req, res) => {
    try {
      // const { option_id, owner_id } = req.params;
      const { name, price, type, amount, option_id, owner_id } = req.body;
      const item = await this.itemService.postItem(name, price, type, amount, option_id, owner_id);
      // 이름과 가격이 없을 경우 에러 반환
      if (!name || !price) {
        return res.status(400).send({ message: '이름과 가격을 입력해주세요' });
      }
      // 알맞은 타입이 아닐 경우 에러 반환
      // enum.type 가 string으로 나와서 이런 조건을 설정했는데 맞는지? -- 튜터님께 질문하기
      if (typeof type !== 'string') {
        return res.status(400).send({ message: '알맞은 타입을 지정해주세요' });
      }
      res.status(200).send({ message: '상품 등록을 완료하였습니다.' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };
}

module.exports = ItemController;
