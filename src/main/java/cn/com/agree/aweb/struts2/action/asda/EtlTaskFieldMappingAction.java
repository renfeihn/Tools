package cn.com.agree.aweb.struts2.action.asda;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.etl.model.AimlEtlTargetDatasource;
import tc.bank.asda.etl.model.AimlEtlTaskFieldMapping;
import tc.bank.asda.etl.service.IAimlEtlTaskFieldMappingService;
import tc.cama.aweb.model.AwebUser;

@Controller("EtlTaskFieldMappingActionBean")
@Scope("prototype")
public class EtlTaskFieldMappingAction extends StandardActionSupport {

	private static final long serialVersionUID = -7697333304333548898L;
	
	@Autowired
	private IAimlEtlTaskFieldMappingService aimlEtlTaskFieldMappingService;
	
	private long taskId;
    private String targetDatasource;
	
	public String getTargetDatasource() {
		return targetDatasource;
	}

	public void setTargetDatasource(String targetDatasource) {
		this.targetDatasource = targetDatasource;
	}
	private String list;

	private long targetDatasourceId;

	private String tableName;
	
	private long systemId;

	public String queryTaskFieldMappingList() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimlEtlTaskFieldMappingService.queryTaskFieldMappingList(taskId)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public String addTaskFieldMapping() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				List<AimlEtlTaskFieldMapping> panel = (List<AimlEtlTaskFieldMapping>) JSONObject.parseObject(list, AimlEtlTaskFieldMapping.class);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimlEtlTaskFieldMappingService.addTaskFieldMapping(panel,taskId)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public String getDatasourceFiledList() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
//				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
//						aimlEtlTaskFieldMappingService.getDatasourceFiledList(targetDatasourceId,tableName)));
				AimlEtlTargetDatasource panel = JSONObject.parseObject(targetDatasource, AimlEtlTargetDatasource.class);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						aimlEtlTaskFieldMappingService.getDatasourceFiledList(panel,tableName)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	public String getESFiledList() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						aimlEtlTaskFieldMappingService.getESFiledList(systemId)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	
	public long getSystemId() {
		return systemId;
	}

	public void setSystemId(long systemId) {
		this.systemId = systemId;
	}

	public long getTaskId() {
		return taskId;
	}

	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}

	public String getList() {
		return list;
	}

	public void setList(String list) {
		this.list = list;
	}

	public long getTargetDatasourceId() {
		return targetDatasourceId;
	}

	public void setTargetDatasourceId(long targetDatasourceId) {
		this.targetDatasourceId = targetDatasourceId;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
}
