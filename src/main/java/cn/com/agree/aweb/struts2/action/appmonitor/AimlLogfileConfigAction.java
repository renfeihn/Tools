package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimlLogfileConfig;
import tc.cama.aweb.service.IAimlLogfileConfig;

@Controller("AimlLogfileConfigActionBean")
@Scope("prototype")
public class AimlLogfileConfigAction extends StandardActionSupport 
implements ModelDriven<AimlLogfileConfig>{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2961744379482253908L;
	@Autowired
	private IAimlLogfileConfig aimlLogfileConfigService;
	private AimlLogfileConfig aimlLogfileConfig = new AimlLogfileConfig();
	private int id;
	public AimlLogfileConfig getAimlLogfileConfig() {
		return aimlLogfileConfig;
	}
	public int getId() {
		return id;
	}
	public void setAimlLogfileConfig(AimlLogfileConfig aimlLogfileConfig) {
		this.aimlLogfileConfig = aimlLogfileConfig;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	/**
	 * 获取所有AimlLogfileConfig
	 * @param 
	 * @return
	 * @throws Exception 
	 */
	public String getAllAimlLogfileConfig() throws Exception{
		List<AimlLogfileConfig> aimlLogfileConfigs = 
				aimlLogfileConfigService.getAllAimlLogfileConfig();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimlLogfileConfigs", aimlLogfileConfigs));
		return SUCCESS;
	}
	
	/**
	 * 根据appId获取AimlLogfileConfig
	 */
	public String findAimlLogfileConfig() throws Exception{
		List<AimlLogfileConfig> aimlLogfileConfigs= 
				aimlLogfileConfigService.findAimlLogfileConfig(aimlLogfileConfig.getAppId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimlLogfileConfigs", aimlLogfileConfigs));
		return SUCCESS;
	}
	
	/**
	 * 增加AimlLogfileConfig
	 * @return
	 */
	public String addAimlLogfileConfig() throws Exception{
		int result = aimlLogfileConfigService.addAimlLogfileConfig(aimlLogfileConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	/**
	 * 删除AimlLogfileConfig
	 */
	public String deleteAimlLogfileConfig() throws Exception{
		int result = aimlLogfileConfigService.deleteAimlLogfileConfig(aimlLogfileConfig.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result ));
		return SUCCESS;
	}
	
	/**
	 * 修改AimlLogfileConfig
	 */
	public String updateAimlLogfileConfig() throws Exception{
		int result = aimlLogfileConfigService.updateAimlLogfileConfig(aimlLogfileConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result ));
		 return SUCCESS;
	 }
	
	@Override
	public AimlLogfileConfig getModel() {
		return aimlLogfileConfig;
	}

}
