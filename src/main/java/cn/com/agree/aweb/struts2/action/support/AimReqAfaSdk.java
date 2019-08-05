/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support;

import java.util.Set;

import com.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.String2JsonException;
import cn.com.agree.aweb.struts2.action.support.interfaces.IAimReq;

/**
 * 类描述
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年11月10日
 */
public class AimReqAfaSdk implements IAimReq{
	
	private JSONObject req_obj = new JSONObject();
	private JSONObject public_req = new JSONObject();
	private JSONObject private_req = new JSONObject();
	private String MC;
	private String TC;
	/**
	 * afasdk要求传入MC.TC
	 * @param MC
	 * @param TC
	 */
	public AimReqAfaSdk(String MC,String TC){
		this.setMC(MC);
		this.setTC(TC);
	}
	/**
	 * 获得请求参数
	 */
	@Override
	public Object getReqData() {
		this.req_obj.put("public_req", this.public_req);
		this.req_obj.put("private_req", this.private_req);
		
		return this.req_obj;
	}
	
	/**
	 * 单个添加公有参数，键值对传入
	 * @param key
	 * @param value
	 * @return
	 */
	public IAimReq addPublic_req(String key,Object value){
		this.public_req.put(key, value);
		return this;
		
	}
	
	/**
	 * 单个添加私有参数，键值对传入
	 * @param key
	 * @param value
	 * @return
	 */
	public IAimReq addPrivate_req(String key,Object value){
		this.private_req.put(key, value);
		return this;
	}
	
	/**
	 * 批量传入私有参数，传入对象须为json形式的字符串或者json对象
	 * @param private_req
	 * @return
	 * @throws String2JsonException
	 */
	public IAimReq addPrivate_reqMany(Object private_req) throws String2JsonException{
		addManySup(obj2Json(private_req),this.private_req);
	
		return this;
	}
	
	/**
	 * 批量传入公有参数，传入对象须为json形式的字符串或者json对象
	 * @param public_req
	 * @return
	 * @throws String2JsonException
	 */
	public IAimReq addPublic_reqMany(Object public_req) throws String2JsonException{
		addManySup(obj2Json(public_req),this.public_req);
		return this;
	}
	
	/**
	 * 批量传入公有和私有参数，传入对象须为json形式的字符串或者json对象。其中公有部分取public_req为key的部分，私有部分取private_req为key的部分
	 * @param reqParams
	 * @return
	 * @throws String2JsonException
	 */
	public IAimReq addReq_Obj(Object reqParams) throws String2JsonException{
		
		addReq_ObjSup(obj2Json(reqParams));
		
		return this;
	}
	
	/**
	 * 进行对象判断，如果时String转为json，如果是json，保持不变
	 * @param reqParams
	 * @return
	 * @throws String2JsonException
	 */
	private JSONObject obj2Json(Object reqParams) throws String2JsonException{

		if(reqParams instanceof String){
			try {
				JSONObject newReq_obj = JSONObject.parseObject((String)reqParams);
				return newReq_obj;
			} catch (Exception e) {
				throw new String2JsonException("字符串转化json错误");
			}
		}else if(reqParams instanceof JSONObject){
			return (JSONObject) reqParams;
		}
		return null;
	
	}
	
	/**
	 * 批量添加公有或私有参数的支持类
	 * @param newObj
	 * @param oldObj
	 */
	private void addManySup(JSONObject newObj,JSONObject oldObj){
		if(oldObj.isEmpty()){
			oldObj.putAll(newObj);
		}else if(newObj!=null&&!(newObj.isEmpty())){
			Set<String> keys = newObj.keySet();
			for(String key : keys){
				String value = newObj.getString(key);
				oldObj.put(key, value);
			}
		}
	}
	
	/**
	 * 批量添加所有参数的支持类
	 * @param newObj
	 * @throws String2JsonException
	 */
	private void addReq_ObjSup(JSONObject newObj) throws String2JsonException{
		if(!(this.req_obj.isEmpty())){
			this.req_obj = newObj;
		}else if(newObj!=null&&!(newObj.isEmpty())){
			JSONObject newPriObj = newObj.getJSONObject("private_req");
			JSONObject newPubObj = newObj.getJSONObject("public_req");
			if(newPubObj!=null&&!(newPubObj.isEmpty())){
				addPublic_reqMany(newPubObj);
			}
			if(newPriObj!=null&&!(newPriObj.isEmpty())){
				addPrivate_reqMany(newPriObj);
			}
		}
	}
	
	public void clearReqData(){
		this.req_obj = new JSONObject();
		this.public_req = new JSONObject();
		this.private_req = new JSONObject();
	}

	public String getTC() {
		return TC;
	}

	public void setTC(String tC) {
		TC = tC;
	}

	public String getMC() {
		return MC;
	}

	public void setMC(String mC) {
		MC = mC;
	}

}
