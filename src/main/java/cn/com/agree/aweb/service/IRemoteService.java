package cn.com.agree.aweb.service;

import com.aim.alibaba.fastjson.JSONObject;

/**
 * 后台服务调用接口
 * 
 * @author Win7-user
 *
 */
public interface IRemoteService {

	/**
	 * 后台服务调用
	 * 
	 * @param mc
	 *            模块名称
	 * @param tc
	 *            交易名称
	 * @param reqHead
	 *            请求头
	 * @param reqData
	 *            请求数据
	 * @return
	 */
	public JSONObject exchange(String mc, String tc, JSONObject reqHead, JSONObject reqData);

	/**
	 * 后台服务调用
	 * 
	 * @param mc
	 *            模块名称
	 * @param tc
	 *            交易名称
	 * @param reqData
	 *            请求数据
	 * @return
	 */
	public JSONObject exchange(String mc, String tc, JSONObject reqData);

}
