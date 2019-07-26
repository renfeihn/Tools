package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimlTellerOperationConfig;
import tc.cama.aweb.service.IAimlTellerOperationConfig;

@Scope("prototype")
@Controller("AimlTellerOperationCfgActionBean")
public class AimlTellerOperationCfgAction extends StandardActionSupport implements ModelDriven<AimlTellerOperationConfig>{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Autowired
	IAimlTellerOperationConfig aimlTellerOperationConfigService;
	
	private AimlTellerOperationConfig aimlTellerOperationConfig = new AimlTellerOperationConfig();

	@Override
	public AimlTellerOperationConfig getModel(){
		return this.aimlTellerOperationConfig;
	}
	
	public String save(){
		int reuslt = aimlTellerOperationConfigService.save(aimlTellerOperationConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
		
	}
	public String delete(){
		int reuslt = aimlTellerOperationConfigService.delete(aimlTellerOperationConfig.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
		
	}
	public String update(){
		int reuslt = aimlTellerOperationConfigService.update(aimlTellerOperationConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
		
	}
	public String queryAimlTellerOperationConfig(){
		List<AimlTellerOperationConfig> aimlTellerOperationCfgs = aimlTellerOperationConfigService.queryAimlTellerOperationConfig();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimlTellerOperationCfgs", aimlTellerOperationCfgs));
		return SUCCESS;
	}

}
