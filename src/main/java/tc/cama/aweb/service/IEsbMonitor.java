package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.PageEsbMonitor;
import tc.cama.aweb.esb.model.EsbErrorFlow;
import tc.cama.aweb.esb.model.EsbMonMS;
import tc.cama.aweb.esb.model.EsbTransError;

public interface IEsbMonitor {

	/**
	 * esb对象监控视图列表查询
	 * @param type
	  * <li> -1 - 全量数据
	  * <li> 1  - ESB应用实例
	  * <li> 2  - 渠道消费者
	  * <li> 3  - 服务提供者
	  * <li> 4  - 服务接口
	  * <li> 5  - 异常服务
	 * @param statisticType
	 * <li> 1  - day_totnum			日交易量
	 * <li> 2  - day_sys_rate		日系统成功率
	 * <li> 3  - day_buss_rate		日业务成功率
	 * <li> 4  - day_trans_avgtime	日交易平均处理时间
	 * <li> 5  - day_esb_avgtime	日ESB内部平均处理时间
	 * <li> 6  - day_expt			日异常笔数
	 * <li> 7 - curr_totnum			当前交易量
	 * <li> 8 - curr_sys_rate		当前系统成功率
	 * <li> 9 - curr_buss_rate		当前业务成功率
	 * <li> 10 - curr_tps			当前TPS
	 * <li> 11 - curr_trans_avgtime	当前交易处理时间
	 * <li> 12 - curr_esb_avgtime	前ESB内部平均处理时间
	 * <li> 13 - stop_hold_time_flag 	当前系统持续无交易时间
	 * @param orderType
	 * <li> 1 - 升序排列 ASC
	 * <li> 2 - 降序排列 DESC
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getEsbMonList(int type, int statisticType, int orderType, int top) throws Exception;

	/**
	 * 获取echarts
	 * @param flag
	 * <li>1 - 实时echarts
	 * @param internal
	 * 		查询多少分钟历史数据
	 * @param type
	 * 			esb表中对象类型
	 * @param monitorObject
	 * @param field
	 * <li>1 - dayTotnum; //日交易量 
	 * <li>2 - daySysRate; //日系统成功率
	 * <li>3 - dayBussRate; //日业务成功率 
	 * <li>4 - dayTransAvgtime; //日交易平均处理时间
	 * <li>5 - currTotnum; //当前交易量 
	 * <li>6 - currSysSuccNum; //当前系统成功笔数 
	 * <li>7 - currSysErrNum; //当前系统错误笔数 
	 * <li>8 - currBussSuccNum; //当前业务成功笔数 
	 * <li>9 - currBussErrNum; //当前业务错误笔数 
	 * <li>10 - currSysRate; //当前系统成功率
	 * <li>11 - currBussRate; //当前业务成功率 
	 * <li>12 - currTps; //当前TPS 
	 * <li>13 - currTransAvgtime; //当前交易处理时间
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getEcharts(int flag, int internal, int type,
			String monitorObject, int field) throws Exception;
	
	/**
	 * 获取5分钟、10分钟、30分钟、60分钟echarts
	 * @param flag
	 * <li>1 - 实时echarts
	 * @param interval
	 * 		查询数据的时间间隔
	 * @param type
	 * <li>1 - a ESB应用
	 * <li>2 - c 服务消费者
	 * <li>3 - p 服务提供者 *
	 * @param monitorObject
	 * @param field
	 * <li>14 - sumTotnum; //总交易量
	 * <li>15 - avgSysRate; //系统成功率
	 * <li>16 - avgBussRate; //业务成功率
	 * <li>17 - avgTps; //TPS
	 * <li>18 - avgTransAvgtime; //交易处理时间
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getEchartsData(int flag, int interval, int type,
			String monitorObject, List<Integer> field) throws Exception;
	
	/**
	 * 获取esb对象基本信息
	 * @param type
	 * @param monitorObject
	 * @return
	 * @throws Exception
	 */
	PageEsbMonitor getEsbDetail(int type, String monitorObject)
			throws Exception;
	
	/**
	 * 方法1：今日和昨日Echarts
	 * @param flag
	 * @param interval
	 * @param time
	 * @param type
	 * @param monitorObject
	 * @param field
	 * @return
	 * @throws Exception
	 */
	Timeline<Double> getTwoTimeEcharts(int flag, int interval, int time,
			int type, String monitorObject, int field) throws Exception;
	
	/**
	 * 方法2：今日和昨日Echarts
	 * @param flag
	 * @param interval
	 * @param time
	 * @param type
	 * @param monitorObject
	 * @param field
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getDayAndYesEcharts(int flag, int interval,
			int time, int type, String monitorObject, int field)
			throws Exception;
	
	/**
	 * 获取错误码信息
	 * @param type
	 * <li> 1  - ESB应用实例
	 * <li> 2  - 渠道消费者
	 * <li> 3  - 服务提供者
	 * <li> 4  - 服务接口
	 * <li> 5  - 异常服务
	 * @param logicsystem
	 * @param orderFlag
	 * 			1-按错误次数降序排
	 * @param top
	 * 			>0 取limit
	 * @return
	 * @throws Exception
	 */
	List<EsbTransError> getErrorInfo(int type, String logicsystem,
			int orderFlag, int top) throws Exception;
	
	/**
	 * 获取错误码信息
	 * @param type
	 * <li> 1  - ESB应用实例
	 * <li> 2  - 渠道消费者
	 * <li> 3  - 服务提供者
	 * <li> 4  - 服务接口
	 * <li> 5  - 异常服务
	 * @param logicsystem
	 * @param respcode
	 * @param top
	 * 		>0 取limit
	 * @return
	 * @throws Exception
	 */
	List<EsbErrorFlow> getErrorFlowInfo(int type, String logicsystem,
			String respcode, int top) throws Exception;

	

}
