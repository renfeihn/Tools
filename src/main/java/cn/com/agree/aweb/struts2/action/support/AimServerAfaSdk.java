/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support;

import java.io.IOException;
import java.util.Calendar;
import java.util.concurrent.TimeoutException;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.sdk.CommunitionBySdk;
import cn.com.agree.aweb.struts2.action.support.bean.CommSerialBean;
import cn.com.agree.aweb.struts2.action.support.bean.SerialBean;
import cn.com.agree.aweb.struts2.action.support.interfaces.IAimReq;
import cn.com.agree.aweb.struts2.action.support.interfaces.IAimResp;
import cn.com.agree.aweb.struts2.action.support.interfaces.IAimServer;
import cn.com.agree.logging.Logger;
import cn.com.agree.logging.LoggerFactory;

/**
 * Aim使用afasdk连接平台
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年11月10日
 */
public class AimServerAfaSdk  implements IAimServer{
	private CommunitionBySdk communication ;
	private String username;
	private SerialBean serialBean;
	private static final Logger logger = LoggerFactory.getLogger(AimServerAfaSdk.class);
	public AimServerAfaSdk() {
		
	}
	
	/**
	 * 新版本请求方法，传入AimReqAfaSdk对象
	 * @throws ClassNotFoundException 
	 * @throws AWebException 
	 * @throws DBSupportException 
	 */
	@Override
	public IAimResp request(IAimReq reqObj) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException {
		AimReqAfaSdk req =  (AimReqAfaSdk) reqObj;
		JSONObject reqData = (JSONObject) reqObj.getReqData();
		reqData.getJSONObject("public_req").put("username", this.username);
		reqData.getJSONObject("public_req").put("serialno", this.serialBean.getSerialNo()+"__"+this.serialBean.getCommSerialLen());

		JSONObject resp = communication.asyncRequestToAfa(req.getMC(), req.getTC(),reqData);
		serialHelper(this.serialBean,resp);
		return new AimRespAfaSdk(resp);
	}
	/**
	 * 旧版本兼容方法，需要传入原先的最终请求参数
	 * @throws ClassNotFoundException 
	 * @throws AWebException 
	 * @throws DBSupportException 
	 */
	@Override
	@Deprecated
	public JSONObject request(String MC,String TC,JSONObject reqData) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException{
		JSONObject publicreq = reqData.getJSONObject("public_req");
		if(publicreq==null){
			reqData.put("public_req", new JSONObject());
		}
		reqData.getJSONObject("public_req").put("username", this.username);
		reqData.getJSONObject("public_req").put("serialno", this.serialBean.getSerialNo()+"__"+this.serialBean.getCommSerialLen());
		System.out.println("bbbbbbbbb"+communication);
		JSONObject resp = communication.asyncRequestToAfa(MC, TC,reqData);
		serialHelper(this.serialBean,resp);
		return resp;
	}
	
	@Override
	@Deprecated
	public JSONObject requestT(String MC, String TC, JSONObject reqData, int i) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException{
		JSONObject publicreq = reqData.getJSONObject("public_req");
		if(publicreq==null){
			reqData.put("public_req", new JSONObject());
		}
		reqData.getJSONObject("public_req").put("username", this.username);
		reqData.getJSONObject("public_req").put("serialno", this.serialBean.getSerialNo()+"__"+this.serialBean.getCommSerialLen());
//		JSONObject resp = asyncRequestToAfa(MC, TC,reqData,i);
		JSONObject resp = communication.asyncRequestToAfa(MC, TC,reqData,i);
		
		serialHelper(this.serialBean,resp);
		return resp;
	}
	/**
	 * 自定义超时时间
	 * @param reqObj
	 * @param outTime
	 * @return
	 * @throws IOException
	 * @throws TimeoutException
	 * @throws DBSupportException
	 * @throws AWebException
	 * @throws ClassNotFoundException
	 */
	@Override
	public IAimResp requestTimeOut(IAimReq reqObj, int outTime)
			throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException {
		AimReqAfaSdk req =  (AimReqAfaSdk) reqObj;
		JSONObject reqData = (JSONObject) reqObj.getReqData();
		reqData.getJSONObject("public_req").put("username", this.username);
		reqData.getJSONObject("public_req").put("serialno", this.serialBean.getSerialNo()+"__"+this.serialBean.getCommSerialLen());

//		JSONObject resp = asyncRequestToAfa(req.getMC(), req.getTC(),reqData,outTime);
		JSONObject resp = communication.asyncRequestToAfa(req.getMC(), req.getTC(),reqData,outTime);

		serialHelper(this.serialBean,resp);
		
		return new AimRespAfaSdk(resp);
	}
	
	@Override
	public JSONObject requestConfig(String mc, String tc, JSONObject reqData) throws DBSupportException, AWebException, ClassNotFoundException, IOException, TimeoutException {
		JSONObject reqHead = new JSONObject();
		reqHead.put("sysdate", Calendar.getInstance().getTime());
		long start = System.currentTimeMillis();
		JSONObject req = null;
		JSONObject rsp = null;
		String txt = "成功";
		
		try {
			req = new JSONObject();
			req.put("head", reqHead);
			req.put("data", reqData);
			rsp = communication.asyncRequestToAfa(mc, tc, req);
			return rsp;
		} finally {
			long end = System.currentTimeMillis();
			long time = end - start;
			if (!"成功".equals(txt)) {
				logger.error("调用服务[{}-{}]{}，耗时:{}\n    发送：{}  接收：{}", mc, tc, txt, time, toJsonString(req),
						rsp != null ? toJsonString(rsp.getJSONObject("head")) : null);
				logger.error(getTrace());
			} else {
				if (logger.isInfoEnabled()) {
					logger.info("调用服务[{}-{}]{}，耗时:{}\n    发送：{}  接收：{}", mc, tc, txt, time, toJsonString(req),
							rsp != null ? toJsonString(rsp.getJSONObject("head")) : null);
				}
			}
		}
	}

	private String toJsonString(Object obj) {
		String jsonString = JSON.toJSONString(obj, true);
		if (jsonString != null) {
			jsonString = jsonString.trim();
			jsonString = jsonString.substring(1, jsonString.length() - 1);
		}
		return jsonString;
	}
	
	public String getTrace() {
		Throwable t = new Throwable("这是调试日志");
		StringBuilder buil = new StringBuilder();
		for (StackTraceElement s : t.getStackTrace()) {
			if (s.getClassName().startsWith("cn.com.agree") || s.getClassName().startsWith("tc.")) {
				buil.append("	at ").append(s.toString()).append("\n");
			}
		}
		return buil.toString();
	}
	
	/**
	 * 不需要日志的连接
	 * @throws ClassNotFoundException 
	 * @throws AWebException 
	 * @throws DBSupportException 
	 */
	@Override
	public JSONObject request(String MC, String TC, JSONObject reqData, int i) throws IOException, TimeoutException, DBSupportException, AWebException, ClassNotFoundException {
		JSONObject publicreq = reqData.getJSONObject("public_req");
		if(publicreq==null){
			reqData.put("public_req", new JSONObject());
		}
		reqData.getJSONObject("public_req").put("username", this.username);
		reqData.getJSONObject("public_req").put("serialno", this.serialBean.getSerialNo()+"__"+this.serialBean.getCommSerialLen());
		JSONObject resp = communication.asyncRequestToAfa(MC, TC,reqData);
		return resp;
	}
	/**
	 * 流水信息处理
	 * @param serialBean
	 * @param resp
	 */
	private void serialHelper(SerialBean serialBean,JSONObject resp){
		JSONObject publicresp = resp.getJSONObject("public_rsp");
		CommSerialBean bean = new CommSerialBean(publicresp.getString("MC"), publicresp.getString("TC"), 
				publicresp.getString("log_name"), publicresp.getString("handle_start_time"), publicresp.getString("handle_end_time")
				, publicresp.getString("host_name"),publicresp.getString("rec_request_time"));
		bean.setCommTimeMs();
		serialBean.addCommSerial(bean);
		String title = serialBean.getSerialNoSdf()+"第"+serialBean.getCommSerialLen()+"次通讯  ";
		logger.info(title+spellString("HOST_NAME",bean.getCommHostName())+spellString("MC",bean.getMC())
		+spellString("TC",bean.getTC())+spellString("日志名",bean.getCommLogName()));
		logger.info(title+spellString("请求收到时间",bean.getRecTime())+spellString("处理开始时间",bean.getRecTime())
		+spellString("处理结束时间",bean.getCommEndTime()));
		logger.info(title+spellString("本次通讯耗时",bean.getCommTimeMs()));
	}
	/**
	 * 信息添加帮助
	 * @param key
	 * @param value
	 * @return
	 */
	private String spellString(String key,String value){
		return " ["+key+":"+value+"]";
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public SerialBean getSerialBean() {
		return serialBean;
	}

	public void setSerialBean(SerialBean serialBean) {
		this.serialBean = serialBean;
	}

	
	public CommunitionBySdk getCommunication() {
		return communication;
	}

	public void setCommunication(CommunitionBySdk communication) {
		this.communication = communication;
	}

	@Override
	public void setUsername1(String username) {
		setUsername(username);
	}

	@Override
	public void setSerialBean1(SerialBean serialBean) {
		setSerialBean(serialBean);
	}
	

}
