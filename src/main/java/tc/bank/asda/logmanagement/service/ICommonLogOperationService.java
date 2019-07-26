package tc.bank.asda.logmanagement.service;

import java.util.List;
import java.util.Map;

public interface ICommonLogOperationService {

	/**
	 * 获取日志查看、下载统计总数
	 * @param duration
	 * @return
	 */
	public Map<String,Object> getLogStatisSum(int duration);
	
	/**
	 * 获取日志访问趋势图
	 * @param duration
	 * @return
	 */
	public Map<String,Object> getLogAccessEcharts(int duration);
	
	/**
	 * 获取SQL查询趋势图
	 * @param duration
	 * @return
	 */
	public Map<String,Object> getLogSqlSearchEcharts(int duration);
	
	/**
	 * 获取按查询sql 统计次数top10
	 * @param duration
	 * @return
	 */
	public List<Map<String,Object>> getSqlStatisTop10(int duration);
	
	/**
	 * 源日志查看Top10
	 * @param duration
	 * @return
	 */
	public List<Map<String,Object>> getLogViewTop10(int duration);
	
	/**
	 * 源日志下载Top10
	 * @param duration
	 * @return
	 */
	public List<Map<String,Object>> getLogDownloadTop10(int duration);
	
	/**
	 * 按应用统计人员访问日志情况
	 * @param duration
	 * @return
	 */
	public List<Map<String,Object>> getAppLogView(int duration);
	
	/**
	 * 按应用统计人员下载日志情况
	 * @param duration
	 * @return
	 */
	public List<Map<String,Object>> getAppLogDownLoad(int duration);
	
	/**
	 * 获取公共操作日志列表
	 * @return
	 */
	public Map<String,Object> getCommonOperationList(String type,String whereEx,String sdate,String edate);
	
	
	/**
	 * 查询源日志归档记录
	 * @param sdate
	 * @param edate
	 * @return
	 */
	public List<Map<String,Object>> getSourceLogOperRecord(String sdate,String edate);
	
	/**
	 * 查询日志平台归档记录
	 * @param sdate
	 * @param edate
	 * @return
	 */
	public List<Map<String,Object>> getLocalLogOperRecord(String sdate,String edate);
	
	
	/**
	 * 查询系统任务执行记录
	 * @param sdate
	 * @param edate
	 * @return
	 */
	public List<Map<String,Object>> getTaskLogOperRecord(String sdate,String edate);
}
