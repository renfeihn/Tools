package cn.com.agree.aweb.struts2.action.appmonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.CmdbAppGroupDetail;
import tc.cama.aweb.service.IAppGroupManager;

@Controller("AppGroupActionBean")
@Scope("prototype")
public class AppGroupAction extends StandardActionSupport implements ModelDriven<CmdbAppGroupDetail>{
	/**
	 * 
	 */
	private static final long serialVersionUID = -5342973031000202105L;
	@Autowired
	private IAppGroupManager appGroupManager;
	private CmdbAppGroupDetail cmdbAppGroupDetail = new CmdbAppGroupDetail();
	

	public CmdbAppGroupDetail getCmdbAppGroupDetail() {
		return cmdbAppGroupDetail;
	}

	public void setCmdbAppGroupDetail(CmdbAppGroupDetail cmdbAppGroupDetail) {
		this.cmdbAppGroupDetail = cmdbAppGroupDetail;
	}

	

	public IAppGroupManager getAppGroupManager() {
		return appGroupManager;
	}

	public void setAppGroupManager(IAppGroupManager appGroupManager) {
		this.appGroupManager = appGroupManager;
	}
	
	public String getAppGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appGroupManager.getAppgroupInfo()));
		return SUCCESS;
	}
	
	public String getAppsByGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appGroupManager.getAppsByGroup(cmdbAppGroupDetail.getGroupId())));
		return SUCCESS;
	}
	
	public String addToGroup(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appGroupManager.addApptoGroup(cmdbAppGroupDetail)));
		return SUCCESS;
	}
	public String removeApp(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appGroupManager.removeAppFromGroup(cmdbAppGroupDetail.getObjectId())));
		return SUCCESS;
	}
	public String getNoGroup() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appGroupManager.getAppNoGroup()));
		return SUCCESS;
	}
	
	public String getAllApp() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appGroupManager.getAllApp()));
		return SUCCESS;
	}
	@Override
	public CmdbAppGroupDetail getModel() {
		return cmdbAppGroupDetail;
	}

	

}
