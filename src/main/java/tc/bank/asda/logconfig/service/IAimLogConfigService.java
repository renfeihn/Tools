package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.bean.AimConfigInfo;
import tc.bank.asda.logconfig.bean.AimConfigInfoTab;
import tc.bank.asda.logconfig.bean.AimLogSourceStatistic;
import tc.bank.asda.logconfig.bean.AimLogSourceVO;
import tc.bank.asda.logconfig.model.AimlConfigSplitElement;

import com.aim.alibaba.fastjson.JSONObject;


public interface IAimLogConfigService extends IAimConfigDictService,
		IAimConfigRelationService, IAimlConfigSplitService,
		IAimLogChannelService, ILogSourceService {

	/**查询对象日志源列表
	 * @param objectid
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public List<AimLogSourceVO> getObjectSources(String objectid) throws Exception;
	
	/**查询日志源信息
	 * @param objectid
	 * @param logid
	 * @return
	 * @throws Exception
	 */
	@Deprecated
	public AimConfigInfo getLogConfigByObjectId(String objectid,String logid) throws Exception;
	
	/**新增日志源信息
	 * @param baseInfo
	 * @throws Exception
	 */
	@Deprecated
	public void saveLogConfig(AimConfigInfo baseInfo) throws Exception;
	
	/**获取Eci公共配置
	 * @param baseInfo
	 * @throws Exception
	 */
	public JSONObject getEciCommonConfig() throws Exception;
	
	
	/**查询所有日志源列表
	 * @param objectid
	 * @return
	 * @throws Exception
	 */
	public List<AimLogSourceVO> getAllSourceConfigDesc() throws Exception;
	
	/**查询对象日志源列表
	 * @param objectid
	 * @return
	 * @throws Exception
	 */
	public List<AimLogSourceVO> getSourceConfigDesc(String objectid) throws Exception;
	
	/**查询日志源信息
	 * @param objectid
	 * @param logid
	 * @return
	 * @throws Exception
	 */
	public AimConfigInfo getSourceConfig(String objectid,String logid) throws Exception;
	
	/**新增日志源信息
	 * @param baseInfo
	 * @throws Exception
	 */
	public void saveSourceConfig(AimConfigInfo baseInfo) throws Exception;
	
	
	/**启动/停止某个对象下面的日志源配置
	 * 默认配置好的都是启动状态
	 * @param baseInfo
	 * @throws Exception
	 */
	public void enableSourceConfig(String objectid,String logid,boolean status) throws Exception;
	
	/**根据日志源查询报文拆分器
	 * @param objectid
	 * @return
	 * @throws Exception
	 */
	public List<AimConfigInfoTab> getSplitBySource(String objectid,String logid) throws Exception;
	
	/**根据对象查询报文拆分器
	 * @param objectid
	 * @return
	 * @throws Exception
	 */
	public List<AimConfigInfoTab> getSplitsByObject(String objectid) throws Exception;
	
	/**新增报文拆分器
	 * @param baseInfo
	 * @throws Exception
	 */
	public void saveSplits(List<AimConfigInfoTab> tabs) throws Exception;
	
	/**查询报文拆分器
	 * @param baseInfo
	 * @throws Exception
	 */
	public List<AimlConfigSplitElement> getSplitElements(String splittype,String classname,String elename) throws Exception;
	
	/**根据字段类型查询报文拆分器
	 * @param systype
	 * @param objectid
	 * @return
	 * @throws Exception
	 */
	public List<AimlConfigSplitElement> getSplitElements(String systype) throws Exception;
	
	/**日志源统计
	 * @param objectid
	 * @return
	 * @throws Exception
	 */
	public AimLogSourceStatistic sourceStatistic(String objectid) throws Exception;
	
	/**删除日志源配置
	 * @param objectid
	 * @param logid
	 * @throws Exception
	 */
	public void deleteSource(String objectid,String logid) throws Exception;
	
	/**
	 * @param objectid
	 * @param logid
	 * @throws Exception
	 */
	public void deleteSplitElement(String objectid,String logid) throws Exception;
	
/*	*//**获取日志源配置（以标签页分类）
	 * @param objectid 对象ID
	 * @param logid 日志ID
	 * @return
	 * @throws Exception
	 *//*
	public Map<String,List<AimlConfigSplitElement>> getSplitElements(String objectid,String logid) throws Exception;*/
	
}
