package tc.cama.aweb.ab.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.ab.model.AimAbcListCur;
import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.model.AimAbsStatisConfig;
import tc.cama.aweb.bean.ABEvent;
import tc.cama.aweb.bean.AbsBean;

/**
 * ABS应用视图接口
 * @author Win-User
 *
 */
public interface IABSManager{

	/**
	 * 平台体检
	 * 虚拟机内存
	 * 端口状态
	 * 进程状态
	 * cpu使用率
	 * 物理内存使用率
	 * abc连接数
	 */
	AbsBean getPlatformState(int objId);
	
	/**
	 * 根据目标对象获取Abs表实时数据
	 * @return
	 */
	AimAbsDynamicCur getAimAbsDynamicCur(int mobjId);
	
	/**
	 * 单ABS静态数据
	 * @param mobjId
	 * @return
	 */
	AimAbsStatisConfig getStaticsConfig(int mobjId);
	
	/**
	 * 获取单ABS首页事件的echarts
	 * @param objectId
	 * @param time
	 * @param interval
	 * @return
	 */
	Timeline<Integer> getAbsEventTotal(int objectId,int time,int interval);

	/**
	 * ABS首页 根据机构信息查询Abc列表
	 * @param brnosList
	 * @param agentName
	 * @return
	 */
	List<AimAbcListCur> getAbcListByBrnos(List<String> brnosList,int mobjId);

	/**
	 * 登陆终端数量查询
	 * @return
	 */
	Map<String, List<String>> getLoginCountEcharts(int mobjId,int time,int interval);
	
	/**
	 * CPU/内存使用率
	 * @param agentName
	 * @param time
	 * @param interval
	 * @return
	 */
	Timeline<Double> getCPUMEMEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);
	
	/**
	 * 文件句柄数Echarts
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getFileNumEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);

	/**
	 * 端口监听Echarts
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getPortListenEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);


	/**
	 * 数据库连接数Echarts
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getConnectCountEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);
	
	
	/**
	 * 任务平均处理时间
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getTaskAvgTimeEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);


	/**
	 * 交易,通讯量Echarts
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getCommTradeCountEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);

	
	/**
	 * 最大连接数，当前连接数分析
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getJDBCMaxNumEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);

	/**
	 * 最大空闲连接数
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getJDBCMaxIDLEEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);

	/**
	 * 等待队列分析
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getJDBCWaitQueueEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);

	/**
	 * 数据库链接分析
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getJDBCBadConnectEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);
	
	/**
	 * 数据库检出分析
	 * @param mobjId
	 * @param startDate
	 * @param interval
	 * @param timeUnit
	 * @return
	 */
	Timeline<Double> getJDBCCheckOutEcharts(int mobjId, int time, int interval,TimeUnit timeUnit);

	/**
	 * 获取JDBC的指标事件数
	 * @param appId
	 * @return
	 */
	ABEvent getJDBCEventByMetric(int appId);
	
	/**
	 * 获取JDBC健康度
	 * @param objectId
	 * @return
	 */
	int getJDBCHealthy(int objectId);
	
	
	/**
	 * 获取上次平台体检时间
	 * @param mobjId
	 * @return
	 */
	String getPlatformTime(int mobjId);
	
	
}
