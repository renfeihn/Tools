package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimlKeywordsConfig;
import tc.cama.aweb.service.IAimlKeywordsConfig;

@Controller("AimlKeywordsConfigBean")
@Scope("prototype")
public class AimlKeywordsConfigAction extends StandardActionSupport 
								implements ModelDriven<AimlKeywordsConfig>{

	private static final long serialVersionUID = -4270604523676960097L;
	
	@Autowired
	private IAimlKeywordsConfig aimlKeywordsConfigService;
	
	private AimlKeywordsConfig aimlKeywordsConfig = new AimlKeywordsConfig();
	private int id;
	
	public AimlKeywordsConfig getAimlKeywordsConfig() {
		return aimlKeywordsConfig;
	}
	public int getId() {
		return id;
	}
	public void setAimlKeywordsConfig(AimlKeywordsConfig aimlKeywordsConfig) {
		this.aimlKeywordsConfig = aimlKeywordsConfig;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	/**
	 * 获取所有AimlKeywordsConfig
	 * @param 
	 * @return
	 * @throws Exception 
	 */
	public String getAllAimlKeywordsConfig() throws Exception{
		List<AimlKeywordsConfig> aimlKeywordsConfigs = 
				aimlKeywordsConfigService.getAllAimlKeywordsConfig();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimlKeywordsConfigs", aimlKeywordsConfigs));
		return SUCCESS;
	}
	
	/**
	 * 根据appId获取AimlKeywordsConfig
	 */
	public String findAimlKeywordsConfig() throws Exception{
		List<AimlKeywordsConfig> aimlKeywordsConfigs= 
				aimlKeywordsConfigService.findAimlKeywordsConfig(aimlKeywordsConfig.getAppId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimlKeywordsConfigs", aimlKeywordsConfigs));
		return SUCCESS;
	}
	
	/**
	 * 增加AimlKeywordsConfig
	 * @return
	 */
	public String addAimlKeywordsConfig() throws Exception{
		int result = aimlKeywordsConfigService.addAimlKeywordsConfig(aimlKeywordsConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	/**
	 * 删除AimlKeywordsConfig
	 */
	public String deleteAimlKeywordsConfig() throws Exception{
		int result = aimlKeywordsConfigService.deleteAimlKeywordsConfig(aimlKeywordsConfig.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result ));
		return SUCCESS;
	}
	
	/**
	 * 修改AimlKeywordsConfig
	 */
	public String updateAimlKeywordsConfig() throws Exception{
		int result = aimlKeywordsConfigService.updateAimlKeywordsConfig(aimlKeywordsConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result ));
		 return SUCCESS;
	 }

	@Override
	public AimlKeywordsConfig getModel() {
		// TODO Auto-generated method stub
		return aimlKeywordsConfig ;
	}
	
	
	
	
}
