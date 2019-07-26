package cn.com.agree.aweb.struts2.action.report;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.service.impl.RemoteServiceImpl;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

/*
 * 报表action
 */
@Controller("ReportActionBean")
@Scope("prototype")
public class ReportAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4812756257371956797L;
	@Autowired
	RemoteServiceImpl remoteService;
	private String reportName;
	private String columnsName;
	private String columnsLink;



	public String getColumnsName() {
		return columnsName;
	}



	public void setColumnsName(String columnsName) {
		this.columnsName = columnsName;
	}



	public RemoteServiceImpl getRemoteService() {
		return remoteService;
	}



	public void setRemoteService(RemoteServiceImpl remoteService) {
		this.remoteService = remoteService;
	}



	public String getReportName() {
		return reportName;
	}



	public void setReportName(String reportName) {
		this.reportName = reportName;
	}




	public String getColumnsLink() {
		return columnsLink;
	}



	public void setColumnsLink(String columnsLink) {
		this.columnsLink = columnsLink;
	}

	
	
	public String getReport()throws Exception{
		JSONObject reqData = new JSONObject();
		reqData.put("title", reportName);
		reqData.put("columnName", JSONArray.parse(columnsName));
		reqData.put("sql", columnsLink);
		JSONObject data = remoteService.exchange("report", "R011", reqData);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("base64String",data.get("base64String")));
		return SUCCESS;
	}
}
