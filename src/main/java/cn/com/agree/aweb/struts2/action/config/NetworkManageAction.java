package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.cmdb.model.table.network.CmdbNetworkInflowCount;
import tc.cama.aweb.service.IConfigManage;

/**
 * 配置管理-网络管理
 * 
 * @author luotong
 *
 */
@Controller("NetworkManageActionBean")
@Scope("prototype")
public class NetworkManageAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;

	@Autowired
	private IConfigManage configManage;

	private String remoteIp;

	private int remotePort;
	
	private String localIp;

	public String getRemoteIp() {
		return remoteIp;
	}

	public void setRemoteIp(String remoteIp) {
		this.remoteIp = remoteIp;
	}

	public int getRemotePort() {
		return remotePort;
	}

	public void setRemotePort(int remotePort) {
		this.remotePort = remotePort;
	}

	public String getLocalIp() {
		return localIp;
	}

	public void setLocalIp(String localIp) {
		this.localIp = localIp;
	}

	/**
	 * 查询网络关系列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getNetworkInfos() throws Exception {
		List<CmdbNetworkInflowCount> networkInfos = configManage.getAllNetworkFlows();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("networkInfos", networkInfos));
		return SUCCESS;
	}

	/**
	 * 查询某个远端IP/端口的所有接入IP地址
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getInflowIps() throws Exception {
		List<String> ips = configManage.getInflowIpAddresses(remoteIp, remotePort);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("ips", ips));
		return SUCCESS;
	}

	/**
	 * 添加网络关系
	 * @return
	 * @throws Exception
	 */
	public String addNetworkInfo() throws Exception {
		String msg = configManage.addNetworkFlow(localIp, remoteIp, remotePort);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}

	/**
	 * 删除网络关系
	 * @return
	 * @throws Exception
	 */
	public String removeNetworkInfo() throws Exception {
		String msg = configManage.removeNetworkFlow(localIp, remoteIp, remotePort);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 获取StrutsMessage对象
	 * 
	 * @param msg
	 * @return
	 */
	private StrutsMessage getStrutsMessageBean(String msg) {
		return "".equals(msg) ? StrutsMessage.successMessage() : StrutsMessage.errorMessage(msg);
	}

}