package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogField;

public interface IAimlCfgLogFieldService {

	/**
	 * 获取所有字典
	 * @return
	 */
	List<AimlCfgLogField> getAllField();
	
	/**
	 * 添加字段
	 * @param field
	 * @return
	 */
	boolean addField(AimlCfgLogField field);
	/**
	 * 删除字段
	 * @param id
	 * @return
	 */
	boolean delField(long id);
	/**
	 * 修改字段
	 * @param field
	 * @return
	 */
	boolean updateField(AimlCfgLogField field);
}
