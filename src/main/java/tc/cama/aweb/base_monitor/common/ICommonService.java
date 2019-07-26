package tc.cama.aweb.base_monitor.common;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.bank.cama.core.module.AimDataMetrics;
public interface ICommonService {

	/**获取指标Echart
	 * @param objId 对象ID
	 * @param metricNames 指标集合
	 * @param time
	 * @param interval
	 * @return
	 */
	public Map<String, Object> getEchart(int objId, String[] metricNames,int time, int interval);
	
	/**获取指标Echart
	 * @param objId
	 * @param metricNames
	 * @param time
	 * @param interval
	 * @param unit
	 * @return
	 */
	public Map<String, Object> getEchart(int objId, String[] metricNames,int time, int interval,TimeUnit unit);
	
	/**获取指标列表数据
	 * @param objId
	 * @param result_set 比如：os_cpu
	 * @param whereEx
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getKeyMetric(int objId,String metricName,Map<String, Object> whereEx) throws Exception ;
	

	/**获取指标列表数据
	 * @param objId
	 * @param result_set 比如：os_cpu
	 * @param whereEx
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getKeyMetricBywhere(String metricName,Map<String, Object> whereEx) throws Exception ;
	
	
	
	/**获取指标列表数据
	 * @param objId 对象ID
	 * @param result_set 指标集
	 * @param whereJson 按某字段排序，例子：{'id':'desc','name':'asc'}
	 * @param top 取结果的前几条数据
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getKeyMetric(int objId,String metricName,String orderJson,int top) throws Exception ;
	
	/**
	 * @param metricCategory 
	 * @return
	 */
	/**获取指标展开项
	 * @param categoryKind 指标所属类型：比如os，was
	 * @param category 指标分类：os_cpu, 不传则查询所有
	 * @return
	 */
	public List<Map<String,Object>> getMetricExpand(String categoryKind);
	
	/**获取单指标信息
	 * @param objId
	 * @param metricName
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getMetricInfo(int objId,String metricName);
	
	/**获取多指标信息
	 * @param objId
	 * @param metricName
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getMetricInfo(int objId,String[] metricName);
	
	/**
	 * 获取指标echarts数据
	 * @param time
	 * @param interval
	 * @param objectId
	 * @param metricName
	 * @param echarts_type
	 * @return
	 */
	public Map<String, Object> getMetricEcharts(int time, int objectId,
			int interval, String metricName,int echarts_type); ;
	/**
	 * 获取事件Echars数据
	 * @param time
	 * @param interval
	 * @param l1CateName
	 * @param l2CateName
	 * @param l3CateName
	 * @return
	 */
	public Map<String, Object> getEventEcharts(int time,int interval,String l1CateName,String l2CateName,String l3CateName);
	/**
	 * 
	 * @param kpi_set
	 * @param startTime
	 * @param endTime
	 * @param kpi_item
	 * @param obj_id
	 * @param flag
	 * @return
	 */
	public Map<String,Object> queryObjectList(String kpi_set,String startTime, String endTime,
			String[] kpi_item, String obj_id,boolean flag);
	
	/**关键指标列表
	 * @param metricKind 指标所属类型：比如os，was
	 * @return
	 */
	public List<Map<String,Object>> getColums(String metricKind);

	/** 获取基本信息
	 * @param class1  一级分类，例子：os
	 * @param class2  二级分类，例子：linux
	 * @param objectId 对象ID
	 * @return
	 */
	public List<Map<String,Object>> getBaseInfo(String class1,String class2,int objectId);
	/**
	 * 查询事件统计数据
	 * @param objId
	 * @return
	 */
	
	public Map<String,Object> getEventCount(int objId,int time,int interval);
	
	/**
	 * 查询实例信息
	 * @param ins_type
	 * @return
	 */
	
//	public List<Map<String, Object>> getInsTotalInfo(String ins_type);
	
	/**根据二级分类获取汇总页面信息(关键KPI和列表)
	 * @param category
	 * @return
	 * @throws Exception
	 */
	public Map<String,Object> getSumInfoByCate(String category);
	
	public Map<String, Object> getSingleEcharts(int time, int objectId,String objName,int interval, String metricName,int echarts_type);

	/**单对象多指标时间段
	 * @param objId
	 * @param metricNames
	 * @param tagvs
	 * @param time
	 * @param interval
	 * @return
	 */
	public Map<String, Object> getEchart(int objId, String[] metricNames, String tagvs, int time,int interval);
	
	/**获取指标tag
	 * @param objId 对象ID
	 * @param metricName 指标
	 * @return
	 */
	public List<String> getMetricTags(int objId,String metricName);
	
	/**获取指标的数量
	 * @param objId 对象ID
	 * @param metricName aim_define_metric表里的name字段
	 * @return
	 * @throws Exception
	 */
	public String getMetricCount(int objId,String result_set,String filed,String json);
	
	public String getHTML(String pageName);
	
	/**获取Echart（对多个tag结果进行求和/平均）
	 * @param objId
	 * @param metricNames
	 * @param time
	 * @param interval
	 * @param calType 默认求和，传参'avg'求平均
	 * @return
	 */
	public Map<String, Object> getEchartSumValue(int objId, String[] metricNames,int time, int interval,String calType);
	/**单对象多指标时间段
	 * @param objId
	 * @param metricNames
	 * @param tagvs 适用于所传标签和库里标签包含关系
	 * @param time
	 * @param interval
	 * @return
	 */
	public Map<String, Object> getEchartByTagLike(int objId, String[] metricNames, String tagvs, int time,int interval);
	/**
	 * 
	 * @param insName
	 * @return
	 */
	public List<Map<String,Object>> queryErrLogKeysOracle(String insName);
	
	/**
	 * 获取主机名 ip  端口等信息
	 * @param objectId
	 * @return
	 * @throws Exception 
	 */
	public Map<String,Object> getMetricProperty(Long objectId) throws Exception;
	/**
	 * 根据对象ip查询逻辑服务器的信息
	 * @param ip
	 * @return
	 * @throws Exception 
	 */
	public CmdbLogicalServer getObjectByIp(String ip) throws Exception;
	/**
	 * 查询软件类型和个数
	 * @return
	 * @throws Exception
	 */
	public Map<String,Object> getSummaryObjInfo(long secondCateId,String l1CateName, String l2CateName)throws Exception;
	/**
	 * 新采集表查询
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getDataMetrics(String type,int objectId,String nodename)throws Exception;
	/**
	 * 
	 * @param time
	 * @param objectId
	 * @param interval
	 * @param metricName
	 * @return
	 * @throws SQLException 
	 */
	public Map<String, Object> getMetricEcharts(int time, int objectId,
			int interval, String[] metricNames) throws Exception; 
	
	public Map<String,AimDataMetrics> getMetric(int objectId,String[] metricNames)throws Exception; 
	/**
	 * 获取自监控数据
	 * @return
	 * @throws Exception 
	 */
	Map<String, Object> getMyMonitorData() throws Exception;

	/**
	 * 自监控实例与事件个数
	 * @param cate
	 * @return
	 * @throws Exception
	 */
	Map<String,Object> getMyMonitorInstance(String cate) throws Exception;
}
