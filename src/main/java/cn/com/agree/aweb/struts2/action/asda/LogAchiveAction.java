package cn.com.agree.aweb.struts2.action.asda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.aim.alibaba.fastjson.JSONObject;
import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.dataclean.model.LogAchiveHost;
import tc.bank.asda.dataclean.service.ILogAchiveService;


@Controller("LogAchiveActionBean")
@Scope("prototype")
public class LogAchiveAction extends StandardActionSupport{

	private static final long serialVersionUID = 4250373287403784123L;

	@Autowired
	private ILogAchiveService logAchiveService;
	
	private String logAchiveStr;
	
	private long id;

	public String getLogAchiveStr() {
		return logAchiveStr;
	}

	public void setLogAchiveStr(String logAchiveStr) {
		this.logAchiveStr = logAchiveStr;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	 
	
    public String getLogAchiveHostList() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logAchiveService.getLogAchiveHostList()));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
    
    
    public String updateLogAchiveHost() {
        try {
        	LogAchiveHost logachive = JSONObject.parseObject(logAchiveStr, LogAchiveHost.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logAchiveService.updateLogAchiveHost(logachive)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
	
    
    public String getLogAchiveHost() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logAchiveService.getLogAchiveHost(id)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
	
    public String delLogAchiveHost() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logAchiveService.delLogAchiveHost(id)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
	
    
    public String addLogAchiveHost() {
        try {
        	LogAchiveHost logachive = JSONObject.parseObject(logAchiveStr, LogAchiveHost.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logAchiveService.addLogAchiveHost(logachive)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
	 
}
