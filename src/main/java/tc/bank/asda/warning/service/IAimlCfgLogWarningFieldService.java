package tc.bank.asda.warning.service;

import java.util.List;

import tc.bank.asda.warning.model.AimlCfgLogWarningField;

public interface IAimlCfgLogWarningFieldService {
	
	/**
	 * 获取所有的预警字段
	 * @return
	 */
	List<AimlCfgLogWarningField> getAllWarningFields();
	/**
	 * 修改预警字段
	 * @param field
	 * @return
	 */
	boolean updateWarningField(AimlCfgLogWarningField field);
	
	/**
	 * 添加预警字段
	 * @param field
	 * @return
	 */
	boolean addWarningField(AimlCfgLogWarningField field);
	
	/**
	 * 删除预警字段
	 * @param id
	 * @return
	 */
	boolean delWarningField(long id);
}
