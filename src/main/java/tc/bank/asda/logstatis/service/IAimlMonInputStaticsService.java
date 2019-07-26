package tc.bank.asda.logstatis.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.aim.alibaba.fastjson.JSONObject;

public interface IAimlMonInputStaticsService {

	/**
	 * 日志采集统计
	 * @param staticsDate  统计采集日期
	 * @return  JSONObject
	 * 			appNum  采集应用系统数  
	 *          ipNum   采集主机数
	 *          logDataToTalSize   采集日志总量
	 *          currentLogDataIps  日志采集速率
	 * @throws Exception
	 */
	JSONObject logCollectionStatics(String staticsDate) throws Exception;
	
	/**
	 * 查询某个分类下的对象的日志量
	 * @param statisticstype  统计类型  1-主机 2-应用 3-数据源
	 * @param keyName   筛选关键字名称 (模糊查询)
	 * @param recordTime 统计数目
	 * @return
	 * @throws Exception
	 */
	JSONObject getMonInputByType(String statisticstype, List<String> keyid, int timemodel) throws Exception;

	
	/**
	 * 查询对象数组在某段时间的日志量
	 * @param statisticstype  统计类型  1-主机 2-应用 3-数据源
	 * @param keyIds     对象列表
	 * @param startTime  开始时间
	 * @param endTime    结束时间
	 * @param topSize 排序TOP数目
	 * @param sortType 1 生序 2 降序
	 * @param orderField 排序字段 采集速率/采集总量
	 * @return
	 * {
	 * "keyid0_keyname0":{"recordtime":[],"dataips":[]},
	 * "keyid1_keyname1":{"recordtime":[],"dataips":[]}
	 * }
	 * 
	 * 
	 * @throws Exception
	 */
	List<Map<String, Object>> getMonInputByKeyIds(String statisticstype, String queryStr, int timeInterval, int startNumber,int topSize,int sortType,String orderField) throws Exception;
	/**
	 * 获取流量采集汇总页面的结构树
	 * @param statisticsType
	 * @param keyName
	 * @return
	 */
	Set<String> getMonInPutStatics(int statisticsType,String keyName);
	/**
	 * 获取流量采集汇总页面的应用汇总信息
	 * @param statisticsType
	 * @param keyName
	 * @return
	 */
	JSONObject getAppStaticsSummary(int statisticsType,String keyName, int duration);
	/**
	 * 获取流量监控对象Echarts
	 * @param statisticsType
	 * @param keyName
	 * @return
	 */
	JSONObject getMonInputECharts(int statisticsType, String keyName, int duration);
	
	/**
	 * 根据应用获取日志量
	 * @param appName
	 * @param timeInterval
	 * @return
	 */
	List<Map<String, Object>> getMonInputByApp(int timeInterval,String appName);
	
	/**
	 * 分页统计
	 * @param statisticsType
	 * @param pageSize
	 * @param pageNum
	 * @return
	 */
	JSONObject statisMonInput(String statisticsType,int pageSize,int pageNum,String orderField);
	
	/**
	 * 查询应用速度
	 * @param statisticstype 统计类型 1-主机 2-应用 3-数据源
	 * @param intervalMinute 统计时间段
	 * @param intervalSecond 时间间隔
	 * @param keyid 应用id，keyid有值查一个应用的速度情况，keyid为NULL时查所有
	 * @return 
	 * @throws Exception
	 */
	JSONObject getAppIps(String statisticstype,String keyid,int intervalMinute, int intervalSecond)throws Exception;
	
	/**
	 * 获取应用名称与id映射
	 * @return
	 * @throws SQLException 
	 */
	Map<String, Object> getAppIdMapping() throws SQLException;
	
	JSONObject logCollectionStaticsByAppID(long appid) throws Exception;
	
	public List<Map<String, Object>> getMonInputByKeyIdsByAppid(String statisticstype,
			long appid, int timeInterval, int startNumber, int topSize,
			int sortType, String orderField) throws Exception ;
}
