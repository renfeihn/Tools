package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogUnSensitivity;

/**
 * 日志脫敏
 * @author parry
 *
 */
public interface IAimLogUnSensitivityService {

	/**
	 * 添加脫敏規則
	 * @param unSensitivity
	 * @return
	 */
	boolean add(AimlCfgLogUnSensitivity unSensitivity);
	/**
	 * 修改脫敏規則
	 * @param unSensitivity
	 * @return
	 */
	boolean update(AimlCfgLogUnSensitivity unSensitivity);
	/**
	 * 刪除脫敏規則
	 * @param id
	 * @return
	 */
	boolean delById(long id);
	/**
	 * 查詢所有的脫敏規則
	 * @return
	 */
	List<AimlCfgLogUnSensitivity> getAll();
}
