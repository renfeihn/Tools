package tc.cama.aweb.ab.service;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.ab.model.AimAbcListCur;
import tc.cama.aweb.ab.model.AimAbsBrinfoCfg;
import tc.cama.aweb.ab.model.AimAbsBrinfoCfgAbcCount;
import tc.cama.aweb.bean.ABEvent;

/**
 * AB应用视图接口
 * @author Win-User
 *
 */
public interface IABManager {

	/**
	 * 查询对象健康度
	 * @param objectId
	 * @return
	 */
	int getObjectHealthy(int objectId);
	
	/**
	 * 根据oid查询单abc列表
	 * @param oid
	 * @return
	 */
	AimAbcListCur getAbcCur(String oid);
	
	/**
	 * 实时登陆终端数量查询
	 * @return
	 */
	int getCountTellerno();
	
	/**
	 * 在线客户端数量查询
	 * @return
	 */
	int getCountAbcIp();
	
	/**
	 * 在线ABS服务器数量查询
	 * @param instStatus
	 * @return
	 */
	int getAbsCountOnline(String instStatus);
	
	/**
	 * ABS服务器数量查询
	 * @return
	 */
	int getAbsCount();
	
	/**
	 * ABS交易次数
	 * @param method
	 * @return
	 */
	int getTradeCount(String method);
	
	/**
	 * ABS通讯次数
	 * @return
	 */
	int getConnCount();
	
	/**
	 * 获取服务器数量
	 * @return
	 */
	int getServerCount();
	
	/**
	 * 机构号列表查询
	 * @return
	 */
	List<AimAbsBrinfoCfg> getBrnoList();
	
	/**
	 * 机构号列表查询，包括子机构号和ABC数量
	 * @return
	 */
	List<AimAbsBrinfoCfgAbcCount> getBrnoCountList(int mobjId);
	
	/**
	 * 获取子机构
	 * @param mid
	 * @return
	 */
	Set<String> getSubMemuIds(String mid);
	
	/**
	 * 指定机构号对应的ABC列表信息查询
	 * @param brnosList
	 * @return
	 */
	List<AimAbcListCur> getAbcListByBrnos(List<String> brnosList);

	/**
	 * abs cpu echarts
	 * @param objId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getCpuEcharts(int[] objId, Date startDate, int interval, TimeUnit unit) throws Exception;

	/**
	 * abs 内存 echarts
	 * @param objId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getMemEcharts(int[] objId, Date startDate, int interval, TimeUnit unit) throws Exception;

	/**
	 * abs 连接数 echarts
	 * @param objId
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getConnectionsEcharts(int[] objId, Date startDate, int interval, TimeUnit unit) throws Exception;

	/**
	 * abs 通讯数 echarts
	 * @param objIds
	 * @param startDate
	 * @param interval
	 * @param unit
	 * @return
	 * @throws Exception 
	 */
	Timeline<Double> getCommEcharts(int[] objIds, Date startDate, int interval, TimeUnit unit) throws Exception;
	
	/**
	 * 获取ABS集群组
	 * @return
	 */
	
	JSONArray getAbsGroups();
	/**
	 * 获取事件信息
	 * @param appId
	 * @return
	 */
	public ABEvent getABEventByAppId(int appId);

}
