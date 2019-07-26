package tc.bank.asda.app.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import tc.bank.asda.app.bean.AppStatisticRet;
import tc.bank.asda.app.model.AppStatisticBean;
import tc.bank.asda.es.bean.Param;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * 应用性能统计接口
 * @author parry
 *
 */
public interface IAppStatisticService {
	
	/**
	 * 添加
	 * 
	 * @param bean
	 * @return
	 * @throws SQLException 
	 */
	long add(AppStatisticBean bean);

	/**
	 * 删除
	 * 
	 * @param id
	 * @param userId
	 * @return
	 */
	boolean del(long id, int userId);

	/**
	 * 修改
	 * 
	 * @param bean
	 * @return
	 */
	boolean update(AppStatisticBean bean);

	/**
	 * 根据类型查询
	 * 
	 * @param type
	 * @param userId
	 * @param objName
	 * @return
	 */
	List<AppStatisticRet> getByObjName(int type,int userId, String objName);
	/**
	 * 根据类型统计
	 * @param param
	 * @param type
	 * @return
	 */
	JSONObject statisBasic(int type, Param param);
	/**
	 * 当日交易统计
	 * @param param
	 * @return
	 */
	JSONObject statisDayCount(Param param);
	/**
	 * tips统计
	 * @param param
	 * @return
	 */
	Map<String, Long> statisTips(int type,Param param);
	/**
	 * 指标echars图
	 * @param field
	 * @param param
	 * @return
	 */
	JSONObject statisEchars(String field, Param param);
	
	/**
	 * 指标top接口
	 * @param field
	 * @param orderType
	 * @param top
	 * @param param
	 * @return
	 */
	JSONArray statisTops(String field, String orderType,int top,Param param);

	/**
	 * sql  带聚合解析 用户与应用系统配置，如果存在则更新
	 * @param appId 应用系统id
	 * @param userId 用户id
	 * @param jsonCfg 配置串
	 * @return
	 */
	boolean setDealAnalysisCfg(long appId, long userId, String jsonCfg);
	/**
	 * sql  带聚合解析 用户与应用系统配置的获取
	 * @param appId
	 * @param userId
	 * @return jsonCfg 配置串
	 */
	String getDealAnalysisCfg(long appId, long userId);
}
