const ItemRepository = require('../repositories/item.repository');

class ItemService {
  itemRepository = new ItemRepository();
}

module.exports = ItemService;
