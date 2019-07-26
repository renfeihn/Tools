package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import tc.bank.common.core.Page;
import tc.cama.aweb.model.AimCommandView;
import tc.cama.aweb.model.AimObjectCommandView;

/**
 * 
 * 监控对象采集命令操作接口
 *
 */
public interface IAppCommandConfig {

	/**
	 * 查询所有采集命令
	 * @return
	 * @throws Exception
	 */
	List<AimCommandView> queryAllCommands() throws Exception;
	
	/**
	 * 查询对象采集命令
	 * @param mObjId
	 * 对象ID
	 * @return
	 * @throws Exception
	 */
	List<AimObjectCommandView> queryObjectCommands(Long mObjId) throws Exception;
	
	/**
	 * 查询对象命令的采集状态
	 * @param mObjId
	 * @param cateId
	 * @return
	 * map-keys
	 * <li> collected, 是否采集 1-已采集, 0-未采集
	 * <li> objectId, 对象ID
	 * <li> cmdId, 命令ID
	 * <li> cmdName, 命令名
	 * <li> executeGroup, 命令执行分组
	 * <li> executeGroupName, 执行分组名称
	 * <li> executeInterval, 命令执行间隔
	 * <li> resultItems, 命令结果集项
	 * @throws Exception
	 */
	List<Map<String,Object>> queryObjectCommandCollectStatus(Long mObjId, Long cateId) throws Exception;
	
	/**
	 * 根据条件查询采集命令
	 * @param appId
	 * 应用系统ID
	 * @param mObjId
	 * 对象ID
	 * @param metricCate
	 * 指标分组
	 * @param page
	 * 当前页数(以0开始计算)
	 * @param pageSize
	 * 分页记录大小
	 * @return
	 * @throws Exception
	 */
	Page<AimObjectCommandView> queryObjectCommandsByFilters(Long appId, Long mObjId, String metricCate,
			int page, int pageSize) throws Exception;
	
	/**
	 * 查询对象所有采集命令的分类(resultSet)和采集项目(resultName)
	 * @param mObjId
	 * 对象ID
	 * @return
	 * <li> map-key, 命令分类(resultSet)
	 * <li> map-value, 某分类(resultSet)下的采集项
	 * @throws Exception
	 */
	Map<String,Set<String>> queryObjectCommandCategory(Long mObjId) throws Exception;
	
	/**
	 * 查询对象,在某个(指标分类+指标项)中, 对应的标签内容
	 * @param appId
	 * 系统ID
	 * @param objectId
	 * 对象ID
	 * @param category
	 * 指标分类
	 * @param item
	 * 指标项目
	 * @return
	 * <li> map-key, 标签关键字
	 * <li> map-value, 关键字对应的内容列表
	 * @throws Exception
	 */
	Map<String,List<Object>> queryMetricTagValues(Long appId, Long objectId, String category, String item) throws Exception;

	/**
	 * 查询某个采集命令结果集的各个字段定义
	 * @param cmdId
	 * 采集命令ID
	 * @return
	 * List的每个Map中, 键的定义如下
	 * <li> cate, 指标分类
	 * <li> item, 指标项
	 * <li> name, 指标项名称
	 * <li> unit, 指标单位
	 * @throws Exception
	 */
	List<Map<String,Object>> queryCommandResultItems(Long cmdId) throws Exception;
	
	/**
	 * 根据指标分类+指标项, 查询对应的标签信息
	 * @param category
	 * 指标分类
	 * @param item
	 * 指标项
	 * @return
	 * List中每个map的key说明
	 * <li> tag, 标签标识
	 * <li> tagName, 标签名称
	 * <li> srcTable, 数据源表
	 * <li> srcColumn, 数据源表字段
	 * @throws Exception
	 */
	List<Map<String,String>> queryMetricTags(String category, String item) throws Exception;
	
	/**
	 * 根据指标ID, 查询对应的标签信息
	 * @param metricId
	 * @return
	 * List中每个map的key说明
	 * <li> tag, 标签标识
	 * <li> tagName, 标签名称
	 * <li> srcTable, 数据源表
	 * <li> srcColumn, 数据源表字段
	 * @throws Exception
	 */
	List<Map<String,String>> queryMetricTags(Long metricId) throws Exception;
	
	/**
	 * 新增对象采集命令
	 * @param command
	 * @throws Exception
	 */
	void newObjectCommand(AimObjectCommandView command) throws Exception;
	
	/**
	 * 新增对象多个采集命令
	 * @param mObjId
	 * 对象ID
	 * @param commands
	 * 采集命令
	 * @throws Exception
	 */
	void newObjectCommands(Long mObjId, List<AimObjectCommandView> commands) throws Exception;
	
	/**
	 * 修改对象采集命令
	 * @param command
	 * @throws Exception
	 */
	void modifyObjectCommand(AimObjectCommandView command) throws Exception;
	
	/**
	 * 删除对象采集命令
	 * @param mObjId
	 * 对象ID
	 * @param executeId
	 * 执行记录ID
	 * @throws Exception
	 */
	void removeObjectCommand(Long mObjId, Long executeId) throws Exception;
}
