package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.esb.model.EsbShowSystem;
import tc.cama.aweb.esb.model.EsbSystem;
import tc.cama.aweb.service.IAimEsbShowSystem;

@Controller("AimEsbShowSystemBean")
@Scope("prototype")
public class AimEsbShowSystemAction extends StandardActionSupport implements ModelDriven<EsbShowSystem>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4270604523676960097L;

	@Autowired
	private IAimEsbShowSystem aimEsbShowSystemService;
	
	private EsbShowSystem esbShowSystem = new EsbShowSystem();
	private String syscode;


	public String getSyscode() {
		return syscode;
	}

	public void setSyscode(String syscode) {
		this.syscode = syscode;
	}
	
	/**
	 * 获取所有AimEsbShowSystem
	 * @param syscode
	 * @return
	 * @throws Exception 
	 */
	public String getAllAimEsbShowSystem() throws Exception{
		List<EsbShowSystem> esbShowSystems = 
				aimEsbShowSystemService.getAllAimEsbShowSystem();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbShowSystems", esbShowSystems));
		return SUCCESS;
	}
	
	/**
	 * 根据syscode获取AimEsbShowSystem
	 */
	public String findAimEsbShowSystem() throws Exception{
		EsbShowSystem esbShowSystem = aimEsbShowSystemService.findAimEsbShowSystem(syscode);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbShowSystem", esbShowSystem));
		return SUCCESS;
	}
	
	/**
	 * 增加AimEsbShowSystem
	 * @return
	 */
	public String addAimEsbShowSystem() throws Exception{
		int result = aimEsbShowSystemService.addAimEsbShowSystem(esbShowSystem);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	
	/**
	 * 删除AimEsbShowSystem
	 */
	public String deleteAimEsbShowSystem() throws Exception{
		int result = aimEsbShowSystemService.deleteAimEsbShowSystem(syscode);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result ));
		return SUCCESS;
	}
	
	/**
	 * 修改AimEsbShowSystem
	 */
	public String updateAimEsbShowSystem() throws Exception{
		int result = aimEsbShowSystemService.updateAimEsbShowSystem(esbShowSystem);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result ));
		 return SUCCESS;
	 }
	
	/**
	 * 获取EsbSystem
	 */
	public String findAllEsbSystem() throws Exception{
		List<EsbSystem> EsbSystem = 
				aimEsbShowSystemService.findAllEsbSystem();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("EsbSystem", EsbSystem));
		 return SUCCESS;
	 }

	@Override
	public EsbShowSystem getModel() {
		return esbShowSystem;
	}

	public EsbShowSystem getEsbShowSystem() {
		return esbShowSystem;
	}

	public void setEsbShowSystem(EsbShowSystem esbShowSystem) {
		this.esbShowSystem = esbShowSystem;
	}
	
	
}
