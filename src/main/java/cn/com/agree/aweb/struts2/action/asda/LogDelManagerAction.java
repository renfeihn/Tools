package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logmanagement.bean.LogManagerDelBean;
import tc.bank.asda.logmanagement.service.ILogManagerDelInfoService;
import tc.bank.asda.logmanagement.service.ILogManagerDelService;
import tc.bank.common.lang.StringUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("LogDelManagerActionBean")
@Scope("prototype")
public class LogDelManagerAction extends StandardActionSupport {
	
	private static final long serialVersionUID = 6809877222245492908L;
	
	@Autowired
	private ILogManagerDelService delService;
	
	@Autowired
	private ILogManagerDelInfoService delInfoService;
	
	private String host;
	private int dayNum;
	
	public String getByHost(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isEmpty(host)) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", delInfoService.getByHost(host)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getDayNumByHost(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isEmpty(host)) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", delService.getByHost(host)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String addDel(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isEmpty(host) || dayNum <= 0) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				delService.addDelBean(host, dayNum);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String update(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isEmpty(host) || dayNum <= 0) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				LogManagerDelBean bean = new LogManagerDelBean();
				bean.setHost(host);
				bean.setDayNum(dayNum);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", delService.update(bean)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public int getDayNum() {
		return dayNum;
	}
	public void setDayNum(int dayNum) {
		this.dayNum = dayNum;
	}
}
