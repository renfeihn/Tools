package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logtrace.model.LogChainCfg;
import tc.bank.asda.logtrace.service.ILogChainCfgService;
import tc.bank.asda.logtrace.service.LogChainService;
import tc.bank.common.lang.StringUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("LogChainActionBean")
@Scope("prototype")
public class LogChainAction extends StandardActionSupport {

	private static final long serialVersionUID = 7472018650144828223L;
	
	@Autowired
	private ILogChainCfgService logChainCfgService;

	@Autowired
	private LogChainService logChainService;
	
	/**
	 * 获取交易链路信息参数 JSON格式
	 */
	private String params;
	
	private int id;
	
	private Long appid;
	
	public Long getAppid() {
		return appid;
	}

	public void setAppid(Long appid) {
		this.appid = appid;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	private String logChainCfgString;
	
	public String getLogChainCfgString() {
		return logChainCfgString;
	}

	public void setLogChainCfgString(String logChainCfgString) {
		this.logChainCfgString = logChainCfgString;
	}
	
	public String addCfg() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				LogChainCfg logChainCfg = JSONObject.parseObject(logChainCfgString, LogChainCfg.class);
				if(logChainCfg == null || StringUtils.isAnyEmpty(logChainCfg.getChainName(), 
						logChainCfg.getFromAppid(), logChainCfg.getToAppid())) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				logChainCfgService.add(logChainCfg);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查询日志交易链路信息
	 * 
	 * @return
	 */
	public String getLogChain() {
		try {
			JSONObject param = JSONObject.parseObject(params);
			String appId = param.getString("appId");
			String start = param.getString("start");
			String logsn = param.getString("logsn");
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logChainService.getChain(appId, appId + logsn, start)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public String getAll() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logChainCfgService.getAll()));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getById() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(appid == null) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logChainCfgService.getById(id)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getStructFieldByAppid() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(appid == 0) {
					setStrutsMessage(StrutsMessage.errorMessage("参数有误"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logChainCfgService.getStructFieldByAppid(appid)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String delById() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(id == 0) {
					setStrutsMessage(StrutsMessage.errorMessage("参数有误"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logChainCfgService.delById(id)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
}
