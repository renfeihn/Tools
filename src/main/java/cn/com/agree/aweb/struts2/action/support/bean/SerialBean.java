/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support.bean;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * 交易流水实体类
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年10月21日
 */
public class SerialBean implements Serializable{
	private static final long serialVersionUID = -4580549329736033416L;
	private String serialNo;
	private long actionBeginTime;
	private long actionEndTime;
	private String actionPath;
	private String actionURI;
	private String reqIP;
	private String webHostName;
	private List<CommSerialBean> commSerial = new ArrayList<CommSerialBean>();
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	public String getCommSerialLen(){
		return this.commSerial.size()+"";
	}
	
	public void addCommSerial(CommSerialBean bean){
		this.commSerial.add(bean);
	}
	
	public String getActionBeginTimeSdf(){
		long actionBeginTime = this.actionBeginTime;
		return sdf.format(new Date(actionBeginTime));
	}
	
	public String getActionEndTimeSdf(){
		long actionEndTime = this.actionEndTime;
		return sdf.format(new Date(actionEndTime));
	}
	
	public String getSerialNoSdf(){
		return "<"+this.serialNo+">  ";
	}
	
	public void setSerialNo(){
		String serial = UUID.randomUUID().toString().replace("_", "").substring(0, 8);
		this.serialNo = this.reqIP+"__"+getActionBeginTimeSdf()+"__"+this.webHostName+"__"+serial;
	}
	
	public String getSerialNo() {
		return serialNo;
	}
	public void setSerialNo(String flowNo) {
		this.serialNo = flowNo;
	}
	public long getActionBeginTime() {
		return actionBeginTime;
	}
	public void setActionBeginTime(long actionBeginTime) {
		this.actionBeginTime = actionBeginTime;
	}
	public long getActionEndTime() {
		return actionEndTime;
	}
	public void setActionEndTime(long actionEndTime) {
		this.actionEndTime = actionEndTime;
	}
	public String getActionPath() {
		return actionPath;
	}
	public void setActionPath(String actionPath) {
		this.actionPath = actionPath;
	}
	public String getActionURI() {
		return actionURI;
	}
	public void setActionURI(String actionURI) {
		this.actionURI = actionURI;
	}
	public String getReqIP() {
		return reqIP;
	}
	public void setReqIP(String reqIP) {
		this.reqIP = reqIP;
	}
	public String getWebHostName() {
		return webHostName;
	}

	public void setWebHostName(String webHostName) {
		this.webHostName = webHostName;
	}

	public List<CommSerialBean> getCommSerial() {
		return commSerial;
	}

	public void setCommSerial(List<CommSerialBean> commSerial) {
		this.commSerial = commSerial;
	}
}
