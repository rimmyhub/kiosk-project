const { Option } = require('../models');

class OptionRepository {
  // 옵션 등록
  crateOption = async (owner_id, extra_price, shot_price, hot) => {
    const option = await Option.create({ owner_id, extra_price, shot_price, hot });
    return option;
  };

  modifyOption = async (owner_id, option_id, extra_price, shot_price, hot) => {
    const option = await Option.update(
      { extra_price, shot_price, hot },
      { where: { owner_id, option_id } }
    );
    return option;
  };
}
module.exports = OptionRepository;
