package cn.com.agree.aweb.struts2.action.asda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.dataclean.service.IAimlLogArchiveHistService;
import tc.bank.asda.logmanagement.bean.LogManagementBean;
import tc.bank.asda.logmanagement.model.LogManageDB;
import tc.bank.asda.logmanagement.model.LogManageFile;
import tc.bank.asda.logmanagement.service.ILogManagementService;
import tc.bank.common.date.DateUtils;
import tc.bank.common.lang.StringUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 日志归档统计功能，按三级分类和应用 Created by wangch on 2018/9/11.
 */
@Controller("LogManagementActionBean")
@Scope("prototype")
public class LogManagementAction extends StandardActionSupport {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Autowired
    private ILogManagementService service;

    @Autowired
    private IAimlLogArchiveHistService aimlLogArchiveHistService;

    /* 统计条件json，对LogManagementBean字段对应 */
    private String condition;

    private String param;
    /**
     * 配置规则的主键ID
     */
    private String id;
    /**
     * 应用ID
     */
    private long appId;
    /**
     * 对象ID
     */
    private long objId;
    /**
     * 分页大小
     */
    private int pageSize;
    /**
     * 当前页
     */
    private int pageNum;
    /**
     * 地理执行器名称
     */
    private String executeName;
    /**
     * 数据清理历史ID
     */
    private Long hisId;

    private String execTime;

    private int planTime;

    private String ip;


    private Date startTime;

    private Date endTime;

    private String backState;

    private String cleanState;


    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getAppId() {
        return appId;
    }

    public void setAppId(long appId) {
        this.appId = appId;
    }

    public long getObjId() {
        return objId;
    }

    public void setObjId(long objId) {
        this.objId = objId;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public String getExecuteName() {
        return executeName;
    }

    public void setExecuteName(String executeName) {
        this.executeName = executeName;
    }

    public Long getHisId() {
        return hisId;
    }

    public void setHisId(Long hisId) {
        this.hisId = hisId;
    }


    public String getExecTime() {
        return execTime;
    }

    public void setExecTime(String execTime) {
        this.execTime = execTime;
    }

    public int getPlanTime() {
        return planTime;
    }

    public void setPlanTime(int planTime) {
        this.planTime = planTime;
    }


    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }


    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getBackState() {
        return backState;
    }

    public void setBackState(String backState) {
        this.backState = backState;
    }

    public String getCleanState() {
        return cleanState;
    }

    public void setCleanState(String cleanState) {
        this.cleanState = cleanState;
    }

    /**
     * 日志归档统计。
     *
     * @return
     */
    public String logArchiveStatistic() {
        try {
            LogManagementBean bean = null;
            if (StringUtils.isNotEmpty(condition)) {
                bean = JSONObject.parseObject(condition, LogManagementBean.class);
            } else {
                bean = new LogManagementBean();
            }
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getStatistic(bean)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 日志平台数据清理历史查询
     *
     * @return
     */
    public String getLogDBHis() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getLogDBHis(appId, objId, pageSize, pageNum)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 业务日志数据清理历史查询
     *
     * @return
     */
    public String getLogFileHis() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getLogFileHis(executeName, objId, pageSize, pageNum)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 添加业务日志管理规则
     *
     * @return
     */
    public String addFileManage() {
        try {
            LogManageFile manage = JSONObject.parseObject(param, LogManageFile.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.addFileManage(manage)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 添加日志平台日志管理规则
     *
     * @return
     */
    public String addDBManage() {
        try {
            LogManageDB manage = JSONObject.parseObject(param, LogManageDB.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.addDBManage(manage)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 修改业务日志管理规则
     *
     * @return
     */
    public String updateFileManage() {
        try {
            LogManageFile manage = JSONObject.parseObject(param, LogManageFile.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.updateFileManage(manage)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 修改日志平台日志管理规则
     *
     * @return
     */
    public String updateDBManage() {
        try {
            LogManageDB manage = JSONObject.parseObject(param, LogManageDB.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.updateDBManage(manage)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 删除业务日志管理规则
     *
     * @return
     */
    public String delFileManage() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.delFileManage(id)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 删除日志平台日志管理规则
     *
     * @return
     */
    public String delDBManage() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.delDBManage(id)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 获取业务日志管理规则
     *
     * @return
     */
    public String getFileManage() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getByObjectId(objId)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 获取日志平台日志管理规则
     *
     * @return
     */
    public String getDBManage() {
        try {
            if (appId > 0) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getByAppId(appId)));
            } else if (objId > 0) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getByObjId(objId)));
            } else {
                setStrutsMessage(StrutsMessage.errorMessage("请求参数应用ID或主机ID为空"));
                return ERROR;
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 日志重新备份
     *
     * @return
     */
    public String reLogBack() {
        try {
            service.clearnAuto(hisId);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "重新开始日志备份"));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    public String getAchiveConfigLists() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getAchiveConfigLists()));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    ;

    public String getAchiveConfigListByAppId() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.getAchiveConfigListByAppId(appId)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    ;

    public String checkExectime() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", service.checkExectime(ip, execTime, planTime)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    ;

    /**
     * 功能说明：归档历史记录查询
     *
     * @return
     */
    public String getLogArchiveHists() {
        try {
            Map<String, Object> whereEx = new HashMap<String, Object>();
            if (null != startTime) {
                whereEx.put("startTime", DateUtils.format(startTime, "yyyy-MM-dd HH:mm:ss"));
            }

            if (null != endTime) {
                whereEx.put("endTime", DateUtils.format(endTime, "yyyy-MM-dd HH:mm:ss"));
            }

            if (StringUtils.isNotEmpty(backState)) {
                whereEx.put("backState", backState);
            }

            if (StringUtils.isNotEmpty(cleanState)) {
                whereEx.put("cleanState", cleanState);
            }

            List<Map<String,Object>> list = aimlLogArchiveHistService.getAll(whereEx);

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", list));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
    public String getTaskLogList() {
        try {
           
            List<Map<String,Object>> list = aimlLogArchiveHistService.getTaskLogList();

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", list));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
}
