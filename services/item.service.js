const ItemRepository = require('../repositories/item.repository');

class ItemService {
  itemRepository = new ItemRepository();

  getItem = async (item_id) => {
    const findItem = await this.itemRepository.findItemById(item_id);
    return findItem;
  };

  postItem = async (name, price, type, amount, option_id, owner_id) => {
    const createItem = await this.itemRepository.createItem(
      name,
      price,
      type,
      amount,
      option_id,
      owner_id
    );
    return createItem;
  };
}

module.exports = ItemService;
