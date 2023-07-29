const { Item } = require('../models');

class ItemRepository {
  findItemOwner = async () => {
    const findItemOwner = await Item.findAll();
    return findItemOwner;
  };

  findItemById = async (item_id) => {
    const findItem = await Item.findByPk(item_id);
    return findItem;
  };

  createItem = async (name, price, type, amount, option_id, owner_id) => {
    const createItem = await Item.create({ name, price, type, amount, option_id, owner_id });
    return createItem;
  };

  modifyItem = async (owner_id, item_id, name, price, type, amount, option_id) => {
    const modifyItem = await Item.update(
      {
        name,
        price,
        type,
        amount,
        option_id,
      },
      {
        where: {
          item_id,
          owner_id,
        },
      }
    );
    return modifyItem;
  };

  deleteItem = async (owner_id, item_id) => {
    const deleteItem = await Item.destroy({
      where: {
        item_id,
        owner_id,
      },
    });
    return deleteItem;
  };
}
module.exports = ItemRepository;
