package tc.bank.asda.etl.service;

import java.sql.SQLException;
import java.util.List;

import tc.bank.asda.etl.model.AimlEtlTargetDatasource;
import tc.bank.asda.etl.model.AimlEtlTaskFieldMapping;
import tc.bank.asda.logconfig.model.AimlCfgLogPrivateField;

/**
 * 任务字段映射
 * @author Administrator
 *
 */
public interface IAimlEtlTaskFieldMappingService {
	public List<String> getDatasourceFiledList(AimlEtlTargetDatasource dbmanager, String tableName);
	/**
	 * 查询task任务字段映射集合
	 * @param taskId
	 * @return
	 */
	public List<AimlEtlTaskFieldMapping> queryTaskFieldMappingList(long taskId);
	/**
	 * 新增映射关系
	 * @param list
	 * @return
	 */
	public boolean addTaskFieldMapping(List<AimlEtlTaskFieldMapping> list,long taskId);
	/**
	 * 获取目标源对应库表结构字段
	 * @param targetDatasourceId
	 * @return
	 */
	public List<String> getDatasourceFiledList(long targetDatasourceId, String tableName);
	/**
	 * 根据系统获取es字段
	 * @param targetDatasourceId
	 * @return
	 * @throws SQLException 
	 */
	public List<AimlCfgLogPrivateField> getESFiledList(long systemId) throws SQLException;
}
