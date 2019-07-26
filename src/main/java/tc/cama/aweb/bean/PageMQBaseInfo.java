package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

public class PageMQBaseInfo {

	/**
	 * 健康度
	 */
	private int healthyValue = 100;
	
	
	/**
	 * 重点指标
	 */
	//端口状态
	private int portStatus;
	//集群状态
	private int colonyStatus;
	//连接应用数
	private int appConnNum;
	//indoubt通道数
	private int indoubtNum;
	//队列深度过高
	private int queueDepthHighNum;
	
	/**
	 * 基础信息
	 */
	private List<Map<String, Object>> mqBaseInfo;
	
	/**
	 * 事件信息
	 */
		//未关闭事件数
		private Integer unClosedCount;
		//预警数
		private Integer warningCount;
		//告警数
		private Integer alertCount;
		//当日事件总数
		private Integer dayEventCount;
		public int getHealthyValue() {
			return healthyValue;
		}
		public void setHealthyValue(int healthyValue) {
			this.healthyValue = healthyValue;
		}
		public int getPortStatus() {
			return portStatus;
		}
		public void setPortStatus(int portStatus) {
			this.portStatus = portStatus;
		}
		public int getColonyStatus() {
			return colonyStatus;
		}
		public void setColonyStatus(int colonyStatus) {
			this.colonyStatus = colonyStatus;
		}
		public int getAppConnNum() {
			return appConnNum;
		}
		public void setAppConnNum(int appConnNum) {
			this.appConnNum = appConnNum;
		}
		public int getIndoubtNum() {
			return indoubtNum;
		}
		public void setIndoubtNum(int indoubtNum) {
			this.indoubtNum = indoubtNum;
		}
		public int getQueueDepthHighNum() {
			return queueDepthHighNum;
		}
		public void setQueueDepthHighNum(int queueDepthHighNum) {
			this.queueDepthHighNum = queueDepthHighNum;
		}
		public Integer getUnClosedCount() {
			return unClosedCount;
		}
		public void setUnClosedCount(Integer unClosedCount) {
			this.unClosedCount = unClosedCount;
		}
		public Integer getWarningCount() {
			return warningCount;
		}
		public void setWarningCount(Integer warningCount) {
			this.warningCount = warningCount;
		}
		public Integer getAlertCount() {
			return alertCount;
		}
		public void setAlertCount(Integer alertCount) {
			this.alertCount = alertCount;
		}
		public Integer getDayEventCount() {
			return dayEventCount;
		}
		public void setDayEventCount(Integer dayEventCount) {
			this.dayEventCount = dayEventCount;
		}
		public List<Map<String, Object>> getMqBaseInfo() {
			return mqBaseInfo;
		}
		public void setMqBaseInfo(List<Map<String, Object>> mqBaseInfo) {
			this.mqBaseInfo = mqBaseInfo;
		}
		
	
	
	
}
