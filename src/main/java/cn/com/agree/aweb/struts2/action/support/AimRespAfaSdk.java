/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support;

import com.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.interfaces.IAimResp;

/**
 * afasdk响应信息数据类
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年11月10日
 */
public class AimRespAfaSdk implements IAimResp{
	
	private JSONObject respData;
	/**
	 * 构造方法，把afasdk响应的JsonObject放入成员变量中
	 * @param respData
	 */
	public AimRespAfaSdk(JSONObject respData){
		this.respData = respData;
	}
	/**
	 * 响应是否成功判断
	 */
	@Override
	public boolean isSuccess() {
		String errorcode = getPublic().getString("errorcode");
		if(errorcode!=null&&errorcode.equals("000000")){
			return true;
		}
		return false;
	}
	/**
	 * 获取记录条数
	 */
	@Override
	public int getRownum() {
		return getPublic().getIntValue("totalrownum");
	}
	/**
	 * 获取公有响应数据
	 * @return
	 */
	public JSONObject getPublic(){
		return this.respData.getJSONObject("public_rsp");
	}
	/**
	 * 获取私有响应数据
	 * @return
	 */
	public JSONObject getPrivate(){
		return this.respData.getJSONObject("private_rsp");
	}

	public JSONObject getRespData() {
		return respData;
	}

	public void setRespData(JSONObject respData) {
		this.respData = respData;
	}

}
