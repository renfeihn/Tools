package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.cama.aweb.model.AimEdwIndexChange;
import tc.cama.aweb.service.IAimEdwIndexChange;

@Scope("prototype")
@Controller("AimEdwIndexChangeBean")
public class AimEdwIndexChangeAction extends StandardActionSupport implements ModelDriven<AimEdwIndexChange>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Autowired
	IAimEdwIndexChange aimEdwIndexChangeService;
	
	private AimEdwIndexChange aimEdwIndexChange = new AimEdwIndexChange();
	private int page;
	private int size;
	private String whereEx;

	public AimEdwIndexChange getAimEdwIndexChange() {
		return aimEdwIndexChange;
	}
	
	public void setAimEdwIndexChange(AimEdwIndexChange aimEdwIndexChange) {
		this.aimEdwIndexChange = aimEdwIndexChange;
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
	public AimEdwIndexChange getModel() {
		// TODO Auto-generated method stub
		return this.aimEdwIndexChange;
	}
	
	/**
	 * 通过流水号查询非正常状态指标
     * 
	 * @return
	 */
	public String query(){
		List<AimEdwIndexChange> aimEdwIndexChanges = aimEdwIndexChangeService.query();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimEdwIndexChanges", aimEdwIndexChanges));
    	return SUCCESS;
	}
	
	/**
     * 查询
     * @param pageable
     * @param whereEx
     * @return
     */
    public String queryAimEdwIndexChangeByPage(){
    	Pageable pageable=new Pageable(page,size);
    	JSONObject obj = JSONObject.parseObject(whereEx);
		Page<AimEdwIndexChange> aimEdwIndexChanges = aimEdwIndexChangeService.queryAimEdwIndexChangeByPage(pageable, obj);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimEdwIndexChanges", aimEdwIndexChanges));
		return SUCCESS;
    }


}
