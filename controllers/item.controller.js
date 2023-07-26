const ItemService = require('../services/item.service');

class ItemController {
  itemService = new ItemService();
}
module.exports = ItemController;
