package cn.com.agree.aweb.struts2.action.svg;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.cmdb.model.view.CmdbIpRelatedAppAndServer;
import tc.cama.aweb.svg.ISVGData;

@Controller("SvgGraphActionBean")
@Scope("prototype")
public class SvgGraphAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private ISVGData svgData;

	private Long appId;

	private String ipAddr;
	
	public String getIpAddr() {
		return ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public Long getAppId() {
		return appId;
	}

	public ISVGData getSvgData() {
		return svgData;
	}

	public void setSvgData(ISVGData svgData) {
		this.svgData = svgData;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	/**
	 * 获取SVG图
	 * @return
	 * @throws Exception
	 */
	public String getSVGGraph() throws Exception {
		String fn = svgData.getSvgGraph(appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("svgname", fn));
		return SUCCESS;

	}
	
	/**
	 * 获取ip地址关联的服务器
	 * @return
	 * @throws Exception
	 */
	public String getServerByIP() throws Exception{
		Map<String, CmdbIpRelatedAppAndServer> result=svgData.getIpRelatedAppsAndServers(ipAddr);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
}
