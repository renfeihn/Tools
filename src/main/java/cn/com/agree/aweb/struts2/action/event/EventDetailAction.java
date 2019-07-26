package cn.com.agree.aweb.struts2.action.event;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.cama.core.bean.EventBo;
import tc.bank.cama.core.bean.EventDealBo;
import tc.bank.cama.core.bean.MetricVO;
import tc.bank.cama.core.service.alert.EventConstants.SimilarEvent;
import tc.bank.common.core.Page;
import tc.bank.common.core.Timeline;
import tc.bank.common.date.DateUtils;
import tc.cama.aweb.bean.LogicIp;
import tc.cama.aweb.service.IEventDetail;

/**
 * 事件详情 action
 * 
 * @author zhangkun
 *
 */
@Controller("EventDetailBean")
@Scope("prototype")
public class EventDetailAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -144194308559871730L;
	@Autowired
	private IEventDetail eventDetail;
	private int eventId;
	private int page;
	private int size;
	private SimilarEvent similar;
	private long seconds;
	private int objectId;
	private Date startDate;
	private Date endDate;
	private long interval;
	private String metricName;

	private Long objId;
	
	public IEventDetail getEventDetail() {
		return eventDetail;
	}

	public void setEventDetail(IEventDetail eventDetail) {
		this.eventDetail = eventDetail;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public SimilarEvent getSimilar() {
		return similar;
	}

	public void setSimilar(SimilarEvent similar) {
		this.similar = similar;
	}

	public long getSeconds() {
		return seconds;
	}

	public void setSeconds(long seconds) {
		this.seconds = seconds;
	}

	public int getObjectId() {
		return objectId;
	}

	public void setObjectId(Integer objectId) {
		if(objectId!=null){
			this.objectId = objectId;
		}
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public long getInterval() {
		return interval;
	}

	public void setInterval(long interval) {
		this.interval = interval;
	}

	public String getMetricName() {
		return metricName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public Long getObjId() {
		return objId;
	}

	public void setObjId(Long objId) {
		this.objId = objId;
	}

	/**
	 * 获取事件详情
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getEventDetailsByEventId() throws Exception {
		EventBo eventInfoDsp = eventDetail.getEventById(eventId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventInfoDsp", eventInfoDsp));
		return SUCCESS;
	}

	public String getEventDetailsByEventIdAndEventType() throws Exception {
		EventBo eventInfoDsp = eventDetail.getEventByIdAndEventType(eventId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventInfoDsp", eventInfoDsp));
		return SUCCESS;
	}
	
	public String getEventDealsById() throws Exception {
		List<EventDealBo> eventDeals = eventDetail.getEventDealsById(eventId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventInfoDsp", eventDeals));
		return SUCCESS;
	}

	public String getSimilarEvents() {
		Page<EventBo> pageInfo = eventDetail.getSimilarEvents(similar, seconds, eventId, page, size);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("pageInfo", pageInfo));
		return SUCCESS;
	}

	public String metricTimeline() {
		Timeline<Double> timeline = eventDetail.metricTimeline(objectId, metricName, startDate, endDate, interval,
				TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), timeline));
		return SUCCESS;
	}

	public String getMetrics() {
		Map<String, String> metrics = eventDetail.getMetricName(objectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("metrics", metrics));
		return SUCCESS;
	}

	public String getApplications() {
		Map<Integer, String> application = eventDetail.getApplications();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("application", application));
		return SUCCESS;
	}

	public String getEventMetrics() {
		List<MetricVO> eventMetric = eventDetail.eventMetric(eventId);
		JSONArray ja = ConvertUtils.convert(eventMetric, JSONArray.class);
		if(ja!=null){
			for(int i=0;i<ja.size();i++){
				JSONObject jo = ja.getJSONObject(i);
				jo.put("time", DateUtils.format(eventMetric.get(i).getTime(), "HH:mm"));
			}
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventMetric", ja));
		return SUCCESS;
	}

	public String getSimilarType() {
		List<String> similarType = eventDetail.getSimilarType();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("similarType", similarType));
		return SUCCESS;
	}

	public String eventMetricTimeline(){
		 Timeline<Double> echartsData= eventDetail.eventMetricTimeline(eventId, objectId, metricName);
		 setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(),echartsData ));
	     return SUCCESS;
	}
	
	public String getIps() throws Exception{
		List<LogicIp> ips= eventDetail.getIps(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("ips", ips==null?new ArrayList<String>():ips));
	    return SUCCESS;
	}
	
	public String getEventSeries() throws Exception {
		List<EventBo> events = eventDetail.getEventSeries(eventId, interval, null);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("events", events));
		return SUCCESS;
	}
}
