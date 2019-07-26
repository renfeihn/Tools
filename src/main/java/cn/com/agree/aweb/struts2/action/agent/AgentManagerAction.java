package cn.com.agree.aweb.struts2.action.agent;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.SFTPUtil;
import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.cama.aweb.service.IAgentManager;


@Controller("AgentManagerBean")
@Scope("prototype")
public class AgentManagerAction extends StandardActionSupport {
	private static final long serialVersionUID = -4584016009500251081L;
	@Autowired
	private IAgentManager agentManager;
	
	private String whereStr;
	
	private String ip;
	private String id;
	private Long app_id;
	private String start_time;
	private String end_time;
	
	private String queryType;
	
	private String queryValue;
	

	public Long getApp_id() {
		return app_id;
	}

	public void setApp_id(Long app_id) {
		this.app_id = app_id;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public String getQueryValue() {
		return queryValue;
	}

	public void setQueryValue(String queryValue) {
		this.queryValue = queryValue;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	private String dataStr;
	
	private File upfile;
	
	private String upfileFileName; //文件类型
	
	private int timeoout=2000;
	
	
	public File getUpfile() {
		return upfile;
	}

	public void setUpfile(File upfile) {
		this.upfile = upfile;
	}

	public String getUpfileFileName() {
		return upfileFileName;
	}

	public void setUpfileFileName(String upfileFileName) {
		this.upfileFileName = upfileFileName;
	}

	
	
	public int getTimeoout() {
		return timeoout;
	}

	public void setTimeoout(int timeoout) {
		this.timeoout = timeoout;
	}

	public String getAgentList(){
		List<Map<String, Object>> agentList = agentManager.queryAgentList(JSONObject.parseObject(whereStr));
		JSONArray formatList = new JSONArray();
		for (Map<String, Object> map : agentList) {
			JSONArray row = new JSONArray();
			JSONObject json = (JSONObject) JSON.toJSON(map);
			row.add("<input type=\"checkbox\" id=\""+json.getString("ip").replaceAll("[.]", "-")+"\" name=\"agmChk\" />");
			row.add(json.get("host_name"));
			row.add(json.get("os_type"));
			row.add(json.get("ip"));
			row.add(json.get("agent_status"));
			row.add(createIcon(json.getBooleanValue("ping_status")));
		//	row.add(createIcon(json.getBooleanValue("telnet_status")));
		//	row.add(createIcon(json.getBooleanValue("agent_user_status")));
			row.add(map.get("install_user"));
			row.add(map.get("protocol"));
			row.add(map.get("port"));
			row.add(map.get("update_filename"));
			row.add(map.get("update_filelength"));
			row.add(map.get("update_filecode"));
			row.add(map.get("update_date"));
			row.add(map.get("id"));
			//row.add(createHand(json.getBooleanValue("agent_status")));
			formatList.add(row);
		}
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list",formatList));

		return SUCCESS;
	}
	
	public String getAgentListSimple(){
		List<Map<String, Object>> agentList = agentManager.queryAgentList(JSONObject.parseObject(whereStr));
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list",agentList));
		return SUCCESS;
	}
	
	public String getAgentListByApp(){
		List<Map<String, Object>> agentList = agentManager.queryAgentListByApp(app_id);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list",agentList));
		return SUCCESS;
	}
	
	public String getIpOperHis(){
		List<Map<String, Object>> agentList = agentManager.getIpOperHis(ip);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list",agentList));
		return SUCCESS;
	}
	
	public String getAgentListByCmdb() {
		if(queryType == null || queryType.isEmpty()) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","queryType不能为null"));
			return ERROR;
		}
		
		if(queryValue == null || queryValue.isEmpty()) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","queryValue不能为null"));
			return ERROR;
		}
		
		List<Map<String, Object>> list = agentManager.queryAgentListByCmdb(queryType, queryValue);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", list));
		return SUCCESS;
	}
	
	public String getAgentOSList(){
		List<Map<String, Object>> agentList = agentManager.queryAgentOSList(JSONObject.parseObject(whereStr));
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list",agentList));
		
		return SUCCESS;
	}
	
	public String getAgentOS(){
		
		JSONObject where = new JSONObject();
		if(id.isEmpty()){
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","ID不能为null"));
			return ERROR;
		}
		where.put("id", id);
		where.put("start_time", start_time);
		where.put("end_time", end_time);
		List<Map<String, Object>> agentList = agentManager.getAgentOS(where);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list",agentList));
		
		return SUCCESS;
	}
	
	private String createIcon(boolean flag){
		String color = "green";
		if(!flag){
			color = "red";
		} 
		return "<i class=\"agm-"+color+"-icon\"></i>";
	}

	public String getWhereStr() {
		return whereStr;
	}

	public void setWhereStr(String whereStr) {
		this.whereStr = whereStr;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getDataStr() {
		return dataStr;
	}

	public void setDataStr(String dataStr) {
		this.dataStr = dataStr;
	}
	
	public String saveAgent() {
		
		boolean flag=agentManager.saveAgent(JSONObject.parseObject(dataStr));
		if(flag) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","新增代理成功"));
			return SUCCESS;
		}else {
			setStrutsMessage(StrutsMessage.errorMessage("新增代理失败"));
			return ERROR;
		}
	}
	
	public String modifyAgent() {
		boolean flag=agentManager.modifyAgent(ip,JSONObject.parseObject(dataStr));
		if(flag) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","修改代理成功"));
			return SUCCESS;
		}else {
			setStrutsMessage(StrutsMessage.errorMessage("修改代理失败"));
			return ERROR;
		}
	}
	
	public String getAgentByIp() {
		List<Map<String, Object>>result= agentManager.getAgentByIp(ip);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result));
		return SUCCESS;
	}
	
	public String getServerByIp() throws Exception {
		CmdbLogicalServer server=agentManager.getServerByIp(ip);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",server));
		return SUCCESS;
	}
	
	public String deleteAgentByIp() {
		String[] ipArr=ip.split(",");
		boolean flag=agentManager.deleteAgentByIp(ipArr);
		if(flag) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","删除代理成功"));
			return SUCCESS;
		}else {
			setStrutsMessage(StrutsMessage.errorMessage("删除代理失败"));
			return ERROR;
		}
	}
	
	public String checkAgentAndGetServerByIp() throws Exception {
		boolean flag=agentManager.checkAgentByIp(ip);
		Map<String,Object> map=new HashMap<String, Object>();
		map.put("flag", flag);
		if(flag) {
			map.put("msg", "ip未配置");
			CmdbLogicalServer server=agentManager.getServerByIp(ip);
			map.put("server",server);
		}else {
			map.put("msg", "ip已配置");
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",map));
		return SUCCESS;
	}
	
	public String getAgentTarList() throws Exception {
		
		List<Map<String,Object>> result=agentManager.getAgentList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("agentTarList",result));
		return SUCCESS;
	}
	
	public String getOsTypeList() throws Exception {
		
		List<String> result=agentManager.getOsTypeList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("OsType",result));
		return SUCCESS;
	}
	
	public String uploadAgentFile() throws Exception {
		Map<String, String> map = getAgentConf();
		String uploadResult = "";
		String resultmsg = "";
		String resultstr = "";
		String[] url = map.get("url").split(";");
		if(url.length>0) {
			for(int i=0;i<url.length;i++) {
				String url_port = url[i];
				String strurl ="";
				String strport ="";
				if(url_port.indexOf(':') != -1) {
					strurl = url_port.split(":")[0];
					strport = url_port.split(":")[1];
					String path=upfile.getAbsolutePath();
					uploadResult = SFTPUtil.sftpUpload(strurl, Integer.valueOf(strport), map.get("afausername"), map.get("afapassword"), 
							path, map.get("filePath"), upfileFileName,timeoout);
				}
				if(!uploadResult.equals("")) {
					resultstr = resultstr +" "+strurl;
					resultmsg = resultmsg +" "+uploadResult ;
				}
			}
		}
		System.out.println(upfile.length());
		
		if("".equals(resultstr)){
			setStrutsMessage(StrutsMessage.successMessage().addParameter("filesize", upfile.length()).addParameter("uploadResult", uploadResult).addParameter("fileName", upfileFileName));
		}else{
			setStrutsMessage(StrutsMessage.errorMessage("服务器["+resultstr+"]上传文件失败 " + resultmsg));
		}
		return SUCCESS;
	}
	
	public Map<String, String> getAgentConf() throws Exception{
		Map<String, String> map = new HashMap<String, String>();
        Map<String,String> config=agentManager.getAgentUploadConfig();
		map.put("url", config.get("ip"));
		map.put("afausername", config.get("user"));
		map.put("afapassword", config.get("pwd"));
		map.put("filePath", config.get("path"));
		return map;
	}
}
