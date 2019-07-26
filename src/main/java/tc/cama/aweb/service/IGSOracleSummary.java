package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.PageOracleBaseInfo;

/**
 * oracle详情
 * @author jcm
 *
 */
public interface IGSOracleSummary {
	/**
	 * 获取基本信息
	 * @return
	 */
	public PageOracleBaseInfo getOracleBase(Long objectId);

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
	 * 获取列表
	 * @param sql
	 * @param objectId
	 * @return
	 */
	public List<Map<String, Object>> getForm(String sql,Integer objectId);
	/**
	 * 获取TOP列表
	 * @param sql
	 * @param objectId
	 * @return
	 */
	public List<Map<String, Object>> getTopForm(String sql,Integer objectId);
	
}
