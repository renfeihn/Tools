package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimEdwIndexConfig;
import tc.cama.aweb.service.IAimEdwIndexConfig;

@Scope("prototype")
@Controller("AimEdwIndexConfigBean")
public class AimEdwIndexConfigAction extends StandardActionSupport implements ModelDriven<AimEdwIndexConfig>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Autowired
	IAimEdwIndexConfig aimEdwIndexConfigService;
	
	private AimEdwIndexConfig aimEdwIndexConfig= new AimEdwIndexConfig();

	public AimEdwIndexConfig getAimEdwIndexConfig() {
		return aimEdwIndexConfig;
	}

	public void setAimEdwIndexConfig(AimEdwIndexConfig aimEdwIndexConfig) {
		this.aimEdwIndexConfig = aimEdwIndexConfig;
	}

	@Override
	public AimEdwIndexConfig getModel() {
		// TODO Auto-generated method stub
		return this.aimEdwIndexConfig;
	}
	
	/**
	 * 获取所有配置分类
     * 
	 * @return
	 */
	public String getAllCfgType(){
		List<AimEdwIndexConfig> aimEdwIndexConfigs = aimEdwIndexConfigService.getAllCfgType();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimEdwIndexConfigs", aimEdwIndexConfigs));
    	return SUCCESS;
	}
	
	/**
	 * 获取某个配置分类(cfg_type)下的所有配置
     * @param cfgType
	 * @return
	 */
    public String getCfgByType(){
    	List<AimEdwIndexConfig> aimEdwIndexConfigs = aimEdwIndexConfigService.getCfgByType(aimEdwIndexConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimEdwIndexConfigs", aimEdwIndexConfigs));
    	return SUCCESS;
    }
    
    /**
	 * 新增某个配置分类(cfg_type)的一条配置
     * @param cfgType
	 * @return
	 */
    public String saveCfgByType(){
    	int reuslt = aimEdwIndexConfigService.saveCfgByType(aimEdwIndexConfig);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS; 	
    }
    
    /**
     *  删除配置
     *  @param id
	 *  @return
     */
    public String deleteCfg(){
    	int reuslt = aimEdwIndexConfigService.deleteCfg(aimEdwIndexConfig.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
    	return SUCCESS;
    }
	
	

}
