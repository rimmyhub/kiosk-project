const { Item } = require('../models');

class ItemRepository {
  findItemById = async (item_id) => {
    const findItem = await Item.findByPk(item_id);
    return findItem;
  };

  createItem = async (name, price, type, amount, option_id, owner_id) => {
    const createItem = await Item.create({ name, price, type, amount, option_id, owner_id });
    return createItem;
  };
}
module.exports = ItemRepository;
