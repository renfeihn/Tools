package cn.com.agree.aweb.struts2.action.screen;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.esb.model.EsbShowSystem;
import tc.cama.aweb.service.IScreenImpAppsConfig;

@Controller("ScreenImpAppsConfigActionBean")
@Scope("prototype")
public class ScreenImpAppsConfigAction extends StandardActionSupport implements ModelDriven<EsbShowSystem> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private EsbShowSystem impApp = new EsbShowSystem();
	@Autowired
	private IScreenImpAppsConfig screenImpAppsConfig;
	
	public IScreenImpAppsConfig getScreenImpAppsConfig() {
		return screenImpAppsConfig;
	}

	public void setScreenImpAppsConfig(IScreenImpAppsConfig screenImpAppsConfig) {
		this.screenImpAppsConfig = screenImpAppsConfig;
	}

	public EsbShowSystem getImpApp() {
		return impApp;
	}

	public void setImpApp(EsbShowSystem impApp) {
		this.impApp = impApp;
	}

	@Override
	public EsbShowSystem getModel() {
		return impApp;
	}
	
	public String getImpAppsList(){
		List<EsbShowSystem> result = screenImpAppsConfig.getImpAppsList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	public String getImpApps(){
		EsbShowSystem result = screenImpAppsConfig.getImpApp(impApp.getSysCode());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	public String insertImpApp(){
		String result = screenImpAppsConfig.insertImpApp(impApp);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	public String updateImpApp(){
		String result = screenImpAppsConfig.updateImpApp(impApp, impApp.getSysCode());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	public String deleteImpApp(){
		String result = screenImpAppsConfig.deleteImpApp(impApp.getSysCode());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

}
