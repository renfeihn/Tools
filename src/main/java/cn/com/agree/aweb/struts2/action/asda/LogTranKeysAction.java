package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logtrace.model.AimlCfgTrankeysStopword;
import tc.bank.asda.logtrace.model.LogTranKeys;
import tc.bank.asda.logtrace.service.ILogTranKeysDaoService;
import tc.bank.common.lang.StringUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("LogTranKeysActionBean")
@Scope("prototype")
public class LogTranKeysAction extends StandardActionSupport {

	private static final long serialVersionUID = 6890777222245493389L;

	@Autowired
	private ILogTranKeysDaoService service;
	
	private String appId;
	private int id;
	private String hostIp;
	private String logFile;
	private String tranKeys;
	private String tranDesc;
	private int source;
	private String stopword;
	
	/**
	 * 获取所有
	 * @return
	 * @throws Exception
	 */
	public String getAll() throws Exception{
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getAll()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
		
	}
	
	public String addStopword() throws Exception{
	  service.addStopword(JSON.parseObject(stopword, AimlCfgTrankeysStopword.class));
	  setStrutsMessage(StrutsMessage.successMessage());
	  return SUCCESS;
	}
	
	/**
	 * 添加单个
	 * @return
	 * @throws Exception
	 */
	public String addOne() throws Exception{
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
			  if(StringUtils.isEmpty(tranKeys)) {
          setStrutsMessage(StrutsMessage.errorMessage("业务标识不能为空"));
          return ERROR;
        }
        if(source < 0) {
          setStrutsMessage(StrutsMessage.errorMessage("来源不能为空"));
          return ERROR;
        }
				LogTranKeys bean = new LogTranKeys();
				bean.setHostIp(hostIp);
				bean.setAppId(appId);
				bean.setLogFile(logFile);
				bean.setSource(source);
				bean.setTranDesc(tranDesc);
				bean.setTranKeys(tranKeys);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.add(bean)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 更新单个
	 * @return
	 * @throws Exception
	 */
	public String updateOne() throws Exception{
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isEmpty(tranKeys)) {
					setStrutsMessage(StrutsMessage.errorMessage("业务标识不能为空"));
					return ERROR;
				}
				if(source < 0) {
				  setStrutsMessage(StrutsMessage.errorMessage("来源不能为空"));
				  return ERROR;
				}
				if(id < 0) {
				  setStrutsMessage(StrutsMessage.errorMessage("ID不能为空"));
				  return ERROR;
				}
				LogTranKeys bean = new LogTranKeys();
				bean.setHostIp(hostIp);
				bean.setAppId(appId);
				bean.setLogFile(logFile);
				bean.setSource(source);
				bean.setTranDesc(tranDesc);
				bean.setTranKeys(tranKeys);
				bean.setId(id);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.update(bean)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 删除单个
	 * @return
	 * @throws Exception
	 */
	public String deleteOne() throws Exception{
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.delById(id)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getHostIp() {
		return hostIp;
	}
	public void setHostIp(String hostIp) {
		this.hostIp = hostIp;
	}
	public String getLogFile() {
		return logFile;
	}
	public void setLogFile(String logFile) {
		this.logFile = logFile;
	}
	public String getTranKeys() {
		return tranKeys;
	}
	public void setTranKeys(String tranKeys) {
		this.tranKeys = tranKeys;
	}
	public String getTranDesc() {
		return tranDesc;
	}
	public void setTranDesc(String tranDesc) {
		this.tranDesc = tranDesc;
	}
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}

  public String getStopword() {
    return stopword;
  }

  public void setStopword(String stopword) {
    this.stopword = stopword;
  }
	
}
