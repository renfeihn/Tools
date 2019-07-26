package cn.com.agree.aweb.util;

import java.util.Set;

import cn.com.agree.aweb.struts2.action.support.AimRespAfaSdk;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * @Description SDK结果数据处理工具类
 * @Title TransSdkData2Json.java
 * @author chenweikang
 * @time 下午7:22:28 2016年6月6日
 * @email kvikon@gmail.com
 * @version 1.0
 */
public class SdkDataUtil {
	/**
	 * @author chenweikang
	 * 将SDK返回的结果转换为JSONArray
	 * @param sdkData SDK返回的结果
	 * @return 对应数据对象集合
	 */
	public static JSONArray transSdkData(JSONObject sdkData){
		JSONArray results = new JSONArray();
		if(sdkData!=null && !sdkData.isEmpty()){
			/** 1. 获取private_rsp段的数据 */
			JSONObject privateRsp = (JSONObject) sdkData.get("private_rsp");
			if(privateRsp!=null && !privateRsp.isEmpty()){
			/** 2. 获取所有key */
			Set<String> keys = privateRsp.keySet();
			/** 3. 根据key集合，遍历JSON对象，并转换成JSONArray */
			int valueLength = privateRsp.getJSONArray((String) keys.toArray()[0]).size();
			if(valueLength > 0){
				for(int x=0; x<valueLength; x++){
					JSONObject obj = new JSONObject();
					for(String key : keys){
						Object value = privateRsp.getJSONArray(key).get(x);
						obj.put(key, value);
					}
					results.add(obj);
				}
				return results;
			}
		}
	}
	return null;
}
	/**
	 * @author zhouyuehui
	 * 将SDK返回的结果转换为JSONArray
	 * @param sdkData SDK返回的结果
	 * @return 对应数据对象集合
	 */
	public static JSONArray transNewSdkData(AimRespAfaSdk sdkData){
		JSONArray results = new JSONArray();
		JSONObject jsonObject = sdkData.getPrivate();
		if(jsonObject!=null && !jsonObject.isEmpty()){
			/** 2. 获取所有key */
			Set<String> keys = jsonObject.keySet();
			/** 3. 根据key集合，遍历JSON对象，并转换成JSONArray */
			int valueLength = jsonObject.getJSONArray((String) keys.toArray()[0]).size();
			if(valueLength > 0){
				for(int x=0; x<valueLength; x++){
					JSONObject obj = new JSONObject();
					for(String key : keys){
						Object value = jsonObject.getJSONArray(key).get(x);
						obj.put(key, value);
					}
					results.add(obj);
				}
				return results;
			}
	}
	return null;
}
	
	/**
	 * @author chenweikang
	 * 将SDK返回的结果转换为JSONArray，并且所有value值均为String类型
	 * @param sdkData SDK返回的结果
	 * @return 对应数据对象集合
	 */
	public static JSONArray transSdkDataToString(JSONObject sdkData){
		JSONArray results = new JSONArray();
		if(sdkData!=null && !sdkData.isEmpty()){
			/** 1. 获取private_rsp段的数据 */
			JSONObject privateRsp = (JSONObject) sdkData.get("private_rsp");
			if(privateRsp!=null && !privateRsp.isEmpty()){
				/** 2. 获取所有key */
				Set<String> keys = privateRsp.keySet();
				/** 3. 根据key集合，遍历JSON对象，并转换成JSONArray */
				int valueLength = privateRsp.getJSONArray((String) keys.toArray()[0]).size();
				if(valueLength > 0){
					for(int x=0; x<valueLength; x++){
						JSONObject obj = new JSONObject();
						for(String key : keys){
							Object value = privateRsp.getJSONArray(key).get(x);
							obj.put(key, value.toString());
						}
						results.add(obj);
					}
					return results;
				}
			}
		}
		return null;
	}
	
	/**
	 * @author liyuansheng
	 * @param config 配置一维字符数组，为要取的字符串
	 * @param data	  要处理的json对象
	 * @return
	 */
	public static String[][] getTableData(String[] config,JSONObject data){
		
		if(config!=null&&data!=null){
			
			JSONArray jsonArray = data.getJSONArray(config[0]);
			
			if(jsonArray!=null&&jsonArray.size()!=0){
				
				int tempLen = jsonArray.size();
				String[][] returnv=new String[tempLen][config.length];
				
				for(int i=0;i<tempLen;i++){
					
					for(int j=0;j<config.length;j++){
						
						returnv[i][j]=data.getJSONArray(config[j]).getString(i);
						
					}
				}
				
				return returnv;
			}else{
				throw new RuntimeException("配置字段错误，请配置存在的字段"); 
			}
		}else{
			throw new RuntimeException("请传入配置和数据");
		}
	}
	
	/** 对放入的json数据进行判断，非空则放入json中 否则不放入
	 * @author zhouyuehui
	 * @return
	 */
	public static JSONObject putData(String key,String value,JSONObject private_req_map){
		if(value!=null&&!"".equals(value)){
			private_req_map.put(key, value);
			return private_req_map;
		}else{
			return private_req_map;
		}
	}
}
