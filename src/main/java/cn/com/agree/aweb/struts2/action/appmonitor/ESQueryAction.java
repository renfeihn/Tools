package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.lang.StringUtils;
import tc.bank.common.utils.TimelineUtils;
import tc.cama.aweb.service.IESHttpService;

@Controller("ESQueryActionBean")
@Scope("prototype")
public class ESQueryAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4230493649782573967L;
	@Autowired
	private IESHttpService esHttpService;
	private String startDate;
	private String endDate;
	private String date;
	private String serialno;
	private String app;
	private String textArray;
	
	
	public IESHttpService getEsHttpService() {
		return esHttpService;
	}

	public String getStartDate() {
		return startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public String getDate() {
		return date;
	}

	public String getSerialno() {
		return serialno;
	}

	public String getApp() {
		return app;
	}

	public String getTextArray() {
		return textArray;
	}

	public void setEsHttpService(IESHttpService esHttpService) {
		this.esHttpService = esHttpService;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setSerialno(String serialno) {
		this.serialno = serialno;
	}

	public void setApp(String app) {
		this.app = app;
	}

	public void setTextArray(String textArray) {
		this.textArray = textArray;
	}

	public String fuzzyQueryAppLog() throws Exception{
//		if(textArray==null ||"".equals(textArray)){
//			setStrutsMessage(StrutsMessage.errorMessage("模糊搜索时搜索字段不能为空!"));
//			return ERROR;
//		}
		if((startDate==null ||"".equals(startDate)) && (endDate==null ||"".equals(endDate))){
			setStrutsMessage(StrutsMessage.errorMessage("模糊搜索时开始日期和截止日期不能同时为空!"));
			return ERROR;
		}
//		if(app==null ||"".equals(app)){
//			setStrutsMessage(StrutsMessage.errorMessage("模糊搜索时系统类型不能为空!"));
//			return ERROR;
//		}
		JSONObject ret = esHttpService.fuzzyQueryAppLog(startDate, endDate, app, StringUtils.split(textArray,","));
		if(ret==null){
			setStrutsMessage(StrutsMessage.errorMessage("模糊搜索时搜索结果为空!"));
			return ERROR;
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("loglist",ret));
		return SUCCESS;
	}
	
	public String fuzzyQueryTransRecord() throws Exception{
		if(textArray==null ||"".equals(textArray)){
			setStrutsMessage(StrutsMessage.errorMessage("模糊搜索时搜索字段不能为空!"));
			return ERROR;
		}
		if((startDate==null ||"".equals(startDate)) && (endDate==null ||"".equals(endDate))){
			setStrutsMessage(StrutsMessage.errorMessage("模糊搜索时开始日期和截止日期不能同时为空!"));
			return ERROR;
		}
		JSONObject ret = esHttpService.fuzzyQueryTransRecord(startDate, endDate, app, StringUtils.split(textArray,","));
		if(ret==null){
			setStrutsMessage(StrutsMessage.errorMessage("模糊搜索时搜索结果为空!"));
			return ERROR;
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("translist",ret));
		return SUCCESS;
	}
	
	public String queryLogBySerialno() throws Exception{
		if(date==null ||"".equals(date)){
			setStrutsMessage(StrutsMessage.errorMessage("查找交易日志时日期不能为空!"));
			return ERROR;
		}
		if(app==null ||"".equals(app)){
			setStrutsMessage(StrutsMessage.errorMessage("查找交易日志时系统类型不能为空!"));
			return ERROR;
		}
		if(serialno==null ||"".equals(serialno)){
			setStrutsMessage(StrutsMessage.errorMessage("查找交易日志时交易流水号不能为空!"));
			return ERROR;
		}
		try {
			if(serialno.startsWith(app)){
				serialno = serialno.substring(10).substring(date.length());
			}
			JSONObject ret = esHttpService.queryLogBySerialno(date,app,serialno);
			if(ret==null){
				setStrutsMessage(StrutsMessage.errorMessage("查找交易日志结果为空!"));
				return ERROR;
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter(TimelineUtils.ECHARTS_DATA,getLogInfo(ret)));
			return SUCCESS;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			setStrutsMessage(StrutsMessage.errorMessage("查找交易日志时异常,异常原因:\n"+e.getMessage()));
			return ERROR;
		}
	}
	
	private JSONObject getLogInfo(JSONObject content) {
		// TODO Auto-generated method stub
		JSONObject result = new JSONObject();
		String filename = serialno;
		List<String> lines = new ArrayList<String>();
		List<String> echarX = new ArrayList<String>();
		List<Long> echarY = new ArrayList<Long>();
		long pretime = -1;
		if (content.containsKey("hits")) {
			JSONObject hitsObject = content.getJSONObject("hits");
			int num = hitsObject.getIntValue("total");
			if (num <= 0) {
				return result;
			}
			
			JSONArray array = hitsObject.getJSONArray("hits");
			int j = 0;
			num=array.size();
			for (int i = num - 1; i >= 0; i--) {
				JSONObject object = (JSONObject) array.get(i);
				if (object.containsKey("_source")) {
					JSONObject source = object.getJSONObject("_source");
					if (source.containsKey("body")) {
						String lineStr = source.getString("body");
						Date logstamp = source.getDate("logstamp");
						lines.add(lineStr);
						long time = logstamp.getTime();
						if (pretime == -1) {
							pretime = time;
						} else {
							echarX.add((j + 1) + "");
							echarY.add(time - pretime);
							pretime = time;
						}
					}
				}
				j++;
			}
		}
		result.put("time", echarX);
		result.put("line1", echarY);
		result.put("unit", "毫秒");
		result.put("filecontent", lines.toArray(new String[0]));
		result.put("filename", filename);
		return result;
	}
}
