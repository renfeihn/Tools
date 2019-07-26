package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.PageOracleBase;
import tc.cama.aweb.service.IAppOracle;

/**
 * oracle信息界面Action
 */
@Controller("AppOracleActionBean")
@Scope("prototype")
public class AppOracleAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;

	@Autowired
	private IAppOracle appOracle;

	private long objectId;
	private int time ;
	private int interval;
	
	public IAppOracle getAppOracle() {
		return appOracle;
	}

	public void setAppOracle(IAppOracle appOracle) {
		this.appOracle = appOracle;
	}
	
	public long getObjectId() {
		return objectId;
	}

	public void setObjectId(long objectId) {
		this.objectId = objectId;
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
	 * 获取oracle数据库健康度
	 * @return
	 * @throws Exception 
	 */
	public String getOracleBaseInfo() throws Exception{
		PageOracleBase oracleBase = appOracle.getOracleBase(objectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("oracleBase", oracleBase));
		return SUCCESS;
		
	}

	/**
	 * 获取关键使用率监控--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getImportUsedEcharts() throws Exception {
		Timeline<Double> result = appOracle.getImportUsedEcharts(objectId, time ,interval,TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	
	/**
	 * 获取超长语句--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getLongStatementEcharts() throws Exception {
		Timeline<Double> result = appOracle.getLongStatementEcharts(objectId, time ,interval,TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	

	/**
	 * 获取超长事务--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getLongWorkEcharts() throws Exception {
		Timeline<Double> result = appOracle.getLongStatementEcharts(objectId, time ,interval,TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	

	/**
	 * 获取死锁--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getDeadlockEcharts() throws Exception {
		Timeline<Double> result = appOracle.getDeadlockEcharts(objectId, time ,interval,TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	
	/**
	 * 获取当前活动数--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAliveSessionEcharts() throws Exception {
		Timeline<Double> result = appOracle.getAliveSessionEcharts(objectId, time ,interval,TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	
	/**
	 * 获取当前连接数--echarts
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getSysResourcesEcharts() throws Exception {
		Timeline<Double> result = appOracle.getSysResourcesEcharts(objectId, time ,interval,TimeUnit.MINUTES);
		setStrutsMessage(EchartsUtils.setEchartsData(StrutsMessage.successMessage(), result));
		return SUCCESS;
	}
	
	/**
	 * 获取表空间信息
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getTableSpaceEcharts() throws Exception {
		
		Map<String,List<String>> echartsData = appOracle.getTableSpaceEcharts(objectId);
	
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", echartsData));
	
		return SUCCESS;
	}
	
	
	
}
