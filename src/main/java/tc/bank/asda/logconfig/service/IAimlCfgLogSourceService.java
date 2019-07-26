package tc.bank.asda.logconfig.service;

import java.io.File;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import tc.bank.asda.es.bean.Fields;
import tc.bank.asda.logconfig.bean.AimlCfgLogSourceAndPrivateFieldVO;
import tc.bank.asda.logconfig.bean.AimlCfgLogSourceStatistics;
import tc.bank.asda.logconfig.model.AimlCfgLogSource;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceAgent;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceHttp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceJDBC;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceKafka;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceManualUp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceQuery;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceServiceIn;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceSnmp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceSyslog;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceTcp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceTrap;
import tc.bank.asda.logconfig.model.AimlCfgLogSplitFieldV1;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

public interface IAimlCfgLogSourceService {
	boolean addFileBySource(boolean judgeBatch, String ip, int port,
			String user, String pass, String ftpFile,
			AimlCfgLogSourceAgent agent, String filePath);

	/**
	 * 获取日志配置源统计信息
	 * 
	 * @return
	 */
	AimlCfgLogSourceStatistics getLogSourceStatistics();

	/**
	 * 获取代理采集数据源列表
	 * 
	 * @return
	 */
	List<AimlCfgLogSourceAgent> getSourceAgentLog();

	/**
	 * 获取本地上传采集数据源列表
	 * 
	 * @return
	 */
	List<AimlCfgLogSourceManualUp> getSourceManualUp(String sourceType);

	/**
	 * 获取服务接入数据源
	 * 
	 * @param serviceType
	 * @return
	 */
	List<AimlCfgLogSourceServiceIn> getSourceServiceIn(String serviceType);

	/**
	 * 获取代理采集数据源列表
	 * 
	 * @return
	 */
	List<AimlCfgLogSourceJDBC> getSourceJDBC();

	/**
	 * 获取代理采集数据源列表
	 * 
	 * @return
	 */
	List<AimlCfgLogSourceKafka> getSourceKafka();

	/**
	 * 修改日志采集数据源状态
	 * 
	 * @param sourceId
	 * @param runStatus
	 * @return
	 */
	boolean updateSourceRunStatus(long sourceId, String runStatus);

	/**
	 * 删除日志采集数据源
	 * 
	 * @param sourceId
	 * @return
	 */
	boolean delSource(long sourceId);

	/**
	 * 修改代理采集数据源
	 * 
	 * @param sourceId
	 * @return
	 */
	boolean updateSourceAgent(AimlCfgLogSourceAgent agent);

	/**
	 * 修改本地上传采集数据源
	 * 
	 * @param sourceId
	 * @return
	 */
	boolean updateSourceManualUp(AimlCfgLogSourceManualUp manualUp);

	/**
	 * 修改服务接入数据源
	 * 
	 * @param serviceIn
	 * @return
	 */
	boolean updateSourceServiceIn(AimlCfgLogSourceServiceIn serviceIn);

	/**
	 * 修改JDBC数据源
	 * 
	 * @param sourceId
	 * @return
	 */
	boolean updateSourceJDBC(AimlCfgLogSourceJDBC jdbcSource);

	/**
	 * 修改Kafka数据源
	 * 
	 * @param sourceId
	 * @return
	 */
	boolean updateSourceKafka(AimlCfgLogSourceKafka kafkaSource);

	/**
	 * 添加代理采集数据源
	 * 
	 * @param agent
	 * @return
	 */
	long addSourceAgent(AimlCfgLogSourceAgent agent);

	/**
	 * 手工添加代理采集数据源
	 * 
	 * @param agent
	 * @return
	 */
	boolean addSourceAgentAuto(AimlCfgLogSourceAgent agent);

	/**
	 * 添加本地上传采集数据源
	 * 
	 * @param manualUp
	 * @return
	 */
	boolean addSourceManualUp(AimlCfgLogSourceManualUp manualUp);

	/**
	 * 添加服务接入采集数据源
	 * 
	 * @param serviceIn
	 * @return
	 */
	boolean addSourceServiceIn(AimlCfgLogSourceServiceIn serviceIn);

	/**
	 * 添加JDBC数据源
	 * 
	 * @param agent
	 * @return
	 */
	boolean addSourceJDBC(AimlCfgLogSourceJDBC jdbcSource);

	/**
	 * 添加kafka数据源
	 * 
	 * @param agent
	 * @return
	 */
	boolean addSourceKafka(AimlCfgLogSourceKafka kafkacSource);

	/**
	 * 获取代理采集数据源信息
	 * 
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceAgent getAgentSource(long sourceId);

	/**
	 * 获取本地上传数据源信息
	 * 
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceManualUp getManualUpSource(long sourceId);

	/**
	 * 获取服务接入数据源
	 * 
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceServiceIn getServiceInSource(long sourceId);

	/**
	 * 获取JDBC数据源信息
	 * 
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceJDBC getJDBCSource(long sourceId);

	/**
	 * 获取KAFKA数据源信息
	 * 
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceKafka getKafkaSource(long sourceId);

	/**
	 * 判断数据源名称是否已存在
	 * 
	 * @param sourceName
	 * @return
	 */
	boolean judgmentSourceName(String sourceName);

	/**
	 * 获取本地服务地址
	 * 
	 * @param sourceType
	 * @return
	 */
	List<Map<String, Object>> getServices(String sourceType);

	/**
	 * 获取服务器目录列表
	 * 
	 * @param dir
	 * @return
	 */
	Map<String, String> getHostDirs(String dir);

	/**
	 * 上传文件
	 * 
	 * @param file
	 * @return
	 */
	String uploadFile(File file, String fileName);

	/**
	 * 获取系统分类常量信息
	 * 
	 * @param category
	 * @return
	 */
	Map<String, String> getSysConfigVariables(String category);

	/**
	 * 根据应用系统app分类获取分类下的日志源列表
	 * 
	 * @return [ { appid:appid, appname:appname, sourceIds:[sourceId],
	 *         sourceNames:[sourceName] } ]
	 */
	List<Map<String, Object>> getSourcesGroupByApp();

	/**
	 * 查看字段的名
	 * 
	 * @param sourceId
	 * @return
	 */
	Map<String, String> getFileName(long sourceId);

	/**
	 * 查询日志源
	 * 
	 * @param sources
	 *            日志源id集合
	 * @return
	 */
	List<AimlCfgLogSource> getByIds(JSONArray sources);

	/**
	 * 根据资产配置查询日志源
	 * 
	 * @param type
	 *            A1 - 应用一级分类 A2 - 应用二级分类 A3 - 应用三级分类 AA - 应用系统编号 F1 - 资产一级分类 F2
	 *            - 资产二级分类 F3 - 资产三级分类 FF - 资产对象编号 Y1 Y2 Y3 YY
	 * @param value
	 * @return
	 */
	List<AimlCfgLogSourceQuery> getSourceList(String type, String value);

	/**
	 * 获取日志源配置结构化字段
	 * 
	 * @param sourcesIds
	 * @return
	 */
	List<Fields> getPrivateField(List<Long> sourcesIds);

	/**
	 * 查看用户的权限
	 * 
	 * @param userName
	 *            用户名
	 * @param objType
	 *            数据类型
	 * @return
	 * @throws Exception
	 */
	List<Long> getUserDataRole(String userName, String objType)
			throws Exception;

	/**
	 * 根据条件查询日志源
	 * 
	 * @param whereEx
	 * @return
	 */
	List<AimlCfgLogSource> getAimlCfgLogSource(Map<String, Object> whereEx);

	/**
	 * 刷新所有
	 * 
	 * @return
	 */
	void refresh();

	/**
	 * 暂停
	 * 
	 * @param type
	 * @param value
	 * @return
	 */
	boolean stopBySourceType(String type, String value);

	/**
	 * 启动
	 * 
	 * @param type
	 * @param value
	 * @return
	 */
	boolean startBySourceType(String type, String value);

	/**
	 * 通过appid获取appname
	 * 
	 * @param appid
	 * @return
	 * @throws SQLException
	 */
	String getAppNameByAppid(Long appid) throws SQLException;


	/**
	 * 新添加私有字段
	 * 
	 * @param fields
	 * @param sourceId
	 * @return
	 * @throws SQLException
	 */
	boolean newAddPrivateField(List<AimlCfgLogSplitFieldV1> fields,
			long sourceId) throws SQLException;

	/**
	 * 查询私有字段列表
	 * @param sourceId
	 * @return
	 * @throws SQLException
	 */
	List<AimlCfgLogSplitFieldV1> getPrivateFields(Long sourceId)
			throws SQLException;

	/**
	 * 删除私有字段
	 * @param structIds
	 * @return
	 * @throws SQLException
	 */
	boolean newDeletePrivateField(List<Long> structIds) throws SQLException;
	
	/**
	 * 修改私有字段
	 * @param fields
	 * @return
	 * @throws SQLException 
	 */
	boolean newUpdatePrivateFields(List<AimlCfgLogSplitFieldV1> fields) throws SQLException;
	
	Map<String, Object> getAllSourceIdSourceName() throws SQLException;
	

	/**
	 * 新添加代理采集数据源
	 * @param agent
	 * @param fields
	 * @return
	 */
	boolean addSourceAgentNew(AimlCfgLogSourceAgent agent, List<AimlCfgLogSplitFieldV1> fields);
	
	/**
	 * 新修改代理采集数据源
	 * @param agent
	 * @param fields
	 * @return
	 */
	boolean updateSourceAgentNew(AimlCfgLogSourceAgent agent,List<AimlCfgLogSplitFieldV1> fields);
	
	/**
	 * 新获取代理采集数据源信息
	 * 
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceAndPrivateFieldVO getAgentSourceNew(long sourceId);

	/**
	 * 查询单笔syslog日志源信息
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceSyslog getSyslogSource(long sourceId);
	
	/**
	 * 查询单笔trap日志源配置信息
	 * @param sourceId
	 * @return
	 */
	AimlCfgLogSourceTrap getTrapSource(long sourceId);

	/**
	 * 修改单笔trap日志源信息
	 * @param trapSource
	 * @return
	 */
	boolean updateSourceTrap(AimlCfgLogSourceTrap trapSource);

	/**
	 * 修改单笔syslog日志源信息
	 * @param syslogSource
	 * @return
	 */
	boolean updateSourceSyslog(AimlCfgLogSourceSyslog syslogSource);

	JSONArray getSourceField(long sourceId);

	AimlCfgLogSourceHttp getHttpSource(long sourceId);

	boolean addSourceTcp(AimlCfgLogSourceTcp tcpSource,
			List<AimlCfgLogSplitFieldV1> fields);

	AimlCfgLogSourceTcp getTcpSource(long sourceId);

	boolean addSourceHttp(AimlCfgLogSourceHttp httpSource,
			List<AimlCfgLogSplitFieldV1> fields);

	boolean addSourceTrap(AimlCfgLogSourceTrap trapSource,
			List<AimlCfgLogSplitFieldV1> fields);

	boolean addSourceSyslog(AimlCfgLogSourceSyslog syslogSource,
			List<AimlCfgLogSplitFieldV1> fields);

	boolean addSourceSnmp(AimlCfgLogSourceSnmp snmpSource,
			List<AimlCfgLogSplitFieldV1> fields);

	AimlCfgLogSourceSnmp getSnmpSource(long sourceId);

	public List<Map<String, Object>> getAppObjects(String app_id,String cate);
}
