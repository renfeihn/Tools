package tc.cama.aweb.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.cama.core.service.metric.MetricConstants;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AppOsMem;
import tc.cama.aweb.bean.PageOsBase;

public interface IAppOs {

	/**
	 * 获取操作系统基本信息
	 * 
	 * @param logicalId
	 * @return
	 * @throws Exception
	 */
	PageOsBase getOsBaseInfo(Long logicalId) throws Exception;

	/**
	 * 获取cpuecharts
	 * 
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getCpuEcharts(Long objectId, Date startDate, int interval, TimeUnit unit);

	/**
	 * 获取内存echarts
	 * 
	 * @param objectId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getMemEcharts(Long objectId, String metricName, Date startDate, int interval, TimeUnit unit);

	/**
	 * 获取当前内存的值
	 * 
	 * @param objectId
	 * @return
	 */
	AppOsMem getCurrMem(Long objectId);

	/**
	 * 获取磁盘指标标签
	 * 
	 * @param objectId
	 * @return
	 */
	List<String> getDiskTags(Long objectId);

	/**
	 * 获取磁盘echarts
	 * 
	 * @param objectId
	 * @param tagvs
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getDiskEcharts(Long objectId, String tagvs, Date startDate, int interval, TimeUnit unit);
	
	

	/**
	 * 获取文件系统 echarts
	 * 
	 * @param objectId
	 * @return
	 */
	Map<String,List<String>> getFileEcharts(Long objectId);

	/**
	 * 获取网卡指标标签
	 * 
	 * @param objectId
	 * @return
	 */
	List<String> getNetTags(Long objectId);
	
	/**
	 * 获取网卡echarts
	 * 
	 * @param objectId
	 * @param tagvs
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 */
	Timeline<Double> getNetEcharts(Long objectId, String tagvs, Date startDate, int interval, TimeUnit unit);

	Map<String, Object> getTopProcs(Long objectId, int top, MetricConstants.Metric metric);


}
