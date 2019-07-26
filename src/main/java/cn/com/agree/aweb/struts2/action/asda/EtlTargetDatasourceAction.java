package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.etl.model.AimlEtlTargetDatasource;
import tc.bank.asda.etl.service.IAimlEtlTargetDatasourceService;
import tc.cama.aweb.model.AwebUser;

@Controller("EtlTargetDatasourceActionBean")
@Scope("prototype")
public class EtlTargetDatasourceAction extends StandardActionSupport {

	private static final long serialVersionUID = -7697333304333548898L;
	
	@Autowired
	private IAimlEtlTargetDatasourceService aimlEtlTargetDatasourceService;
	
	private String targetDatasource;
	
	public String getTargetDatasource() {
		return targetDatasource;
	}

	public void setTargetDatasource(String targetDatasource) {
		this.targetDatasource = targetDatasource;
	}

	public String addNewTargetDatasource() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				AimlEtlTargetDatasource panel = JSONObject.parseObject(targetDatasource, AimlEtlTargetDatasource.class);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimlEtlTargetDatasourceService.addNewTargetDatasource(panel)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public String queryAllTargetDatasource() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimlEtlTargetDatasourceService.queryAllTargetDatasource()));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public String testDBSrouceConnect() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				AimlEtlTargetDatasource panel = JSONObject.parseObject(targetDatasource, AimlEtlTargetDatasource.class);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimlEtlTargetDatasourceService.testDBSrouceConnect(panel)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
