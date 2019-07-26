package cn.com.agree.aweb.struts2.action.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.cama.aweb.model.AimEdwTriggerRule;
import tc.cama.aweb.service.IAimEdwTriggerRule;

@Scope("prototype")
@Controller("AimEdwTriggerRuleBean")
public class AimEdwTriggerRuleAction extends StandardActionSupport implements ModelDriven<AimEdwTriggerRule> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private AimEdwTriggerRule aimEdwTriggerRule = new AimEdwTriggerRule();
	private int page;
	private int size;
	private String whereEx;
	@Autowired
	IAimEdwTriggerRule aimEdwTriggerRuleService;
	
	public AimEdwTriggerRule getAimEdwTriggerRule() {
		return aimEdwTriggerRule;
	}
	public void setAimEdwTriggerRule(AimEdwTriggerRule aimEdwTriggerRule) {
		this.aimEdwTriggerRule = aimEdwTriggerRule;
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
	public String getWhereEx() {
		return whereEx;
	}
	public void setWhereEx(String whereEx) {
		this.whereEx = whereEx;
	}
	@Override
	public AimEdwTriggerRule getModel() {
		// TODO Auto-generated method stub
		return this.aimEdwTriggerRule;
	}
	public String save(){
		int reuslt=aimEdwTriggerRuleService.save(aimEdwTriggerRule);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
	}
	public String delete(){
		int reuslt=aimEdwTriggerRuleService.delete(aimEdwTriggerRule.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
	}
	public String update(){
		int reuslt=aimEdwTriggerRuleService.update(aimEdwTriggerRule);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
	}
	public String queryAimEdwTriggerRuleByPage(){
		Pageable pageable=new Pageable(page,size);
		JSONObject obj = JSONObject.parseObject(whereEx);
		Page<AimEdwTriggerRule> aimEdwTriggerRules=aimEdwTriggerRuleService.queryAimEdwTriggerRuleByPage(pageable, obj);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimEdwTriggerRules", aimEdwTriggerRules));
		return SUCCESS;
	}
  
}
