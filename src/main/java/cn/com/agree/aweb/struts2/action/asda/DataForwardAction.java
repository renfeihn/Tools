package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.forward.model.DataForward;
import tc.bank.asda.forward.service.IDataForwardService;

@Controller("DataForwardActionBean")
@Scope("prototype")
public class DataForwardAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3451498113199398018L;
	
	@Autowired
	private IDataForwardService dataForwardService;
	
	private long id;
	
	private String forwardTo;
	
	private String dataForwardStr;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getForwardTo() {
		return forwardTo;
	}

	public void setForwardTo(String forwardTo) {
		this.forwardTo = forwardTo;
	}

	public String getDataForwardStr() {
		return dataForwardStr;
	}

	public void setDataForwardStr(String dataForwardStr) {
		this.dataForwardStr = dataForwardStr;
	}

	/**
	 * 查找数据转发列表
	 * @return
	 */
	public String getAllDataForward() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataForwardService.getAllDataForward()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 添加数据转发
	 * @param dataForward
	 * @param forwardTo
	 * @return
	 */
	public String addDateForward() {
		try {
			DataForward dataForward = JSONObject.parseObject(dataForwardStr, DataForward.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataForwardService.addDateForward(dataForward,forwardTo)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 修改数据转发
	 * @param dataForward
	 * @param forwardTo
	 * @return
	 */
	public String updateDateForward() {
		try {
			DataForward dataForward = JSONObject.parseObject(dataForwardStr, DataForward.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataForwardService.updateDateForward(dataForward,forwardTo)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	public String delDateForward() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataForwardService.delDateForward(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
