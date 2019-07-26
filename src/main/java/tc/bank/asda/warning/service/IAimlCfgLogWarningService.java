package tc.bank.asda.warning.service;

import java.util.List;

import tc.bank.asda.warning.model.AimlCfgLogEventModel;
import tc.bank.asda.warning.model.AimlCfgLogWarning;

public interface IAimlCfgLogWarningService {

	/**
	 * 添加预警信息
	 * 
	 * @param warning
	 * @return
	 */
	boolean addWarning(AimlCfgLogWarning warning);

	/**
	 * 查询用户下配置的所有预警
	 * 
	 * @param userId
	 *            用户ID
	 * @return
	 */
	List<AimlCfgLogWarning> getAllWarning(int userId);

	/**
	 * 根据ID删除预警
	 * 
	 * @param id
	 * @return
	 */
	boolean delWarningById(long id);

	/**
	 * 修改预警
	 * 
	 * @param warning
	 * @return
	 */
	boolean updateWarning(AimlCfgLogWarning warning);

	/**
	 * 添加预警模版
	 * 
	 * @param model
	 * @return
	 */
	boolean addEventModel(AimlCfgLogEventModel model);

	/**
	 * 删除预警模版
	 * 
	 * @param id
	 * @return
	 */
	boolean delEventModel(long id);

	/**
	 * 修改预警模版
	 * 
	 * @param model
	 * @return
	 */
	boolean updateEventModel(AimlCfgLogEventModel model);

	/**
	 * 查看所有的预警模版
	 * 
	 * @return
	 */
	List<AimlCfgLogEventModel> getAllEventModel();
}
