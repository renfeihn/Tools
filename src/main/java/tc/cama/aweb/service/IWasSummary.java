package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.bean.PageWasSumBaseInfo;

public interface IWasSummary {

	/**
	 * 获取WAS汇总基础信息
	 */
	public PageWasSumBaseInfo getWasBaseInfo();
	/**
	 * 获取WAS列表
	 */
	public List<Map<String,Object>> getWasList();
	/**
	 * 获取事件信息与echarts
	 */
	public Map<String, Object> getEventInfo(int time,int interval);
}
