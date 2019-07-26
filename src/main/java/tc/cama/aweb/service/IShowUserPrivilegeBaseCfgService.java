package tc.cama.aweb.service;

import java.util.List;

import tc.bank.cama.cmdb.model.view.CmdbPortAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbProcessAppSoftware;
import tc.bank.common.core.Page;
import tc.cama.aweb.bean.AppAPM;
import tc.cama.aweb.bean.AppEsbSummary;
import tc.cama.aweb.bean.BeforeComper;
import tc.cama.aweb.bean.FiveComper;
import tc.cama.aweb.model.AimObjectCommandView;
import tc.cama.aweb.model.AimTriggerRule;
import tc.cama.aweb.model.AimlKeywordsConfig;
import tc.cama.aweb.model.AimlLogfileConfig;

public interface IShowUserPrivilegeBaseCfgService {
	/**
	 * 根据用户名等条件查询采集命令
	 * @param username
	 * 用户名
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
	public Page<AimObjectCommandView> queryObjectCommandsByFilters(
			String username,Long appId,Long mObjId, String metricCate, Integer page,
			Integer pageSize) throws Exception;

	/**
	 * 根据用户名等查询条件, 获取相关配置规则
	 * 
	 * @param appId
	 *            应用系统ID
	 * @param mObjId
	 *            对象ID
	 * @param metricGroup
	 *            指标分组
	 * @param eventType
	 *            告警类型
	 * @return
	 * @throws Exception
	 */
	public List<AimTriggerRule> queryTriggerRules(String username,Long appId, Long mObjId,
			String metricGroup, Integer eventType) throws Exception;
	/**
	 * 文件检测配置----获取所有AimlLogfileConfig
	 * @param username
	 * @return
	 */
	public List<AimlLogfileConfig> getAllAimlLogfileConfig(String username) throws Exception;
	/**
	 * 应用程序配置--进程维护
	 * 应用系统与软件筛选进程
	 * @param username
	 * @return
	 */
	public List<CmdbProcessAppSoftware> getProcessRelatedInfo(String username) throws Exception;
	
	/**
	 * 应用程序配置--端口维护
	 * 应用系统与软件筛选端口
	 * @param username
	 * @return
	 */
	public List<CmdbPortAppSoftware> getPortRelatedInfo(String username) throws Exception;
	/**
	 * 日志关键字配置--获取所有AimlKeywordsConfig
	 * @param 
	 * @return
	 * @throws Exception 
	 */
	public List<AimlKeywordsConfig> getAllAimlKeywordsConfig(String username) throws Exception;
	/**
	 * 应用性能总览
	 * 得到汇总APM信息
	 * @param username 
	 * @return
	 */
	public List<AppEsbSummary> getAppSummary(String username) throws Exception;
	/**
	 * 根据应用系统查询昨日同比
	 * @param appId
	 * @return
	 * @throws Exception
	 */
	public BeforeComper getAppBCInfoByAppId(AppEsbSummary esb,String username) throws Exception;
	/**
	 * 应用性能总览
	 * 总览
	 * 
	 * @throws Exception
	 */
	public AppAPM getAppAPM(String username,Long objectId) throws Exception;
	/**
	 * 应用性能总览
	 * 根据5分钟筛选
	 * @return
	 */
	public List<AppEsbSummary> getListAimEsbAvgtimeunit5minCurren(String username) throws Exception;
	/**
	 * 根据应用系统查询5分钟同比
	 * 
	 * @param appId
	 * @return
	 * @throws Exception
	 */
	FiveComper getAppFCInfoByAppId(String username,AppEsbSummary esb) throws Exception;
	

}
