package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.bean.PageWasDetailBaseInfo;

public interface IWasDetail {
	/**
	 * 获取WAS基础信息
	 * @param objId
	 * @return
	 * @throws Exception 
	 */
	public PageWasDetailBaseInfo getBaseInfo(int objId) throws Exception;
	/**
	 * 根据指标获取echarts
	 * @param objId
	 * @param metric
	 * @return
	 */
	public Map<String,Object> getEcharts(int objId,int time,int interval,String[]metric);
	/**
	 * 获取应用信息
	 * @param objId
	 * @return
	 * @throws Exception 
	 * @throws NumberFormatException 
	 */
	public List<Map<String,Object>> getAppinfo(int objId) throws NumberFormatException, Exception;
	/**
	 * 获取进程信息
	 * @param objId
	 * @return
	 */
	public List<Map<String,Object>> getThreadinfo(int objId);
	/**
	 * 获取日志信息
	 * @param objId
	 * @return
	 */
	public List<Map<String,Object>> getLoginfo(int objId);
	/**
	 * 获取端口状态
	 * @param objId
	 * @return
	 */
	public Integer getPortStatus(int objId);
	/**
	 * 获取jvm运行时间
	 * @param objId
	 * @return
	 */
	public String getJvmRunTime(int objId);
	/**
	 * 获取进程总数
	 * @param objId
	 * @return
	 */
	public String getThreadNum(int objId);
}
