package tc.cama.aweb.bean;

import java.util.List;

public class MQBaseInfo {
	//实例状态统计
	private int instanceCount;
	//非健康实例
	private int unHealthInstances;
	//健康实例
	private int healthInstances;
	//关键KPI汇总信息
	private KeyKPI keyKPI;
    //事件总览
	private EventView eventView;
	//队列管理器列表
	private List<QueryManager> queryManagerList;
	
	public List<QueryManager> getQueryManagerList() {
		return queryManagerList;
	}
	public void setQueryManagerList(List<QueryManager> queryManagerList) {
		this.queryManagerList = queryManagerList;
	}
	public int getInstanceCount() {
		return instanceCount;
	}
	public void setInstanceCount(int instanceCount) {
		this.instanceCount = instanceCount;
	}
	public int getUnHealthInstances() {
		return unHealthInstances;
	}
	public void setUnHealthInstances(int unHealthInstances) {
		this.unHealthInstances = unHealthInstances;
	}
	public int getHealthInstances() {
		return healthInstances;
	}
	public void setHealthInstances(int healthInstances) {
		this.healthInstances = healthInstances;
	}
	public KeyKPI getKeyKPI() {
		return keyKPI;
	}
	public void setKeyKPI(KeyKPI keyKPI) {
		this.keyKPI = keyKPI;
	}
	public EventView getEventView() {
		return eventView;
	}
	public void setEventView(EventView eventView) {
		this.eventView = eventView;
	}
	
	
	
}
