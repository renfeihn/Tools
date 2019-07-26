package cn.com.agree.aweb.struts2.action.ab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.cmdb.model.table.extention.CmdbSoftware;
import tc.cama.aweb.ab.service.ICmdbSoftware;
@Controller("CmdbSoftwareActionBean")
@Scope("prototype")
public class CmdbSoftwareAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer objectId;
	private String softwareName;
	
	@Autowired
	ICmdbSoftware cmdbSoftware; 
	
	public ICmdbSoftware getCmdbSoftware() {
		return cmdbSoftware;
	}
	public void setCmdbSoftware(ICmdbSoftware cmdbSoftware) {
		this.cmdbSoftware = cmdbSoftware;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Integer getObjectId() {
		return objectId;
	}
	public void setObjectId(Integer objectId) {
		this.objectId = objectId;
	}
	public String getSoftwareName() {
		return softwareName;
	}
	public void setSoftwareName(String softwareName) {
		this.softwareName = softwareName;
	}
	
	public String getSoftwareByObjectId(){
		CmdbSoftware result = cmdbSoftware.getSoftwareByObjectId(objectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result!=null?result:new CmdbSoftware()));
		return SUCCESS;
	}
	public String getSoftwareByName(){
		CmdbSoftware result = cmdbSoftware.getSoftwareByName(softwareName);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result!=null?result:new CmdbSoftware()));
		return SUCCESS;
	}
}
