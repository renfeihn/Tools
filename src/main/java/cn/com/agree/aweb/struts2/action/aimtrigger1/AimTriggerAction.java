package cn.com.agree.aweb.struts2.action.aimtrigger1;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.core.bean.AimConfigTriggerPlus;
import tc.bank.cama.core.bean.AimConfigTriggerPlusPageView;
import tc.bank.cama.core.bean.AimConfigTriggerSubPlus;
import tc.bank.cama.core.bean.CateNode;
import tc.bank.cama.core.module.AimConfigMeasure;
import tc.bank.cama.core.module.AimConfigMetricCateMappingView;
import tc.bank.cama.core.module.AimConfigTrigger;
import tc.bank.cama.core.service.trigger.IAimConfigTrigger;

/**
 * 主触发器Action
 * 
 * @author zhangkun
 *
 */
@Controller("AimTriggerBean")
@Scope("prototype")
public class AimTriggerAction extends StandardActionSupport implements ModelDriven<AimConfigTrigger> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private AimConfigTrigger trigger = new AimConfigTrigger();
	@Autowired
	IAimConfigTrigger triggerService;

	//页数，从零开始
	private int page;
	
	//每页记录数
	private int size;
	
	
	private Long cateId;
	
	
	public Long getCateId() {
		return cateId;
	}

	public int getPage() {
		return page;
	}

	public int getSize() {
		return size;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public AimConfigTrigger getTrigger() {
		return trigger;
	}

	public void setTrigger(AimConfigTrigger trigger) {
		this.trigger = trigger;
	}

	@Override
	public AimConfigTrigger getModel() {
		return trigger;
	}

	public String addTrigger() throws Exception {
		int result = triggerService.addTrigger(trigger);
		if(result!=0)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		else
			setStrutsMessage(StrutsMessage.errorMessage("添加触发器失败"));
		return SUCCESS;
	}

	public String updateTriggerById() {
		int result = triggerService.updateTriggerById(trigger.getId(), trigger);
		if(result!=0)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		else
			setStrutsMessage(StrutsMessage.errorMessage("更新触发器失败"));
		return SUCCESS;
	}

	public String deleteTriggerById() {
		int result = triggerService.deleteTriggerById(trigger.getId());
		if(result!=0)
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		else
			setStrutsMessage(StrutsMessage.errorMessage("删除触发器失败"));
		return SUCCESS;
	}

	public String getTriggersByPageQuery() throws Exception {
		AimConfigTriggerPlusPageView result = triggerService.getTriggersByPageQuery(page, size);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	public String getAllChildTriggerById() throws Exception {
		List<AimConfigTriggerSubPlus> result = triggerService.getAllChildTriggerById(trigger.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	public String getTriggerByObjectId() throws Exception {
		List<AimConfigTriggerPlus> result = triggerService.getTriggerByObjectId(trigger.getMobjId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	public String getTriggerById() throws Exception {
		AimConfigTriggerPlus result = triggerService.getTriggerById(trigger.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	public String getAllcate() throws Exception {
		CateNode node = triggerService.getAllcate();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("node", node));
		return SUCCESS;
	}
	
	public String getIpByObjId() throws Exception{
		List<String> result = triggerService.getIpByObjId(trigger.getMobjId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	public String getMetricByCateId() throws Exception{
		List<AimConfigMetricCateMappingView> result=triggerService.getMetricByCateId(cateId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	public String getMeasureByMid() throws Exception{
		List<AimConfigMeasure> result=triggerService.getMeasureByMid((long) trigger.getMid());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}
	
	

}
