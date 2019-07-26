package tc.cama.aweb.bean;

import java.util.List;

import tc.bank.cama.core.bean.MetricVO;

public class DB2BaseInfo {
	/**
	 * 事件统计
	 */
	private AppEventView appEventView;
	/**
	 * 基础配置信息
	 */
	private DBConfigInfo dbConfigInfo;
	/**
	 * 健康度
	 */
	private int HelRate;
	/**
	 * DB2运行状态
	 */
	private List<MetricVO> db2RunStatus;
	public AppEventView getAppEventView() {
		return appEventView;
	}
	public void setAppEventView(AppEventView appEventView) {
		this.appEventView = appEventView;
	}
	public DBConfigInfo getDbConfigInfo() {
		return dbConfigInfo;
	}
	public void setDbConfigInfo(DBConfigInfo dbConfigInfo) {
		this.dbConfigInfo = dbConfigInfo;
	}
	public int getHelRate() {
		return HelRate;
	}
	public void setHelRate(int helRate) {
		HelRate = helRate;
	}
	public List<MetricVO> getDb2RunStatus() {
		return db2RunStatus;
	}
	public void setDb2RunStatus(List<MetricVO> db2RunStatus) {
		this.db2RunStatus = db2RunStatus;
	}
	
	
}
