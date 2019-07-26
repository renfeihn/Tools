package tc.bank.cama.core.service.alert;

import tc.bank.cama.cmdb.service.CmdbConstants;

/**
 * 健康度检查服务
 * 
 * @author Win7-user
 * 
 */
public interface IHealthDegreeService {

	/**
	 * 对象监控度检查
	 * 
	 * @param objId
	 * @return [0,100]
	 */
	public int healthInspectByObjId(long objId);

	/**
	 * 对象某类指标监控度检查
	 * 
	 * @param objId
	 *            对象ID
	 * @param metricNames
	 *            指标名称
	 * @return
	 */
	public int healthInspectByObjIdAndMetrics(int objId, String... metricNames);

	/**
	 * 按分类计算健康度
	 * 
	 * @param category
	 * @return
	 */
	public int healtyInspectByCategory(CmdbConstants.Category category);
}
