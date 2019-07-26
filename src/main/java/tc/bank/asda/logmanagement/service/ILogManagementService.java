package tc.bank.asda.logmanagement.service;


import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.asda.logmanagement.bean.LogManagementBean;
import tc.bank.asda.logmanagement.model.LogManageDB;
import tc.bank.asda.logmanagement.model.LogManageFile;
import tc.bank.asda.logmanagement.model.LogManagement;

public interface ILogManagementService {
    /**
     * 日志归档记录。
     * @param
     * @param record
     * @return
     */
    public Boolean save(LogManagement record);

    /**
     * 根据条件统计归档容量
     * @param
     * @param conditions
     * @return
     */
    public List<Map<String,Object>> getStatistic(LogManagementBean conditions);
    /**
	 * 分页查询日志平台数据清理历史
	 * @param appId
	 * @param objId
	 * @param pageSize
	 * @param pageNum
	 * @return
	 */
	public JSONObject getLogDBHis(long appId,long objId,int pageSize,int pageNum);
	/**
	 * 分页查询业务日志清理历史
	 * @param objId
	 * @param pageSize
	 * @param pageNum
	 * @return
	 */
	public JSONObject getLogFileHis(String executeName,long objId,int pageSize,int pageNum);
    /**
     * 添加业务日志管理规则
     * @param manage
     * @return
     */
    public boolean addFileManage(LogManageFile manage);
    /**
     * 添加日志平台日志管理规则
     * @param manage
     * @return
     */
    public boolean addDBManage(LogManageDB manage);
    /**
     * 修改业务日志管理规则
     * @param manage
     * @return
     */
    public boolean updateFileManage(LogManageFile manage);
    /**
     * 修改日志平台日志管理规则
     * @param manage
     * @return
     */
    public boolean updateDBManage(LogManageDB manage);
    /**
     * 删除业务日志管理规则
     * @param id
     * @return
     */
    public boolean delFileManage(String id);
    /**
     * 删除日志平台日志管理规则
     * @param id
     * @return
     */
    public boolean delDBManage(String id);
    /**
     * 根据对象ID查询日志平台日志管理规则
     * @param objId
     * @return
     */
    public LogManageDB getByObjId(long objId);
    /**
     * 根据应用ID查询日志平台日志管理规则
     * @param appId
     * @return
     */
    public LogManageDB getByAppId(long appId);
    /**
     * 根据对象ID查询业务日志管理规则
     * @param objId
     * @return
     */
    public LogManageFile getByObjectId(long objId);
    /**
     * 重新清理备份
     * @param hisId
     * @return
     */
    public void clearnAuto(long hisId);
    
    public List<LogManageFile> getAchiveConfigLists();
    
    public List<LogManageFile> getAchiveConfigListByAppId(long appid);
    
    public Map<String,Object> checkExectime(String ip,String exec_time,int plan_time);
}
