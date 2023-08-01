const { Item_order_customer, Option, Order_customer, Item } = require('../models');

class ItemOrderCustomerRepository {
  // 고객 상품 주문
  createItemOrderCustomer = async (item_id, order_customer_id, option_id, amount, price) => {
    // 고객 주문 상품 조회
    const orderCustomer = await Order_customer.findOne({
      where: { order_customer_id },
    });
    // 조회한 주문이 이미 완료되어있을때
    if (orderCustomer.state === true) {
      throw new Error('이미 완료된 주문입니다');
    }
    try {
      // Option 모델에서 extra_price, shot_price 조회
      const option = await Option.findOne({
        where: { option_id },
        attributes: ['extra_price', 'shot_price'],
      });

      // Option 모델에서 조회한 extra_price와 shot_price 값 가져오기
      const extra_price = option.get('extra_price');
      const shot_price = option.get('shot_price');

      // 옵션 값 + 주문 상품 갯수 +상품 가격 계산
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
