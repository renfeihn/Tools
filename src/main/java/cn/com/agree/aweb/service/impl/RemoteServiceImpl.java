package cn.com.agree.aweb.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeoutException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.utils.ServiceFailException;
import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.sdk.CommunitionBySdk;
import cn.com.agree.aweb.service.IRemoteService;
import cn.com.agree.aweb.session.HttpSessionContainer;

public class RemoteServiceImpl implements IRemoteService {

	private static Logger LOGGER = LoggerFactory.getLogger(RemoteServiceImpl.class);

	private CommunitionBySdk communication;

	public CommunitionBySdk getCommunication() {
		return communication;
	}

	public void setCommunication(CommunitionBySdk communication) {
		this.communication = communication;
	}

	@Override
	public JSONObject exchange(String mc, String tc, JSONObject reqHead, JSONObject reqData) {
		long start = System.currentTimeMillis();
		JSONObject req = null;
		JSONObject rsp = null;
		String txt = "成功";
		try {
		  RequestAttributes reqAttr = RequestContextHolder.getRequestAttributes();
		  if(reqAttr!=null) {
		    String sseionId = reqAttr.getSessionId();
		    HttpSession session = HttpSessionContainer.getSession(sseionId);
		    if(session!=null) {
		      reqData.put("u", session.getAttribute(Constants.SESSION_USERNAME));
		    }
		  }
		  
			req = new JSONObject();
			req.put("head", reqHead);
			req.put("data", reqData);

			String requestSvruid = reqHead != null ? reqHead.getString("svruid") : "";

			try {
				rsp = communication.asyncRequestToAfa(mc, tc, req);
				JSONObject rspHead = rsp.getJSONObject("head");
				String svruid = rspHead.getString("svruid");
				String errorCode = rspHead.getString("errorCode");

				// trace_id
				RequestAttributes rattri = RequestContextHolder.getRequestAttributes();
				if (rattri instanceof ServletRequestAttributes) {
					ServletRequestAttributes sra = (ServletRequestAttributes) rattri;
					HttpServletRequest hreq = sra.getRequest();
					@SuppressWarnings("unchecked")
					List<Object> uids = (List<Object>) hreq.getAttribute("svruids");
					if (uids == null) {
						uids = new ArrayList<Object>();
						hreq.setAttribute("svruids", uids);
					}
					uids.add(new String[] { requestSvruid, svruid });
				}

				if (!"00".equals(errorCode)) {
					txt = "失败";
					String status = rspHead.getString("errorStatus");
					int errorStatus = NumberUtils.toInt(status);
					String errorMessage = rspHead.getString("errorMessage");
					throw new ServiceFailException(errorStatus, errorCode, "[" + svruid + "]" + errorMessage);
				}
				JSONObject rspData = rsp.getJSONObject("data");
				return rspData;
			} catch (IOException e) {
				txt = "异常";
				throw new ServiceFailException("[" + requestSvruid + "]" + e.getMessage());
			} catch (TimeoutException e) {
				txt = "超时";
				throw new ServiceFailException("[" + requestSvruid + "]" + e.getMessage());
			}
		} finally {
			long end = System.currentTimeMillis();
			long time = end - start;
			if (!"成功".equals(txt)) {
				LOGGER.error("调用服务[{}-{}]{}，耗时:{}\n    发送：{}  接收：{}", mc, tc, txt, time, toJsonString(req),
						rsp != null ? toJsonString(rsp.getJSONObject("head")) : null);
				LOGGER.error(getTrace());
			} else {
				if (LOGGER.isInfoEnabled()) {
					LOGGER.info("调用服务[{}-{}]{}，耗时:{}\n    发送：{}  接收：{}", mc, tc, txt, time, toJsonString(req),
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

	@Override
	public JSONObject exchange(String mc, String tc, JSONObject reqData) {
		JSONObject reqHead = new JSONObject();
		reqHead.put("sysdate", Calendar.getInstance().getTime());
		reqHead.put("svruid", UUID.randomUUID().toString());
		return exchange(mc, tc, reqHead, reqData);
	}

}
