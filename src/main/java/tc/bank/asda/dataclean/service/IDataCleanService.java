package tc.bank.asda.dataclean.service;

import java.util.List;

import tc.bank.asda.dataclean.model.DataClean;

public interface IDataCleanService {
	/**
	 * 添加数据清理规则
	 * 
	 * @param dataClean
	 * @return
	 */
	int addDataClean(DataClean dataClean);

	/**
	 * 修改数据清理规则
	 * 
	 * @param dataClean
	 * @return
	 */
	boolean updataDataClean(DataClean dataClean);

	/**
	 * 根据分类获取数据清理规则 1 数据 2 文件
	 * 
	 * @return
	 */
	List<DataClean> getDataCleanByDataType(int dataType);
	
	/**
	 * 删除数据清理
	 * @param id
	 * @return
	 */
	boolean delDataClean(long id);

	/**
	 * 根据ID数据清理规则 
	 * @return
	 */
	DataClean getDataCleanById(long id);
}
