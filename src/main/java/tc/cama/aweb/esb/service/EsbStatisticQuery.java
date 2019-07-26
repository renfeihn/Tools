package tc.cama.aweb.esb.service;

import java.util.List;
import java.util.Map;

import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.cama.aweb.esb.model.AimEsbAvgtimeunit5min;
import tc.cama.aweb.esb.model.AimEsbAvgtimeunit5minHis;
import tc.cama.aweb.esb.model.AimEsbMonMsext1;
import tc.cama.aweb.esb.model.EsbErrorFlow;
import tc.cama.aweb.esb.model.EsbMonChannelSys;
import tc.cama.aweb.esb.model.EsbMonMS;
import tc.cama.aweb.esb.model.EsbMonNmap;
import tc.cama.aweb.esb.model.EsbMonTrans;
import tc.cama.aweb.esb.model.EsbMonTransService;
import tc.cama.aweb.esb.model.EsbService;
import tc.cama.aweb.esb.model.EsbShowSystem;
import tc.cama.aweb.esb.model.EsbSystem;
import tc.cama.aweb.esb.model.EsbTransError;

/**
 * ESB统计信息查询接口
 */
public interface EsbStatisticQuery {

	/**
	 * 1. 按监控类型（MON_TYPE）获取对象的日APM统计信息并排序（TOP）
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param statisticType
	 *            <li>1 - day_totnum 日交易量
	 *            <li>2 - day_sys_rate 日系统成功率
	 *            <li>3 - day_buss_rate 日业务成功率
	 *            <li>4 - day_trans_avgtime 日交易平均处理时间
	 *            <li>5 - day_esb_avgtime 日ESB内部平均处理时间
	 *            <li>6 - day_expt 日异常笔数
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * 
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getDailyTopStatistic(int monitorType, int statisticType, int orderType, int top) throws Exception;

	/**
	 * 2. 按监控类型（MON_TYPE）获取对象的实时APM统计信息并排序（TOP）
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param statisticType
	 *            <li>1 - curr_totnum 当前交易量
	 *            <li>2 - curr_sys_rate 当前系统成功率
	 *            <li>3 - curr_buss_rate 当前业务成功率
	 *            <li>4 - curr_tps 当前TPS
	 *            <li>5 - curr_trans_avgtime 当前交易处理时间
	 *            <li>6 - curr_esb_avgtime 前ESB内部平均处理时间
	 *            <li>7 - stop_hold_time_flag 当前系统持续无交易时间
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * 
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getCurrentTopStatistic(int monitorType, int statisticType, int orderType, int top) throws Exception;

	/**
	 * 3. 按监控类型（MON_TYPE）获取对象的日APM统计信息并排序（TOP）
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * 
	 * @param statisticType
	 *            <li>1 - day_totnum 日交易量
	 *            <li>2 - day_sys_rate 日系统成功率
	 *            <li>3 - day_buss_rate 日业务成功率
	 *            <li>4 - day_trans_avgtime 日交易平均处理时间
	 *            <li>5 - day_esb_avgtime 日ESB内部平均处理时间
	 *            <li>6 - day_expt 日异常笔数
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * 
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getDailyTopStatistic(int monitorType, String monitorObject, int statisticType, int orderType,
			int top) throws Exception;

	/**
	 * 4. 按监控类型（MON_TYPE）获取对象的实时APM统计信息并排序（TOP）
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * 
	 * @param statisticType
	 *            <li>1 - curr_totnum 当前交易量
	 *            <li>2 - curr_sys_rate 当前系统成功率
	 *            <li>3 - curr_buss_rate 当前业务成功率
	 *            <li>4 - curr_tps 当前TPS
	 *            <li>5 - curr_trans_avgtime 当前交易处理时间
	 *            <li>6 - curr_esb_avgtime 前ESB内部平均处理时间
	 *            <li>7 - stop_hold_time_flag 当前系统持续无交易时间
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * 
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getCurrentTopStatistic(int monitorType, String monitorObject, int statisticType, int orderType,
			int top) throws Exception;

	/**
	 * 5.按监控类型（MON_TYPE）、监控对象（MON_OBJ）获取指定时间段的APM统计信息
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * 
	 * @param startTime
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param endTime
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC startTime to endTime
	 *            <li>2 - 降序排列 DESC endTime to startTime
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getPeriodStatisticDetail(int monitorType, String monitorObject, String startTime, String endTime,
			int orderType) throws Exception;

	/**
	 * 6.按监控类型（MON_TYPE）、监控对象（MON_OBJ）获取当前最新的APM统计信息
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getCurrentStatisticDetail(int monitorType, String monitorObject) throws Exception;

	/**
	 * 7.按监控类型（MON_TYPE）、监控对象（对象列表）获取对象的实时APM统计信息并排序（TOP）
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObjects
	 * 
	 * @param statisticType
	 *            <li>1 - curr_totnum 当前交易量
	 *            <li>2 - curr_sys_rate 当前系统成功率
	 *            <li>3 - curr_buss_rate 当前业务成功率
	 *            <li>4 - curr_tps 当前TPS
	 *            <li>5 - curr_trans_avgtime 当前交易处理时间
	 *            <li>6 - curr_esb_avgtime 前ESB内部平均处理时间
	 *            <li>7 - stop_hold_time_flag 当前系统持续无交易时间
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getObjectsCurrentTopStatistic(int monitorType, List<String> monitorObjects, int statisticType,
			int orderType, int top) throws Exception;

	/**
	 * 8.根据APPid获取ESB系统信息（MON_OBJ）
	 * 
	 * @param objectId
	 *            系统的CMDB对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	EsbSystem getEsbSystemByCmdbObjectId(Long objectId) throws Exception;

	/**
	 * 9.根据服务获取所属系统信息
	 * 
	 * @param serviceId
	 * @return
	 * @throws Exception
	 */
	EsbSystem getEsbSystemByServiceId(String serviceId) throws Exception;
	
	
	
	/**
	 * 9.根据服务获取所属系统信息
	 * 
	 * @param serviceId
	 * @return
	 * @throws Exception
	 */
	List<EsbSystem> getEsbSystemByServiceIds(List<String> serviceIds) throws Exception;
	
	

	/**
	 * 10.根据系统获取服务
	 * 
	 * @param systemId
	 * @return
	 * @throws Exception
	 */
	List<EsbService> getEsbServiceBySystemId(int systemId) throws Exception;

	/**
	 * 10.根据系统获取服务
	 * 
	 * @param List<String> syscode
	 * @return
	 * @throws Exception
	 */
	List<EsbService> getEsbServiceBySyscode(List<String> syscode) throws Exception;

	/**
	 * 12.根据syscode, 在aim_esb_system找对应的一条记录
	 * 
	 * @param syscode
	 * @return
	 * @throws Exception
	 */
	EsbSystem getEsbSystemMonitorObject(String syscode) throws Exception;

	/**
	 * 13.根据syscode, 在aim_esb_system找对应的多条记录
	 * 
	 * @param syscode
	 * @return
	 * @throws Exception
	 */
	List<EsbSystem> getEsbSystemMonitorObject(List<String> syscode) throws Exception;

	/**
	 * 14.返回aim_esb_system的表记录数, 作为系统总数
	 * 
	 * @return
	 * @throws Exception
	 */
	Long getEsbSystemCount() throws Exception;

	/**
	 * 15.返回ESB流水信息
	 * 
	 * @param transType
	 *            transType-key值
	 * 			<li> 1 - 状态 respstatus
	 * 			<li> 2 - 渠道ID channelid
	 * 			<li> 3 - 服务ID ServiceId
	 * 			<li> 4 - 系统名称 logicsystem
	 * @param pageable
	 * @return
	 * @throws Exception
	 */
	Page<EsbMonTransService> getEsbMonTransDetail(Map<Integer, Object> transType, Pageable pageable) throws Exception;

	/**
	 * 16.按监控类型（MON_TYPE）、监控对象（对象列表）获取对象的日统计APM统计信息并排序（TOP）
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * 
	 * @param statisticType
	 *            <li>1 - day_totnum 日交易量
	 *            <li>2 - day_sys_rate 日系统成功率
	 *            <li>3 - day_buss_rate 日业务成功率
	 *            <li>4 - day_trans_avgtime 日交易平均处理时间
	 *            <li>5 - day_esb_avgtime 日ESB内部平均处理时间
	 *            <li>6 - day_expt 日异常笔数
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * 
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getObjectsDailyTopStatistic(int monitorType, List<String> monitorObjects, int statisticType,
			int orderType, int top) throws Exception;

	/**
	 * 17.根据监控对象类型、监控对象obj获取各项指标最新5min平均值
	 * 
	 * @param monitorType
	 *            (-1时查询所有monitorType)
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 * @param mon_obj
	 * @return AimEsbAvgtimeunit5min
	 *         <li>MonType 监控对象类型
	 *         <li>MonObj 监控对象
	 *         <li>RecordDatetime 记库时间
	 *         <li>StartDatetime 统计开始时间
	 *         <li>EndDatetime 统计结束时间
	 *         <li>SumTotnum 总交易量
	 *         <li>SumSysSuccNum 系统成功笔数
	 *         <li>SumSysErrNum 系统失败笔数
	 *         <li>SumBussSuccNum 业务成功笔数
	 *         <li>SumBussErrNum 业务成功笔数
	 *         <li>AvgSysRate 系统成功率
	 *         <li>AvgBussRate 业务成功率
	 *         <li>AvgTps tps
	 *         <li>AvgTransAvgtime 交易处理时间
	 *         <li>AvgEsbAvgtime ESB内部平均处理时间
	 * @throws Exception
	 */
	AimEsbAvgtimeunit5min getAimEsbAvgtimeunit5minCurren(int monitorType, String mon_obj) throws Exception;

	/**
	 * 18.根据监控对象类型、监控对象列表获取各项指标最新5min平均值排序(TOP)
	 * 
	 * @param monitorType
	 *            (-1时查询全部monitorType)
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 * @param list_mon_obj
	 *            对象列表
	 * @param avgOrderType
	 *            排序字段 (-1时不排序)
	 *            <li>1-mon_obj 监控对象
	 *            <li>2-record_datetime 记库时间
	 *            <li>3-sum_totnum 总交易量
	 *            <li>4-sum_sys_succ_num 系统成功笔数
	 *            <li>5-sum_sys_err_num 系统失败笔数
	 *            <li>6-sum_buss_succ_num 业务成功笔数
	 *            <li>7-sum_buss_err_num 业务成功笔数
	 *            <li>8-avg_sys_rate 系统成功率
	 *            <li>9-avg_buss_rate 业务成功率
	 *            <li>10-avg_tps tps
	 *            <li>11-avg_trans_avgtime 交易处理时间
	 *            <li>12-avg_esb_avgtime ESB内部平均处理时间
	 * @param orderType(-1时不排序)
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * @param Top
	 *            查询条数 (-1时查询所有)
	 * @param list_mon_obj
	 * @return AimEsbAvgtimeunit5min
	 *         <li>MonType 监控对象类型
	 *         <li>MonObj 监控对象
	 *         <li>RecordDatetime 记库时间
	 *         <li>StartDatetime 统计开始时间
	 *         <li>EndDatetime 统计结束时间
	 *         <li>SumTotnum 总交易量
	 *         <li>SumSysSuccNum 系统成功笔数
	 *         <li>SumSysErrNum 系统失败笔数
	 *         <li>SumBussSuccNum 业务成功笔数
	 *         <li>SumBussErrNum 业务成功笔数
	 *         <li>AvgSysRate 系统成功率
	 *         <li>AvgBussRate 业务成功率
	 *         <li>AvgTps tps
	 *         <li>AvgTransAvgtime 交易处理时间
	 *         <li>AvgEsbAvgtime ESB内部平均处理时间
	 * @throws Exception
	 */
	List<AimEsbAvgtimeunit5min> getListAimEsbAvgtimeunit5minCurren(int monitorType, List<String> list_mon_obj,
			int avgOrderType, int orderType, int Top) throws Exception;

	/**
	 * 19.根据监控对象类型、获取所有监控对象各项指标最新5min平均值排序(TOP)
	 * 
	 * @param monitorType
	 *            (-1时查询全部monitorType)
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 * @param avgOrderType
	 *            排序字段 (-1时不排序)
	 *            <li>1-mon_obj 监控对象
	 *            <li>2-record_datetime 记库时间
	 *            <li>3-sum_totnum 总交易量
	 *            <li>4-sum_sys_succ_num 系统成功笔数
	 *            <li>5-sum_sys_err_num 系统失败笔数
	 *            <li>6-sum_buss_succ_num 业务成功笔数
	 *            <li>7-sum_buss_err_num 业务成功笔数
	 *            <li>8-avg_sys_rate 系统成功率
	 *            <li>9-avg_buss_rate 业务成功率
	 *            <li>10-avg_tps tps
	 *            <li>11-avg_trans_avgtime 交易处理时间
	 *            <li>12-avg_esb_avgtime ESB内部平均处理时间
	 * @param orderType
	 *            (-1时不排序)
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * @param Top
	 *            查询条数 (-1时查全部)
	 * @return AimEsbAvgtimeunit5min
	 * @return AimEsbAvgtimeunit5min
	 *         <li>MonType 监控对象类型
	 *         <li>MonObj 监控对象
	 *         <li>RecordDatetime 记库时间
	 *         <li>StartDatetime 统计开始时间
	 *         <li>EndDatetime 统计结束时间
	 *         <li>SumTotnum 总交易量
	 *         <li>SumSysSuccNum 系统成功笔数
	 *         <li>SumSysErrNum 系统失败笔数
	 *         <li>SumBussSuccNum 业务成功笔数
	 *         <li>SumBussErrNum 业务成功笔数
	 *         <li>AvgSysRate 系统成功率
	 *         <li>AvgBussRate 业务成功率
	 *         <li>AvgTps tps
	 *         <li>AvgTransAvgtime 交易处理时间
	 *         <li>AvgEsbAvgtime ESB内部平均处理时间
	 * @throws Exception
	 */
	List<AimEsbAvgtimeunit5min> getAimEsbAvgtimeunit5minCurren(int monitorType, int avgOrderType, int orderType,
			int Top) throws Exception;

	/**
	 * 20. 分组全量统计monitorType、monitorObject，取每个对象最新一条记录（默认筛选当天最新一条）
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * @param monitorObject
	 * 
	 * @param statisticType
	 *            <li>1 - day_totnum 日交易量
	 *            <li>2 - day_sys_rate 日系统成功率
	 *            <li>3 - day_buss_rate 日业务成功率
	 *            <li>4 - day_trans_avgtime 日交易平均处理时间
	 *            <li>5 - day_esb_avgtime 日ESB内部平均处理时间
	 *            <li>6 - day_expt 日异常笔数
	 *            <li>7 - curr_totnum 当前交易量
	 *            <li>8 - curr_sys_rate 当前系统成功率
	 *            <li>9 - curr_buss_rate 当前业务成功率
	 *            <li>10 - curr_tps 当前TPS
	 *            <li>11 - curr_trans_avgtime 当前交易处理时间
	 *            <li>12 - curr_esb_avgtime 前ESB内部平均处理时间
	 *            <li>13 - stop_hold_time_flag 当前系统持续无交易时间
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * 
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getEsbTopStatistic(int monitorType, List<String> monitorObject, int statisticType, int orderType,
			int top) throws Exception;

	/**
	 * 21.按监控类型（MON_TYPE）、监控对象（MON_OBJ）获取指定时间段的APM统计信息
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * 
	 * @param startTime
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param endTime
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param statisticType
	 *            <li>1 - day_totnum 日交易量
	 *            <li>2 - day_sys_rate 日系统成功率
	 *            <li>3 - day_buss_rate 日业务成功率
	 *            <li>4 - day_trans_avgtime 日交易平均处理时间
	 *            <li>5 - day_esb_avgtime 日ESB内部平均处理时间
	 *            <li>6 - day_expt 日异常笔数
	 *            <li>7 - curr_totnum 当前交易量
	 *            <li>8 - curr_sys_rate 当前系统成功率
	 *            <li>9 - curr_buss_rate 当前业务成功率
	 *            <li>10 - curr_tps 当前TPS
	 *            <li>11 - curr_trans_avgtime 当前交易处理时间
	 *            <li>12 - curr_esb_avgtime 前ESB内部平均处理时间
	 *            <li>13 - stop_hold_time_flag 当前系统持续无交易时间
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC startTime to endTime
	 *            <li>2 - 降序排列 DESC endTime to startTime
	 * 
	 * @param top(<=0代表全部)
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getOnePeriodStatistics(int monitorType, List<String> monitorObject, String startTime, String endTime,
			int statisticType, int orderType, int top) throws Exception;

	/**
	 * 22.按监控类型（MON_TYPE）、监控对象（MON_OBJ）获取指定时间段的APM统计信息
	 * 
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * 
	 * @param startTime1
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param endTime1
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param startTime2
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param endTime2
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param statisticType
	 *            <li>1 - day_totnum 日交易量
	 *            <li>2 - day_sys_rate 日系统成功率
	 *            <li>3 - day_buss_rate 日业务成功率
	 *            <li>4 - day_trans_avgtime 日交易平均处理时间
	 *            <li>5 - day_esb_avgtime 日ESB内部平均处理时间
	 *            <li>6 - day_expt 日异常笔数
	 *            <li>7 - curr_totnum 当前交易量
	 *            <li>8 - curr_sys_rate 当前系统成功率
	 *            <li>9 - curr_buss_rate 当前业务成功率
	 *            <li>10 - curr_tps 当前TPS
	 *            <li>11 - curr_trans_avgtime 当前交易处理时间
	 *            <li>12 - curr_esb_avgtime 前ESB内部平均处理时间
	 *            <li>13 - stop_hold_time_flag 当前系统持续无交易时间
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC startTime to endTime
	 *            <li>2 - 降序排列 DESC endTime to startTime
	 * 
	 * @param top(-1代表全部)
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getTwoPeriodStatisticDetail(int monitorType, List<String> monitorObject, String startTime1,
			String endTime1, String startTime2, String endTime2, int statisticType, int orderType, int top)
			throws Exception;


	/**
	 * 24.按监控类型（MON_TYPE）、监控对象（对象列表）、时间周期、排序对象、排序类型、获取获取对象的5分钟统计APM性能数据并排序（TOP）
	 * 
	 * @param MonType
	 *            (-1时查询全部monitorType)
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者 *
	 * @param startTime
	 * @param endTime
	 * @param monObjList
	 * @param avgOrderType
	 *            排序字段 (-1时不排序)
	 *            <li>1-mon_obj 监控对象
	 *            <li>2-record_datetime 记库时间
	 *            <li>3-sum_totnum 总交易量
	 *            <li>4-sum_sys_succ_num 系统成功笔数
	 *            <li>5-sum_sys_err_num 系统失败笔数
	 *            <li>6-sum_buss_succ_num 业务成功笔数
	 *            <li>7-sum_buss_err_num 业务成功笔数
	 *            <li>8-avg_sys_rate 系统成功率
	 *            <li>9-avg_buss_rate 业务成功率
	 *            <li>10-avg_tps tps
	 *            <li>11-avg_trans_avgtime 交易处理时间
	 *            <li>12-avg_esb_avgtime ESB内部平均处理时间
	 * @param orderType
	 *            (-1时不排序)
	 *            <li>1 - 升序排列 ASC
	 *            <li>2 - 降序排列 DESC
	 * @param Top
	 *            查询条数 (-1时查全部)
	 * @return
	 * @throws Exception
	 */
	List<AimEsbAvgtimeunit5minHis> getHisListAimEsbAvgtimeunit5minHis(int MonType, String startTime, String endTime,
			List<String> monObjList, int avgOrderType, int orderType, int Top) throws Exception;

	/**
	 * 25.查询所有ESB应用系统列表
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbSystem> getListSystem() throws Exception;

	/**
	 * 26.根据ESB的sysId查询CMDB的objId
	 * 
	 * @param sysId
	 * @return
	 * @throws Exception
	 */
	Long getCmdbObjIdByEsbSysId(Long sysId) throws Exception;

	/**
	 * 27.查询所有ESB渠道列表
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbMonChannelSys> getListChannel() throws Exception;

	/**
	 * 27.查询所有ESB渠道列表
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbMonChannelSys> getListChannel(List<String> syscode) throws Exception;
	
	/**
	 * 28.查询所有ESB服务列表
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbService> getListService() throws Exception;
	
	/**
	 * 29.根据系统编号查询系统下错误信息（一个错误码，返回最新一条）
	 * 
	 * @param logicsystem
	 * @return
	 * @throws Exception
	 */
	List<EsbMonTrans> getEsbTransErrorInfo(String logicsystem) throws Exception;

	/**
	 * 30.根据系统编号统计系统下错误发生次数（一个错误码，返回一个count）
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbTransError> getEsbTransErrorCount(String logicsystem,int top) throws Exception;

	/**
	 * 31.根据系统编号统计系统下错误发生次数（一个错误码，返回一个count）
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbTransError> getEsbTransErrorCount(List<String> logicsystem,int top) throws Exception;
	
	/**
	 * 31.按监控类型（MON_TYPE）、监控对象（MON_OBJ）获取指定时间段的APM统计信息(每个对象对应多条)
	 * 		
	 * @param monitorType
	 *            <li>1 - a ESB应用
	 *            <li>2 - c 服务消费者
	 *            <li>3 - p 服务提供者
	 *            <li>4 - s 服务
	 *            <li>5 - e ESB异常
	 * 
	 * @param monitorObject
	 * 
	 * @param startTime
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param endTime
	 *            格式 2016-11-24 10:50:57
	 * 
	 * @param orderType
	 *            <li>1 - 升序排列 ASC startTime to endTime
	 *            <li>2 - 降序排列 DESC endTime to startTime
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbMonMS> getPeriodStatisticDetail(int monitorType, List<String> monitorObject, String startTime, String endTime,
			int orderType) throws Exception;

	/**
	 * 32.查询所有ESB系统列表
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbMonNmap> getListEsbSystem() throws Exception;

	/**
	 * 33.查询所有ESB系统列表(去重)
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbMonNmap> getDistinctEsbSystem() throws Exception;

	/**
	 * 34.查询所有ESB系统列表
	 * 
	 * @return
	 * @throws Exception
	 */
	List<EsbShowSystem> getListShowSystem() throws Exception;
	
	/**
	 * 获取esb对象的错误信息
	 * 
	 * @param type
	 * @param logicsystem
	 * @param orderFlag
	 * @return
	 * @throws Exception
	 */
	List<EsbTransError> getEsbTransErrorInfo(int type, String logicsystem,
			int orderFlag ,int top) throws Exception;
	
	/**
	 * 获取esb对象的错误流水信息
	 * @param type
	 * @param logicsystem
	 * @param respcode
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<EsbErrorFlow> getErrorFlowInfo(int type, String logicsystem,
			String respcode, int top) throws Exception;
	
	/**
	 * 获取top数据 
	 * @param monitorType
	 * @param monitorObject
	 * @param statisticType
	 * @param orderType
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<AimEsbMonMsext1> getTopStatistic(int monitorType, String monitorObject,
			int statisticType, int orderType, int top) throws Exception;

}
