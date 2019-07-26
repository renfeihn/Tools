package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.core.module.AimDefineMetric;
import tc.cama.aweb.model.AimMetricView;
import tc.cama.aweb.model.AimTriggerRule;

/**
 * 
 * 监控对象触发规则操作接口
 *
 */
public interface IAppTriggerConfig {
	
	/**
	 * 查询监控对象<code>mObjId</code>的触发规则
	 * @param mObjId
	 * 监控对象ID
	 * @return
	 * @throws Exception
	 */
	List<AimTriggerRule> queryTriggerRule(Long mObjId) throws Exception;

	/**
	 * 根据查询条件, 获取相关配置规则
	 * @param appId
	 * 应用系统ID
	 * @param mObjId
	 * 对象ID
	 * @param metricGroup
	 * 指标分组
	 * @param eventType
	 * 告警类型
	 * @return
	 * @throws Exception
	 */
	List<AimTriggerRule> queryTriggerRules(Long appId, Long mObjId, String metricGroup, Integer eventType) throws Exception;

	/**
	 * 查询所有指标信息
	 * @return
	 * @throws Exception
	 */
	List<AimMetricView> queryAllMetrices() throws Exception;
	
	/**
	 * 查询某个对象可以绑定的指标信息(取决于它是否配置了相关的采集命令)
	 * @param mObjId
	 * @return
	 * @throws Exception
	 */
	List<AimMetricView> queryObjectMetrices(Long mObjId) throws Exception;
	
	/**
	 * 根据指标分类+指标项, 查询与其对应的计算函数
	 * @param metricCate
	 * 指标分类
	 * @param metricItem
	 * 指标项
	 * @return
	 * List中每个map的key定义
	 * <li> funcId, 函数标识
	 * <li> funcName, 函数名称
	 * @throws Exception
	 */
	List<Map<String,Object>> queryMetricMeasures(String metricCate, String metricItem) throws Exception;
	
	/**
	 * 获取与某CMDB分类匹配的指标分类信息
	 * @param objectId
	 * 对象ID
	 * @param cateId
	 * CMDB三级分类ID
	 * @return
	 * map-keys
	 * <li> objCateId
	 * <li> metricCateId
	 * <li> metricCate1
	 * <li> metricCate2
	 * <li> metricGroup
	 * <li> metricGroupName
	 * @throws Exception
	 */
	List<Map<String,Object>> queryMetricGroup(Long objectId, Long cateId) throws Exception;
	
	/**
	 * 查询某个分组下的指标信息
	 * @param metricGroup
	 * @return
	 * @throws Exception
	 */
	List<AimDefineMetric> queryMetricOfGroup(String metricGroup) throws Exception;
	
	/**
	 * 新增一条触发规则
	 * @param rule
	 * @throws Exception
	 */
	void newTriggerRule(AimTriggerRule rule) throws Exception;
	
	/**
	 * 修改一条触发规则
	 * @param rule
	 * @throws Exception
	 */
	void modifyTriggerRule(AimTriggerRule rule) throws Exception;
	
	/**
	 * 删除一条触发规则
	 * @param mObjId
	 * 监控对象ID
	 * @param triggerId
	 * 触发器ID
	 * @throws Exception
	 */
	void removeTriggerRule(Long mObjId, Long triggerId) throws Exception;
}
