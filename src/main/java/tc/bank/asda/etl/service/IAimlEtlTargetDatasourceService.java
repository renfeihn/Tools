package tc.bank.asda.etl.service;

import java.util.List;

import tc.bank.asda.etl.model.AimlEtlTargetDatasource;

/**
 * etl目标源数据管理
 * @author Administrator
 *
 */
public interface IAimlEtlTargetDatasourceService {
	/**
	 * 添加新目标数据源
	 * @param targetDatasource
	 * @return
	 */
	boolean addNewTargetDatasource(AimlEtlTargetDatasource targetDatasource);
	/**
	 * 获取所有数据源列表
	 * @param targetDatasource
	 * @return
	 */
	List<AimlEtlTargetDatasource> queryAllTargetDatasource();
	/**
	 * 获取任务数据源
	 * @param targetDatasource
	 * @return
	 */
	AimlEtlTargetDatasource queryTargetDatasourceByTask(long dbsourceId);
	/**
	 * 测试数据源连接
	 * @param dbType
	 * @param defaultDatasourceId
	 * @return
	 */
	boolean testDBSrouceConnect(AimlEtlTargetDatasource targetDatasource);
}
