package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.dataclean.model.DataClean;
import tc.bank.asda.dataclean.service.IDataCleanService;

@Controller("DataCleanActionBean")
@Scope("prototype")
public class DataCleanAction extends StandardActionSupport {

    /**
     *
     */
    private static final long serialVersionUID = 7472017650144828223L;

    @Autowired
    private IDataCleanService dataCleanService;

    private long id;

    private long appId;

    private String dataCleanStr;

    /*日志类型dblog，filelog*/
    private String logType;
    /**
     * 清理对象 1 已采集数据 2 源文件
     */
    private int dataType;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public IDataCleanService getDataCleanService() {
        return dataCleanService;
    }

    public void setDataCleanService(IDataCleanService dataCleanService) {
        this.dataCleanService = dataCleanService;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public long getAppId() {
        return appId;
    }

    public void setAppId(long appId) {
        this.appId = appId;
    }

    public String getDataCleanStr() {
        return dataCleanStr;
    }

    public void setDataCleanStr(String dataCleanStr) {
        this.dataCleanStr = dataCleanStr;
    }

    public int getDataType() {
        return dataType;
    }

    public void setDataType(int dataType) {
        this.dataType = dataType;
    }

    /**
     * 添加数据清理规则
     *
     * @return
     */
    public String addDataClean() {
        try {
            DataClean dataClean = JSONObject.parseObject(dataCleanStr, DataClean.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataCleanService.addDataClean(dataClean)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 修改数据清理规则
     *
     * @return
     */
    public String updataDataClean() {
        try {
            DataClean dataClean = JSONObject.parseObject(dataCleanStr, DataClean.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataCleanService.updataDataClean(dataClean)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 根据日志源Id获取数据清理规则
     *
     * @return
     */
    public String getDataCleanByDataType() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataCleanService.getDataCleanByDataType(dataType)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 删除数据清理
     *
     * @return
     */
    public String delDataClean() {
        try {
        		DataClean dataClean = dataCleanService.getDataCleanById(id);
        		if(null == dataClean) {
        			 setStrutsMessage(StrutsMessage.errorMessage("该策略不存在"));
        	         return ERROR;
        		}else if(dataClean.getReferenceTimes()>0){
        			setStrutsMessage(StrutsMessage.errorMessage("该策略已被引用，无法删除！欲继续删除，请先解除引用！"));
       	         return ERROR;
        		}else {
        			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", dataCleanService.delDataClean(id)));
        			return SUCCESS;
        		}
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
}
