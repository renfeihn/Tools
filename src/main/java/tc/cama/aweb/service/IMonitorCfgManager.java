package tc.cama.aweb.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONArray;

public interface IMonitorCfgManager {
	/**
	 * 查询所有采集配置
	 * @return
	 */
     List<Map<String, Object>> queryAllConfig();
     
 	/**
 	 * 查询所有告警配置
 	 * @return
 	 */
      List<Map<String, Object>>  queryAllAlarmConfig(String meType,String app_id,String mobj_id,String category_name,String category_kind,String executor_id,String username) ;
      /**
       * 
       * @param triggerid
       * @param obj_id
       * @param obj_type
       * @param server_id
       * @param type
       * @param app_id
       * @param alert_name
       * @param alert_sound
       * @param alert_level
       * @param status
       * @param vaild_time_flag
       * @param trigger_list
       * @param alert_message
       * @param recover_message
       * @param resole_advise
     * @return
       * @throws Exc\tion
       */
      int updateMonitorCfg(String  triggerid,String obj_id,String obj_type,String server_id,String type,
    		  int app_id,String alert_name,String alert_sound,String alert_level,String status,
    		  String vaild_time_flag,JSONArray trigger_list,String alert_message,String recover_message,
    		  String resole_advise,String tagkvs,String rids) throws Exception;
      /**
       * 
       * @param triggerid
       * @return
       */
      int deleteMonitorCfg(String  triggerid);
      /**
       * 
       * @param obj_id
       * @param obj_type
       * @param server_id
       * @param type
       * @param app_id
       * @param alert_name
       * @param alert_sound
       * @param alert_level
       * @param status
       * @param vaild_time_flag
       * @param trigger_list
       * @param alert_message
       * @param recover_message
       * @param resole_advise
     * @return
       * @throws Exception
       */
      int addMonitorCfg(String obj_id,String obj_type,String server_id,String type,
    		  int app_id,String alert_name,String alert_sound,String alert_level,String status,
    		  String vaild_time_flag,JSONArray trigger_list,String alert_message,String recover_message,
    		  String resole_advise,String tagkvs,String rids) throws Exception;
      /**
       * 查询所有指标集
       * @return
       */
      List<Map<String,Object>> queryAllMetricKind();
      
      /**
       * 跟据指标集名称查询所有指标项
       * @return
       */
      List<Map<String,Object>> queryAllMetricItem(String metricKind);
      /**
       * 根据指标id查询函数名称
       * @return
       */
      List<Map<String,Object>> queryAllFunName(String mid);
      
      /**
       * 查询所有角色 
       * @return
       */
      List<Map<String,Object>> queryAllRole(String triggerId,String event_type);
      
      /**
       * 查询所有角用户和用户下的角色
       * @return
       */
      
      List<Map<String,Object>> queryAllUserAndRole(String triggerId,String event_type,String gid);
      /**
       * 重置发送对象
       * @param triggerId
       * @param userIds
       * @return
       */
      int reSetAllUser(String triggerId,List<String> userIds);
      /**
       * 查询触发器信息
       * @return
       */
      List<Map<String,Object>> queryTriggerInfo(String gId);
      /**
       * 查询触发器信息
       * @return
       */
      List<Map<String,Object>> queryAlertCfgInfo(String triggerId,String event_type);
      /**
       * 查询触公共指标信息
       * @return
       */
      List<Map<String,Object>> queryPublicItem();
      
      /**
       * 查询触公共指标信息
       * @return
       */
      List<Map<String,Object>> queryPrivateItem(String metricKind);
      
      /**
       * 根据appid查询监控配置数量，策略数量
       * @param appId
       * @return
     * @throws Exception 
       */
      Map<String,Object> queryMonitorInfoByAppId(String appId) throws Exception;
      
     /**
      * 根据触发器id启动或者停止触发器
      * @param triggerIds
      * @param option
      * @return
      */
      int stopOrStartTrigger(List<String> triggerIds,int option);
      /**
       * 根据执行器id查询指标项
       * @return
       */
      List<Map<String,Object>> queryMetricByExeId(String executor_id);
      /**
       * 根据对象id启动和停止监控
       * @param triggerIds
       * @param option
       * @return
       */
      
      int stopOrStartObjMonitor(List<String> objIds,int option);
      /**
       * 查询所有分组
       * @return
       */
      List<Map<String,Object>> queryAllGroup();
	/**
	 * 
	 * @return
	 */
      List<Map<String,Object>> queryAllObjSimpleInfo(String cate1,String cate2,String cate3,String delayTime);
      /**
       * 1cate
       * @return
       */
      
      public List<String> queryAllLevel1();
      /**
       * 2cate
       * @return
       */
      public List<String> queryAllLevel2(String cate1);
      /**
       * 3cate
       * @return
       */
      public List<String> queryAllLevel3(String cate1,String cate2);
      /**
       * triggerId
       * @return
       */
      public int stopOrStartMess(String triggerId,String messStatus);
      /**
       * 
       * @param triggerId
       * @return
     * @throws SQLException 
       */
      public List<Map<String, Object>> queryTriggerFilterObjs(String triggerId) throws SQLException;
      /**
       * 
       * @param triggerId
       * @param fiter
       * @return
       */
      public int addFiterToTrigger(String triggerId,String fiter);
      /**
       * 
       * @param triggerId
       * @return
       */
      public int removeFiterToTrigger(String triggerId);
		/**
		 * 
		 * @param triggerId
		 * @param app_id
		 * @param cate1
		 * @param cate2
		 * @param cate3
		 * @return
		 * @throws Exception 
		 */
	  public List<Map<String, Object>> queryAllObjsByCate(String triggerId, int app_id,
			String cate1, String cate2, String cate3) throws Exception;
	 
}
