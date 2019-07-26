package tc.bank.asda.logmanagement.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.asda.logmanagement.model.LogOperation;

public interface ILogOperationService {
	
	/***
	 * 新增日志操作记录
	 * @param logOperation type:1.日志搜索菜单查看 2.日志原文分析查看 3.日志文件搜索菜单查看 11.日志搜索菜单下载 文本 12.日志搜索菜单下载doc 13.sql查询日志下载 14.日志文件搜索菜单下载
	 * @return true 保存成功 false 保存失败
	 */
	public boolean add(LogOperation logOperation) throws SQLException;
	
	/**
	 * 日志查看下载统计
	 * @param duration 指标统计频率:1天2周3月4季度5年
	 * @return
	 */
	public JSONObject queryViewDownloadSummary(int duration);
	/**
	 * 近七天日志访问下载记录
	 * @param
	 * @return
	 */
	public JSONObject query7DayViewDownloadSummary();
	
	/***
	 * 条件查询
	 * @param whereEx map类型，map中条件是并的关系，例如查询type是1的操作记录,map.put("type",1); 可以为NULL
	 * @param startTime  startTime和endTime 用做时间范围查询，查询操作时间大于startTime的记录        可以为NULL
	 * @param endTime 查询操作时间小于endTime的记录											     可以为NULL
	 * @return 符合查询条件的操作记录，所有参数为NULL时，返回全部
	 * memo  此处应做分页
	 * @throws Exception
	 */
	public List<LogOperation> search(Map<String,Object> whereEx,Date startTime,Date endTime)throws Exception;
}
