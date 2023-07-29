const ItemRepository = require('../repositories/item.repository');

class ItemService {
  itemRepository = new ItemRepository();

  findAllItem = async () => {
    const findAllItem = await this.itemRepository.findItemOwner();
    return findAllItem;
  };

  findItem = async (item_id) => {
    const findItem = await this.itemRepository.findItemById(item_id);
    return findItem;
  };

  createItem = async (name, price, type, amount, option_id, owner_id) => {
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

  modifyItem = async (owner_id, item_id, name, price, type, amount, option_id) => {
    const modifyItem = await this.itemRepository.modifyItem(
      owner_id,
      item_id,
      name,
      price,
      type,
      amount,
      option_id
    );
    return modifyItem;
  };

  deleteItem = async (owner_id, item_id) => {
    const deleteItem = await this.itemRepository.deleteItem(owner_id, item_id);
    return deleteItem;
  };
}

module.exports = ItemService;
