package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.model.AimTriggerRule;

/**
 * 
 * ESB触发规则操作接口
 *
 */
public interface IAppEsbTriggerConfig {

	/**
	 * 根据对象类型, 获取相关ESB对象
	 * @param objType
	 * <li> 1 - ESB应用 
	 * <li> 2 - 服务消费者
	 * <li> 3 - 服务提供者
	 * <li> 4 - ESB服务
	 * @return
	 * 每个List项
	 * <li> map-key, obj / objName
	 * <li> map-value, 对象标识 / 对象名称
	 * @throws Exception
	 */
	List<Map<String,String>> queryEsbObjectsByType(Integer objType) throws Exception;
	
	/**
	 * 获取ESB相关的指标
	 * @return
	 * <li> map-key, metricId / metricItem / metricName
	 * <li> map-value, 指标ID / 指标项 / 指标名称
	 * @throws Exception
	 */
	List<Map<String,Object>> queryEsbMetrics() throws Exception;
	
//	/**
//	 * 根据条件, 获取对应的ESB触发规则
//	 * @param objType
//	 * 对象类型
//	 * @param monObj
//	 * 对象
//	 * @param metricId
//	 * 指标ID
//	 * @param eventType
//	 * 事件类型
//	 * @param page
//	 * 当前分页, 从0开始计算
//	 * @param pageSize
//	 * 分页记录数
//	 * @return
//	 * @throws Exception
//	 */
//	Page<AimTriggerRule> queryEsbTriggerRules(Integer objType, String monObj, Integer metricId, Integer eventType,
//			int page, int pageSize) throws Exception;
	
	/**
	 * 根据条件, 获取对应的ESB触发规则
	 * @param objType
	 * 对象类型
	 * @param monObj
	 * 对象
	 * @param metricId
	 * 指标ID
	 * @param eventType
	 * 事件类型
	 * @return
	 * @throws Exception
	 */
	List<AimTriggerRule> queryEsbTriggerRules(Integer objType, String monObj, Integer metricId, Integer eventType) throws Exception;
	
	/**
	 * 新增1条触发规则
	 * @param rule
	 * @throws Exception
	 */
	void newEsbTriggerRule(AimTriggerRule rule) throws Exception;

	/**
	 * 修改一条触发规则
	 * @param rule
	 * @throws Exception
	 */
	void modifyEsbTriggerRule(AimTriggerRule rule) throws Exception;
	
	/**
	 * 删除一条触发规则
	 * @param mObjId
	 * 对象ID
	 * @param triggerId
	 * 触发记录ID
	 * @throws Exception
	 */
	void removeEsbTriggerRule(Long mObjId, Long triggerId) throws Exception;
}
