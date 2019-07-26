/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support.bean;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 通讯流程实体类
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年10月24日
 */
public class CommSerialBean implements Serializable{
	private static final long serialVersionUID = 33017069368741411L;
	private String MC;
	private String TC;
	private String commLogName;
	private String commBeginTime;
	private String commEndTime;
	private String commHostName;
	private String recTime;
	private String commTimeMs;
	

	public CommSerialBean(String mC, String tC, String commLogName, String commBeginTime, String commEndTime,
			String commHostName, String recTime) {
		super();
		MC = mC;
		TC = tC;
		this.commLogName = commLogName;
		this.commBeginTime = commBeginTime;
		this.commEndTime = commEndTime;
		this.commHostName = commHostName;
		this.recTime = recTime;
	}
	


	public void setCommTimeMs() {
		this.commTimeMs = getCommTime()+"";
	}
	
	private long getCommTime(){
		SimpleDateFormat sourceSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
		long beginTime;
		long endTime;
		try {
			Date begin = sourceSdf.parse(commBeginTime);
			beginTime = begin.getTime();
		} catch (ParseException e) {
			return 0;
		}
		try {
			Date end = sourceSdf.parse(commEndTime);
			endTime = end.getTime();
		} catch (ParseException e) {
			return 0;
		}
		return endTime - beginTime;
		
	}

	public String getRecTime() {
		return recTime;
	}
	public void setRecTime(String recTime) {
		this.recTime = recTime;
	}
	public String getMC() {
		return MC;
	}
	public void setMC(String mC) {
		MC = mC;
	}
	public String getTC() {
		return TC;
	}
	public void setTC(String tC) {
		TC = tC;
	}
	public String getCommLogName() {
		return commLogName;
	}
	public void setCommLogName(String commLogName) {
		this.commLogName = commLogName;
	}
	public String getCommBeginTime() {
		return commBeginTime;
	}
	public void setCommBeginTime(String commBeginTime) {
		this.commBeginTime = commBeginTime;
	}
	public String getCommEndTime() {
		return commEndTime;
	}
	public void setCommEndTime(String commEndTime) {
		this.commEndTime = commEndTime;
	}

	public String getCommHostName() {
		return commHostName;
	}

	public void setCommHostName(String commHostName) {
		this.commHostName = commHostName;
	}

	public String getCommTimeMs() {
		return commTimeMs;
	}
}
