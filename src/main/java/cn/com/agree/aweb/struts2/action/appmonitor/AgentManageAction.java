package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.agentManager.IAgentManage;

@Scope("prototype")
@Controller("AgentManageActionBean")
public class AgentManageAction extends StandardActionSupport {

	private List<String> ip;
	private String opType;
	private String filename;
	private String dir;
	private String agentIp;

	public String getAgentIp() {
		return agentIp;
	}

	public void setAgentIp(String agentIp) {
		this.agentIp = agentIp;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getOpType() {
		return opType;
	}

	public void setOpType(String opType) {
		this.opType = opType;
	}

	public List<String> getIp() {
		return ip;
	}

	public void setIp(List<String> ip) {
		this.ip = ip;
	}
	

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}



	private static final long serialVersionUID = -4752095898823191775L;

	@Autowired
	IAgentManage agentOper;

	public String shellCall() throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		if("UPDATE_AGENT".equals(opType)) {
			params.put("filename", filename);
		}
		Map<String, Object> result = agentOper.execute(ip, opType, params);
		String stdout = result.get("stdout") != null ? result.get("stdout").toString() : "";
		String errout = result.get("errout") != null ? result.get("errout").toString() : "";
		String status = result.get("status") != null ? result.get("status").toString() : "";
		String msg = result.get("msg") != null ? result.get("msg").toString() : "";
		setStrutsMessage(StrutsMessage.successMessage().addParameter("status", status).addParameter("msg", msg)
				.addParameter("stdout", stdout).addParameter("errout", errout).addParameter("Date", result.get("Date"))
				.addParameter("stats", result.get("stats")).addParameter("opStats", result.get("opStats")));

		return SUCCESS;

	}
	
	public String getAgentDir() throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
			params.put("dir", dir);
			List<String> ips = new ArrayList<String>();
			opType = "getDir";
			ips.add(agentIp);
		Map<String, Object> result = agentOper.execute(ips, opType, params);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));

		return SUCCESS;

	}
	
	public String getFileContents() throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
			params.put("file", filename);
			List<String> ips = new ArrayList<String>();
			opType = "getFileContents";
			ips.add(agentIp);
		Map<String, Object> result = agentOper.execute(ips, opType, params);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));

		return SUCCESS;

	}
}
