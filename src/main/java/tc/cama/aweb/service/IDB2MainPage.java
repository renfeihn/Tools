package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.aim.alibaba.fastjson.JSONArray;

import tc.bank.cama.core.bean.MetricVO;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AppEventView;
import tc.cama.aweb.bean.DB2BaseInfo;
import tc.cama.aweb.bean.DBConfigInfo;

public interface IDB2MainPage {
	/**
	 * 获取DB2基础信息
	 * @throws Exception 
	 */
	
	public DB2BaseInfo getDB2BaseInfo(Long objId) throws Exception;
	
	
  /**
   * 获取事件统计信息
   * @param objId
   * @return
   */
	public AppEventView getEventView(Long objId);
	/**
	 * 获取db2基础配置信息
	 * @param objId
	 * @return
	 */
	public DBConfigInfo getDBConfig(Long objId) throws Exception ;
	/**
	 * 获取db2健康度
	 * @param objId
	 * @return
	 */
	public int  getHelRate(Long objId);
	/**
	 * 获取数据库运行状态
	 * @param objId
	 * @return
	 */
	public List<MetricVO> getDB2RunStatus(Long objId); 
	
	/**
	 * 获取表空间使用率
	 * @param objId
	 * @return
	 */
	public Map<String, List<String>> getTableSpaceUsedRate(Long objId);
	
	/**
	 * 获取系统资源Echarts
	 * @param objId
	 * @param metricNames
	 * @param startDate
	 * @param timeBlock
	 * @param interval
	 * @param unit
	 * @return
	 */
	public Timeline<Double> getSysResourceEcharts(Long objId, int time, int interval, TimeUnit unit)throws Exception ;
	/**
	 * 获取各种指标echarts
	 * 
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param metricNames
	 * @param unit
	 * @return
	 */
	public Timeline<Double> getEcharts(Long objId, String[] metricNames, int time, int interval, TimeUnit unit);
	
	/**
	 * 获取表空间数据
	 * @param objId
	 * @param metricNames
	 * @param time
	 * @param interval
	 * @param unit
	 * @return
	 */
	public JSONArray getTableSpaceData(Long objId,int time, int interval, TimeUnit unit);
}
