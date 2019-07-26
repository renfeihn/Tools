package cn.com.agree.aweb.struts2.action.asda;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.warning.model.AimEventRecordLogComment;
import tc.bank.asda.warning.model.AimlCfgLogEventModel;
import tc.bank.asda.warning.model.AimlCfgLogWarning;
import tc.bank.asda.warning.service.IAimlCfgEventRecordService;
import tc.bank.asda.warning.service.IAimlCfgLogWarningService;
import tc.cama.aweb.model.AwebUser;

@Controller("LogWarningActionBean")
@Scope("prototype")
public class LogWarningAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -183576719340611487L;

	@Autowired
	private IAimlCfgLogWarningService logWarningService;
	
	@Autowired
	private IAimlCfgEventRecordService eventRecordService;
	
	private String warning;
	
	private long id;
	
	private int eventId;
	
	private String eventIds;
	
	private String eventModel;
	
	private String comment;
	
	private int interval;
	
	/**
	 * 多个主键
	 */
	private List<Long> ids;

	public String getWarning() {
		return warning;
	}

	public void setWarning(String warning) {
		this.warning = warning;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getEventModel() {
		return eventModel;
	}

	public void setEventModel(String eventModel) {
		this.eventModel = eventModel;
	}

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}
	
	public String getEventIds() {
		return eventIds;
	}
	
	public void setEventIds(String eventIds) {
		this.eventIds = eventIds;
	}
	
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public List<Long> getIds() {
		return ids;
	}

	public void setIds(List<Long> ids) {
		this.ids = ids;
	}

	/**
	 * 获取所有的预警
	 * @return
	 */
	public String getAllWarning() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("用户过期！"));
				return ERROR;
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.getAllWarning(userVO.getId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 删除预警
	 * @return
	 */
	public String delWarningById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.delWarningById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 添加预警
	 * @return
	 */
	public String addWarning() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("用户过期！"));
				return ERROR;
			}
			JSONObject json = JSONObject.parseObject(warning);
			AimlCfgLogWarning warn = new AimlCfgLogWarning();
			warn.setUserId(userVO.getId());
			warn.setName(json.getString("name"));
			warn.setSearch(StringEscapeUtils.unescapeHtml4(json.getString("search")));
			warn.setIsOpen(json.getIntValue("isOpen"));
			warn.setMustValue(json.getString("mustValue"));
			warn.setPlanType(json.getIntValue("planType"));
			warn.setScheduleType(json.getIntValue("scheduleType"));
			warn.setIntervalTime(json.getString("intervalTime"));
			warn.setCompare(json.getString("compare"));
			warn.setResult(json.getIntValue("result"));
			warn.setConditions(json.getIntValue("conditions"));
			warn.setWarnType(json.getIntValue("warnType"));
			warn.setCustomize(json.getString("customize"));
			warn.setLevel(json.getIntValue("level"));
			warn.setEventModel(json.getString("eventModel"));
			warn.setTimeInterval(json.getIntValue("timeInterval"));
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.addWarning(warn)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 修改预警
	 * @return
	 */
	public String updateWarning() {
		try {
			JSONObject json = JSONObject.parseObject(warning);
			AimlCfgLogWarning warn = new AimlCfgLogWarning();
			warn.setId(json.getLongValue("id"));
			warn.setName(json.getString("name"));
			warn.setSearch(StringEscapeUtils.unescapeHtml4(json.getString("search")));
			warn.setIsOpen(json.getIntValue("isOpen"));
			warn.setMustValue(json.getString("mustValue"));
			warn.setPlanType(json.getIntValue("planType"));
			warn.setScheduleType(json.getIntValue("scheduleType"));
			warn.setIntervalTime(json.getString("intervalTime"));
			warn.setCompare(json.getString("compare"));
			warn.setResult(json.getIntValue("result"));
			warn.setConditions(json.getIntValue("conditions"));
			warn.setWarnType(json.getIntValue("warnType"));
			warn.setCustomize(json.getString("customize"));
			warn.setLevel(json.getIntValue("level"));
			warn.setEventModel(json.getString("eventModel"));
			warn.setTimeInterval(json.getIntValue("timeInterval"));
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.updateWarning(warn)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取所有的事件详情模板
	 * @return
	 */
	public String getAllEventModel() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.getAllEventModel()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 删除事件详情模板
	 * @return
	 */
	public String delEveneModel() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.delEventModel(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 修改事件详情模板
	 * @return
	 */
	public String updateEventModel() {
		try {
			JSONObject json = JSONObject.parseObject(eventModel);
			AimlCfgLogEventModel model = new AimlCfgLogEventModel();
			model.setContent(json.getString("content"));
			model.setName(json.getString("name"));
			model.setId(json.getLongValue("id"));
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.updateEventModel(model)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 添加事件详情模板
	 * @return
	 */
	public String addEventModel() {
		try {
			JSONObject json = JSONObject.parseObject(eventModel);
			AimlCfgLogEventModel model = new AimlCfgLogEventModel();
			model.setContent(json.getString("content"));
			model.setName(json.getString("name"));
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logWarningService.addEventModel(model)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取事件的趋势图
	 * @return
	 */
	public String getEventTrend() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getEventTrend(eventId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 根据应用和 主机进行统计
	 * @return
	 */
	public String getStatiscs() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getStatiscs(eventId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取事件汇总信息
	 * @return
	 */
	public String getEventSummary() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getEventSummary(this.getUserName())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 忽略事件
	 * @return
	 */
	public String ignoreEvent() {
		try {
			List<Integer> eventIdList = JSON.parseArray(eventIds, Integer.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.ignoreEvent(eventIdList)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 转工单
	 * @return
	 */
	public String sendEventToItil() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.sendEventToItil(eventId, this.getUserName())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取事件的处理历史
	 * @return
	 */
	public String getEventDealHis() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getEventDealHis(eventId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取事件评论列表
	 * @return
	 */
	public String getEventComment() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getEventComment(eventId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 添加评论
	 * @return
	 */
	public String addComment() {
		try {
			AimEventRecordLogComment comment = new AimEventRecordLogComment();
			comment.setCreateTime(new Date());
			comment.setUser(this.getUserName());
			comment.setComment(this.comment);
			comment.setEventId(this.eventId);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.addComment(comment)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取事件的处理历史
	 * @return
	 */
	public String delComment() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.delComment(id, this.getUserName())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取日志预警的查询条件
	 * @return
	 */
	public String getWarnSearchDetail() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getWarnSearchDetail(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 预警监控汇总信息
	 * @return
	 */
	public String getWarnMonitor() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getWarnMonitor(interval)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 预警条件的统计结果
	 * @return
	 */
	public String getWarnDetail() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", eventRecordService.getWarnDetail(ids)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
