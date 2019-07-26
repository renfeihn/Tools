package tc.cama.aweb.bean;

import java.util.Map;

import tc.bank.cama.cmdb.model.table.extention.CmdbDB2;

public class DBConfigInfo {
	/**
	 * db2数据库基础信息
	 */
	private CmdbDB2 db;
	/**
	 * 所屬應用系統
	 */
	private Map<String,Object> app;
	
	/**
	 * 所属服务器
	 */
	private Map<String,Object> server;
	
	/**
	 * 是否监控
	 */
	
	private Boolean iSMon;
	/**
	 * 活动状态
	 */
	
	private Boolean isActive;
	public CmdbDB2 getDb() {
		return db;
	}
	public void setDb(CmdbDB2 db) {
		this.db = db;
	}
	
	public Map<String, Object> getApp() {
		return app;
	}
	public void setApp(Map<String, Object> app) {
		this.app = app;
	}
	public Map<String, Object> getServer() {
		return server;
	}
	public void setServer(Map<String, Object> server) {
		this.server = server;
	}
	
	public Boolean getiSMon() {
		return iSMon;
	}
	public void setiSMon(Boolean iSMon) {
		this.iSMon = iSMon;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
}
