package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.PageOracleBase;

public interface IAppOracle {

	/**
	 * 获取oracle页面基本信息
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	PageOracleBase getOracleBase(Long objectId) throws Exception;

	/**
	 * 获取关键使用率echarts
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getImportUsedEcharts(Long objectId,int time, int interval,
			TimeUnit unit);

	/**
	 * 超长语句echarts
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getLongStatementEcharts(Long objectId,int time, int interval,
			TimeUnit unit);
	
	/**
	 * 超长事务echarts
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getLongWorkEcharts(Long objectId,int time, int interval,
			TimeUnit unit);
	
	/**
	 * 死锁echarts
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getDeadlockEcharts(Long objectId,int time, int interval,
			TimeUnit unit);
	
	/**
	 * 当前连接数echarts
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getConnectionEcharts(Long objectId,int time, int interval,
			TimeUnit unit);
	
	/**
	 * 当前活动会话数echarts
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getAliveSessionEcharts(Long objectId,int time, int interval,
			TimeUnit unit);
	
	/**
	 * 系统资源echarts
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getSysResourcesEcharts(Long objectId,int time, int interval,
			TimeUnit unit);
	
	/**
	 * 获取表空间使用情况 echarts
	 * 
	 * @param objectId
	 * @return
	 */
	Map<String,List<String>> getTableSpaceEcharts(Long objectId);
	
}
