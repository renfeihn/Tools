/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support.interfaces;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.struts2.action.support.bean.SerialBean;

/**
 * aim服务接口
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年11月10日
 */
public interface IAimServer {
	public IAimResp request(IAimReq reqData) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException;
	@Deprecated
	public JSONObject request(String MC, String TC, JSONObject reqData) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException;
	@Deprecated
	public JSONObject request(String MC, String TC, JSONObject reqData, int i) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException;
	@Deprecated
	public JSONObject requestT(String MC, String TC, JSONObject reqData, int i) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException;
	public IAimResp requestTimeOut(IAimReq reqObj, int outTime) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException;
	public JSONObject requestConfig(String appType, String target, JSONObject params) throws DBSupportException, AWebException, ClassNotFoundException, IOException, TimeoutException;
	public void setUsername1(String username) ;
	public void setSerialBean1(SerialBean serialBean) ;
}
