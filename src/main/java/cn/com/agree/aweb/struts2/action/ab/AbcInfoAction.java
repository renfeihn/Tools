package cn.com.agree.aweb.struts2.action.ab;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.ab.model.AimAbcListCur;
import tc.cama.aweb.ab.service.IAbcInfoManager;

@Controller("AbcInfoBean")
@Scope("prototype")
public class AbcInfoAction extends StandardActionSupport {

	private static final long serialVersionUID = 4153459105735166064L;

	@Autowired
	private IAbcInfoManager abcInfoManager;

	private Integer mobjId;
	private String oid;

	public IAbcInfoManager getAbcInfoManager() {
		return abcInfoManager;
	}

	public Integer getMobjId() {
		return mobjId;
	}

	public String getOid() {
		return oid;
	}

	public void setAbcInfoManager(IAbcInfoManager abcInfoManager) {
		this.abcInfoManager = abcInfoManager;
	}

	public void setMobjId(Integer mobjId) {
		this.mobjId = mobjId;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	/**
	 * 4005 查询全部的多ABC列表信息查询
	 * 
	 * @return
	 */
	public String getAbcList() {

		List<AimAbcListCur> abcListCur = abcInfoManager.getAbcList();

		setStrutsMessage(StrutsMessage.successMessage().addParameter("abcListCur", abcListCur!=null?abcListCur:new ArrayList<AimAbcListCur>()));
		return SUCCESS;
	}

	/**
	 * 4004 指定实例对应的多ABC列表信息查询
	 * @return
	 */
	public String getAbcListByMobjId() {

		List<AimAbcListCur> abcListCur = abcInfoManager.getAbcListByMobjId(mobjId);

		setStrutsMessage(StrutsMessage.successMessage().addParameter("abcListCur", abcListCur!=null?abcListCur:new ArrayList<AimAbcListCur>()));
		return SUCCESS;
	}

	/**
	 * 4001
	 * 查询全部的多ABC列表信息查询
	 * @return
	 */
	public String getAbcListByOId() {
		
		List<AimAbcListCur> abcListCur = abcInfoManager.getAbcListByOId(mobjId,oid);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("abcListCur", abcListCur!=null?abcListCur:new ArrayList<AimAbcListCur>()));
		return SUCCESS;
	}
	
	/**
	 * 4002
	 * 实时登陆终端数量查询
	 * @return
	 */
	public String getCountTellerno() {
		
		Integer tellernoCount = abcInfoManager.getCountTellerno();
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("tellernoCount", tellernoCount));
		return SUCCESS;
	}
	
	/**
	 * 4003
	 * 在线客户端数量查询
	 * @return
	 */
	public String getCountAbcIp() {
		
		Integer countAbcIp = abcInfoManager.getCountAbcIp();
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("countAbcIp", countAbcIp));
		return SUCCESS;
	}
}
