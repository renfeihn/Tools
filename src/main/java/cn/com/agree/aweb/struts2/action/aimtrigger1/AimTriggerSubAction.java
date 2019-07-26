package cn.com.agree.aweb.struts2.action.aimtrigger1;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.core.bean.AimConfigTriggerSubPlus;
import tc.bank.cama.core.module.AimConfigTriggerSub;
import tc.bank.cama.core.service.trigger.IAimConfigTriggerSub;

/**
 * 子触发器Action
 * @author chenxf
 *
 */
@Controller("AimTriggerSubActionBean")
@Scope("prototype")
public class AimTriggerSubAction extends StandardActionSupport implements ModelDriven<AimConfigTriggerSub>{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private AimConfigTriggerSub triggerSub = new  AimConfigTriggerSub();
	@Autowired
	private IAimConfigTriggerSub aimConfigTriggerSub;
	
	public IAimConfigTriggerSub getAimConfigTriggerSub() {
		return aimConfigTriggerSub;
	}
	public void setAimConfigTriggerSub(IAimConfigTriggerSub aimConfigTriggerSub) {
		this.aimConfigTriggerSub = aimConfigTriggerSub;
	}
	
	
	public AimConfigTriggerSub getTriggerSub() {
		return triggerSub;
	}
	public void setTriggerSub(AimConfigTriggerSub triggerSub) {
		this.triggerSub = triggerSub;
	}
	@Override
	public AimConfigTriggerSub getModel() {
		return triggerSub;
	}
	
	/**
	 * 增加触发器
	 * @return
	 */
	public String insertTriggerSub(){
		if(triggerSub.getId() != null){
			triggerSub.setId(null);
		}
		int result = aimConfigTriggerSub.insertTriggerSub(triggerSub);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	/**
	 * 删除指定触发器
	 * @return
	 */
	public String deleteTriggerSub(){
		int result = aimConfigTriggerSub.deleteTriggerSubByTriggerId(triggerSub.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	/**
	 * 更新触发器
	 * @return
	 */
	public String updateTriggerSub(){
		int result = aimConfigTriggerSub.updateTriggerSub(triggerSub.getId(), triggerSub);

		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	/**
	 * 得到所有触发器
	 * @return
	 */
	public String getAllTriggerSub(){
		List<AimConfigTriggerSubPlus> result = aimConfigTriggerSub.getAllTriggerSub();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;

		
	}
	/**
	 * 通过对象id查询子触发器
	 * @return
	 */
	public String getTriggerSubByObjectId(){

		List<AimConfigTriggerSubPlus> result = aimConfigTriggerSub.getTriggerSubByObjectId(triggerSub.getMobjId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	/**
	 * 得到指定id的触发器
	 * @return
	 */
	public String getTriggerSubByTriggerId(){
		AimConfigTriggerSubPlus result = aimConfigTriggerSub.getAllTriggerSubByTriggerId(triggerSub.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	/**
	 *根据对象id获取ip信息
	 * @return
	 * @throws Exception
	 */
	public String getIpByObjectId() throws Exception{
		List<String> result = aimConfigTriggerSub.getIpByObjectId(triggerSub.getMobjId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

}
