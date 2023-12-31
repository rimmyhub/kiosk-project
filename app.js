const express = require('express');
const cookieParser = require('cookie-parser');
const itemRouter = require('./routes/item.router');
const ownerRouter = require('./routes/owner.router');
const orderItemRouter = require('./routes/order_item.router');
const orderCustomerRouter = require('./routes/order_customer.router');
const itemOrderCustomerRouter = require('./routes/item_order_customer.router');
const optionRouter = require('./routes/option.router');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

app.use('/', [
  itemRouter,
  ownerRouter,
  orderItemRouter,
  orderCustomerRouter,
  itemOrderCustomerRouter,
  optionRouter,
]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
