package tc.bank.asda.warning.service;

import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.asda.warning.model.AimEventRecordLogComment;

public interface IAimlCfgEventRecordService {
	
	/**
	 * 根据应用和 主机进行统计
	 * @param eventId
	 * @return
	 */
	JSONObject getStatiscs(int eventId);
	/**
	 * 获取事件的趋势图
	 * @param eventId
	 * @return
	 */
	Map<String, Long> getEventTrend(int eventId);
	/**
	 * 获取事件汇总信息
	 * @param user
	 * @return
	 */
	JSONObject getEventSummary(String user);
	/**
	 * 忽略事件
	 * @param eventId
	 * @return
	 */
	boolean ignoreEvent(int eventId);
	/**
	 * 忽略事件
	 * @param eventId
	 * @return
	 */
	boolean ignoreEvent(List<Integer> eventId);
	/**
	 * 转工单
	 * @param eventId
	 * @param user
	 * @return
	 */
	boolean sendEventToItil(int eventId,String dealUser);
	
	/**
	 * 获取事件的处理历史
	 * @param eventId
	 * @return
	 */
	JSONArray getEventDealHis(int eventId);
	/**
	 * 获取事件评论列表
	 * @param eventId
	 * @return
	 */
	List<AimEventRecordLogComment> getEventComment(int eventId);
	
	/**
	 * 添加评论
	 * @return
	 */
	boolean addComment(AimEventRecordLogComment comment);
	
	/**
	 * 删除自己的某条评论
	 * @param id
	 * @param user
	 * @return
	 */
	boolean delComment(long id,String user);
	/**
	 * 获取日志预警的查询条件
	 * @param warnId
	 * @return
	 */
	JSONObject getWarnSearchDetail(long warnId);
	/************************************分割线  预警监控服务****************************************/
	/**
	 * 预警监控汇总信息
	 * @param interval 事件间隔 分钟
	 * @return
	 */
	JSONObject getWarnMonitor(int interval);
	/**
	 * 预警条件的统计结果
	 * @param ids
	 * @return
	 */
	Map<String, Map<String, Long>> getWarnDetail(List<Long> ids);
}
