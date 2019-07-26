package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.es.service.IESRelation;
import tc.bank.asda.logtrace.service.LogChainService;

@Controller("LogRelationActionBean")
@Scope("prototype")
public class LogRelationAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2558733253848014272L;

	@Autowired
	private IESRelation esRelation;
	
	/**
	 * 请求CMDB平台参数
	 */
	private String requestBody;
	/**
	 * 获取交易链路信息参数 JSON格式
	 */
	private String params;

	public String getRequestBody() {
		return requestBody;
	}

	public void setRequestBody(String requestBody) {
		this.requestBody = requestBody;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	/**
	 * 查询日志交易链路信息
	 * 
	 * @return
	 */
	public String getLogLinks() {
		try {
			JSONObject param = JSONObject.parseObject(params);
			String appId = param.getString("appId");
			String start = param.getString("start");
			String logsn = param.getString("logsn");
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esRelation.getRelationByLogID(appId, start, logsn)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
}
