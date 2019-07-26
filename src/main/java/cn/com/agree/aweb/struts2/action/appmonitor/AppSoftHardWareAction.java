package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.PageAppHardwareServer;
import tc.cama.aweb.service.IAppSoftHardWare;
/**
 * 应用软硬件架构
 * @author luotong
 *
 */
@Controller("AppSoftHardWareActionBean")
@Scope("prototype")
public class AppSoftHardWareAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	@Autowired
	private IAppSoftHardWare appSoftHardWare;
	
	private Long appObjectId;
	
	public Long getAppObjectId() {
		return appObjectId;
	}

	public void setAppObjectId(Long appObjectId) {
		this.appObjectId = appObjectId;
	}

	/**
	 * 获取硬件架构服务器及相关数据
	 * @return
	 * @throws Exception
	 */
	public String getHardwareServers() throws Exception{
		List<PageAppHardwareServer> serverList = appSoftHardWare.getHardwareServers(appObjectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("serverList", serverList));
		return SUCCESS;
	}
}