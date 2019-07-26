package tc.cama.aweb.bean;

import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;

public class PageAppLogicServers {

	/**
	 * 逻辑服务器
	 */
	private CmdbLogicalServer logicServer;
	
	/**
	 * 逻辑服务器事件数
	 */
	private int eventCounts;
	
	/**
	 * 用户是否关注该应用
	 */
	private boolean attention;
	
	/**
	 * 应用健康度
	 */
	private int healthDegree;
	/**
	 * 关联数据库数
	 */
	private int relationDbCounts;
	/**
	 * 关联操作系统数
	 */
	private int relationOsCounts;
	/**
	 * 关联中间件数
	 */
	private int relationMwCounts;
	/**
	 * 关联应用程序数
	 */
	private int relationAppCounts;

	public CmdbLogicalServer getLogicServer() {
		return logicServer;
	}

	public void setLogicServer(CmdbLogicalServer logicServer) {
		this.logicServer = logicServer;
	}

	public int getEventCounts() {
		return eventCounts;
	}

	public void setEventCounts(int eventCounts) {
		this.eventCounts = eventCounts;
	}

	public boolean isAttention() {
		return attention;
	}

	public void setAttention(boolean attention) {
		this.attention = attention;
	}

	public int getHealthDegree() {
		return healthDegree;
	}

	public void setHealthDegree(int healthDegree) {
		this.healthDegree = healthDegree;
	}

	public int getRelationDbCounts() {
		return relationDbCounts;
	}

	public void setRelationDbCounts(int relationDbCounts) {
		this.relationDbCounts = relationDbCounts;
	}

	public int getRelationOsCounts() {
		return relationOsCounts;
	}

	public void setRelationOsCounts(int relationOsCounts) {
		this.relationOsCounts = relationOsCounts;
	}

	public int getRelationMwCounts() {
		return relationMwCounts;
	}

	public void setRelationMwCounts(int relationMwCounts) {
		this.relationMwCounts = relationMwCounts;
	}

	public int getRelationAppCounts() {
		return relationAppCounts;
	}

	public void setRelationAppCounts(int relationAppCounts) {
		this.relationAppCounts = relationAppCounts;
	}
	
}
