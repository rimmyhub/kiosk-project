const OptionService = require('../services/option.service');

class OptionController {
  optionService = new OptionService();

  // 옵션 등록
  crateOption = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      const { extra_price, shot_price, hot } = req.body;

      const option = await this.optionService.crateOption(owner_id, extra_price, shot_price, hot);

      if (extra_price === 0 || shot_price === 0) {
        return res.status(400).json({ message: '0원일 경우 옵션 등록이 불가합니다' });
      }

      if (!option) {
        return res.status(400).json({ message: '옵션 등록을 실패하였습니다' });
      }
      return res.status(200).json({ message: '옵션을 등록하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 옵션 수정
  modifyOption = async (req, res) => {
    try {
      const { owner_id } = res.locals.owner;
      const { option_id } = req.params;
      const { extra_price, shot_price, hot } = req.body;

      const option = await this.optionService.modifyOption(
        owner_id,
        option_id,
        extra_price,
        shot_price,
        hot
      );

      if (!option) {
        return res.status(400).json({ message: '옵션 수정을 실패하였습니다' });
      }

      return res.status(200).json({ message: '옵션을 수정하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };
}

module.exports = OptionController;
