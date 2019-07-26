package tc.cama.aweb.ab.service;

import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

import tc.cama.aweb.ab.model.AimAbsStatisConfig;

public interface IAbsInfoManager {

	/**
	 * jvm信息
	 */
	public JSONObject getJvmPercentInfo(Integer mobjId);
	
	
	/**
	 * 单ABS静态数据查询
	 * @param mobjId
	 * @return
	 */
	public AimAbsStatisConfig getSglAbsByMobjId(Integer mobjId);
	
	/**
	 * 全部ABS列表信息查询
	 * @return
	 */
	public List<AimAbsStatisConfig> getAbsList();
	
	/**
	 * 在线ABS服务器数量查询
	 * @param instStatus
	 * @return
	 */
	public int getAbsCountOnline(String instStatus);
	
	/**
	 * ABS服务器数量查询
	 * @return
	 */
	public int getAbsCount();

	/**
	 * 获取Jvm echarts
	 * 
	 * @param mobjId
	 * @return
	 */
	Map<String, List<String>> getJvmEcharts(Integer mobjId);

	/**
	 * 获取当前登录数 echarts
	 * 
	 * @param mobjId
	 * @return
	 */
	Map<String, List<String>> getLoginCountEcharts(Integer mobjId);
	
}
