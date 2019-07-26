package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.AppConfigSoftwareFrame;
import tc.cama.aweb.bean.SoftwareEvent;
import tc.cama.aweb.service.AppConfigSoftFrame;

/**
 * 应用系统软件架构
 * 
 * @author zhangkun
 *
 */
@Controller("AppSoftFrameBean")
@Scope("prototype")
public class AppSoftFrameAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7604332543257059443L;
	private Long appId;
	private String objName;
	private int page;
	private int size;
	private Long objectId;
	private String ip;
	@Autowired
	private AppConfigSoftFrame appSoftWareService;
    
	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public Long getObjectId() {
		return objectId;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getSoftFrameByAppId() throws Exception {
		AppConfigSoftwareFrame appConfigSoftwareFrame = appSoftWareService.getSoftFrameByAppId2(appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appConfigSoftwareFrame", appConfigSoftwareFrame));
		return SUCCESS;

	}
	public String getSoftFrameByIp() throws Exception {
		AppConfigSoftwareFrame appConfigSoftwareFrame = appSoftWareService.getSoftFrameByIp(ip);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appConfigSoftwareFrame", appConfigSoftwareFrame));
		return SUCCESS;

	}
	public String getSoftwareEvent() throws Exception {
		SoftwareEvent softwareEvent = appSoftWareService.getSoftwareEvent(objName, objectId, appId, page, size);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("softwareEvent", softwareEvent));
		return SUCCESS;

	} 
	public String getSoftwareObjIdsByObjectId() throws Exception {
		List<Long> swObjIds = appSoftWareService.getSoftwareObjIdsByObjectId(objectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("swObjIds", swObjIds));
		return SUCCESS;

	}
}
