package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.cama.core.service.metric.MetricConstants.Metric;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AppEventView;
import tc.cama.aweb.bean.DB2BaseInfo;
import tc.cama.aweb.bean.DBConfigInfo;
import tc.cama.aweb.service.IDB2MainPage;

/**
 * oracle信息界面Action
 */
@Controller("DB2MainPageActionBean")
@Scope("prototype")
public class DB2MainPageAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;

	@Autowired
	private IDB2MainPage dbServer;

	private long objId;
	private int time ;
	private int interval;
	
	
	public IDB2MainPage getDbServer() {
		return dbServer;
	}

	public void setDbServer(IDB2MainPage dbServer) {
		this.dbServer = dbServer;
	}


	

	

	public long getObjId() {
		return objId;
	}

	public void setObjId(long objId) {
		this.objId = objId;
	}

	

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	/**
	 * 获取DB2基础信息 事件、运行状态、 基础配置与关联逻辑服务器应用信息
	 * @return
	 * @throws Exception 
	 */
	public String getDB2BaseInfo() throws Exception{
		DB2BaseInfo db2BaseInfo = dbServer.getDB2BaseInfo(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("db2BaseInfo", db2BaseInfo));
		return SUCCESS;
	}
	
	
	/**
	 * 获取db2数据库事件统计
	 * @return
	 * @throws Exception 
	 */
	public String getEventView() throws Exception{
		AppEventView event=dbServer.getEventView(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("event", event));
		return SUCCESS;
		
	}
	
	/**
	 * 获取当前链接数Echarts
	 * @return
	 * @throws Exception
	 */
	public String getCurConsEcharts() throws Exception{
		String []merts = new String[]{Metric.DB_DB2_APPCOUNTS_CURCON.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		
		return SUCCESS;
	}

	/**
	 * 获取并发提交数Echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getSessionCountEcharts() throws Exception {
		String []merts = new String[]{Metric.DB_DB2_COMMIT_ACT.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	
	/**
	 * 当前活动会话数
	 * @return
	 * @throws Exception
	 */
	public String getActiveSessionCountEcharts() throws Exception {
		String []merts = new String[]{Metric.DB_DB2_COMMIT_ACT.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	/**
	 * 获取命中率Echarts
	 * @return
	 */
	public String getHitRatio(){
		String []merts = new String[]{Metric.DB_DB2_PACKAGECACHE.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;	
		}
	
	/**
	 * 获取表异常数Echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getTableExceptionEcharts() throws Exception {
		String []merts = new String[]{Metric.DB_DB2_APP_NUM.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		
		return SUCCESS;
	}
	
	/**
	 * 获取超长执行语句数Echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getLongOpatesEntenceEcharts() throws Exception {
		String []merts = new String[]{Metric.DB_DB2_LONGOPATESENTENCE.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		
		return SUCCESS;
	}
	
	/**
	 * 超长事务数
	 * @return
	 * @throws Exception
	 */
	public String getLargeAppInfoEcharts() throws Exception {
		String []merts = new String[]{Metric.DB_DB2_LARGEAPPINFO.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		
		return SUCCESS;
	}
	
	/**
	 * 死锁数
	 * @return
	 * @throws Exception
	 */
	public String getLockTimeoutEcharts() throws Exception {
		String []merts = new String[]{Metric.DB_DB2_LOCKTIMEOUT_NUM.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		
		return SUCCESS;
	}
	/**
	 * 系统资源
	 * @return
	 * @throws Exception
	 */
	public String getSysResourceEcharts() throws Exception {
		String []merts = new String[]{Metric.DB_DB2_LOCKTIMEOUT_NUM.getName()};
		Timeline<Double> result=dbServer.getEcharts(objId, merts, time, interval, TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	
	
	/**
	 * 获取表空间使用率
	 * @return
	 * @throws Exception
	 */
	public String getTablespaceUsedRate() throws Exception {
		Map<String, List<String>> tableUsedRate =  dbServer.getTableSpaceUsedRate(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("tableUsedRate", tableUsedRate));
		return SUCCESS;
	}
	
	
	/**
	 * 获取健康度
	 * @return
	 * @throws Exception
	 */
	public String getHelRate() throws Exception {
		int hel=dbServer.getHelRate(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("hel", hel));
		return SUCCESS;
	}
	
	public String getDBConfig()throws Exception {
		DBConfigInfo result=dbServer.getDBConfig(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	public String getTest() throws Exception{
		JSONArray result=dbServer.getTableSpaceData(objId, time, interval,TimeUnit.MINUTES);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
		
	}

}
