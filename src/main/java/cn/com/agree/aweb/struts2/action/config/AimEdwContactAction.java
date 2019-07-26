package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimEdwContact;
import tc.cama.aweb.service.IAimEdwContact;

@Scope("prototype")
@Controller("AimEdwContactBean")
public class AimEdwContactAction extends StandardActionSupport implements ModelDriven<AimEdwContact>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Autowired
	IAimEdwContact aimEdwContactService;
	
	private AimEdwContact aimEdwContact = new AimEdwContact();

	@Override
	public AimEdwContact getModel() {
		// TODO Auto-generated method stub
		return this.aimEdwContact;
	}

	public String save(){
		int reuslt = aimEdwContactService.save(aimEdwContact);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
		
	}
	public String delete(){
		int reuslt = aimEdwContactService.delete(aimEdwContact.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
		
	}
	public String update(){
		int reuslt = aimEdwContactService.update(aimEdwContact);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", reuslt));
		return SUCCESS;
		
	}
	public String queryAimEdwContact(){
		List<AimEdwContact> aimEdwContacts=aimEdwContactService.queryAimEdwContact();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimEdwContacts", aimEdwContacts));
		return SUCCESS;
	}

}

