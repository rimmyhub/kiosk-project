const { Item_order_customer, Option, Order_customer, Item } = require('../models');

class ItemOrderCustomerRepository {
  // 고객 상품 주문
  createItemOrderCustomer = async (item_id, order_customer_id, option_id, amount, price) => {
    try {
      // Option 모델에서 extra_price, shot_price 합산
      const option = await Option.findOne({
        where: { option_id },
        attributes: ['extra_price', 'shot_price'],
      });

      // Option 모델에서 조회한 extra_price와 shot_price 값 가져오기
      const extra_price = option.get('extra_price');
      const shot_price = option.get('shot_price');

      // 옵션 값과 갯수에 따른 가격 계산
      const totalAmount = extra_price + shot_price + price * amount;

      // Item_order_customer 테이블에 새로운 레코드 생성
      const createItemOrderCustomer = await Item_order_customer.create({
        item_id,
        order_customer_id,
        option_id,
        amount,
        price,
        totalAmount,
      });

      return createItemOrderCustomer;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}

module.exports = ItemOrderCustomerRepository;
