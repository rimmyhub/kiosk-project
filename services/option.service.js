const OptionRepository = require('../repositories/option.repository');

class OptionService {
  optionRepository = new OptionRepository();

  // 옵션 등록
  crateOption = async (owner_id, extra_price, shot_price, hot) => {
    const option = await this.optionRepository.crateOption(owner_id, extra_price, shot_price, hot);
    return option;
  };

  // 옵션 수정
  modifyOption = async (owner_id, option_id, extra_price, shot_price, hot) => {
    const option = await this.optionRepository.modifyOption(
      owner_id,
      option_id,
      extra_price,
      shot_price,
      hot
    );
    return option;
  };
}

module.exports = OptionService;
