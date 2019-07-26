package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.sqlmarket.service.IAimSqlMarketDynamicStateService;
import tc.cama.aweb.model.AwebUser;

@Controller("SqlMarketDynamicStateActionBean")
@Scope("prototype")
public class SqlMarketDynamicStateAction extends StandardActionSupport{

	private static final long serialVersionUID = -7697090304543548898L;
	
	@Autowired
	private IAimSqlMarketDynamicStateService stateService;
	
	private int type;
	
	private int sqlId;
	
	public String getAllStates() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(type < 0 || sqlId <= 0) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				setStrutsMessage(
						StrutsMessage.successMessage().addParameter("result", stateService.getAllState(sqlId, type)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public String getBasicInfo() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(sqlId <= 0) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				setStrutsMessage(
						StrutsMessage.successMessage().addParameter("result", stateService.getBasicInfo(sqlId,userVO.getId())));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getSqlId() {
		return sqlId;
	}

	public void setSqlId(int sqlId) {
		this.sqlId = sqlId;
	}
	
}
