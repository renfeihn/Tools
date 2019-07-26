package cn.com.agree.aweb.struts2.action.asda;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import tc.bank.asda.logconfig.bean.AimlCfgLogTask;
import tc.bank.asda.logconfig.model.AimlCfgLogTaskData;
import tc.bank.asda.logconfig.service.IAimlCfgLogTaskService;
import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;

import com.aim.alibaba.fastjson.JSONArray;
import com.opensymphony.xwork2.ModelDriven;

@Controller("LogCfgTaskActionBean")
@Scope("prototype")
public class LogCfgTaskAction extends StandardActionSupport implements ModelDriven<AimlCfgLogTask>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -774339103279428853L;

	@Autowired
	private IAimlCfgLogTaskService logTaskService;
	
	private AimlCfgLogTask logTask = new AimlCfgLogTask();
	private String sources;


	public String getSources() {
		return sources;
	}

	public void setSources(String sources) {
		this.sources = sources;
	}

	/**添加二次结构化任务
	 * @return
	 */
	public String addLogTask() {
		List<AimlCfgLogTaskData> sourceList = JSONArray.parseArray(sources, AimlCfgLogTaskData.class);
		logTask.setSourceList(sourceList);
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logTaskService.addLogTask(logTask)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**预计排队号
	 * @return
	 */
	public String getTaskSeq() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logTaskService.getTaskSeq()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**查询结构化任务列表
	 * @return
	 */
	public String listLogTasks(){
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logTaskService.listLogTasks()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**查看任务
	 * @return
	 */
	public String viewTask(){
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logTaskService.getTaskById(logTask.getTaskId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**更新
	 * @return
	 */
	public String updateTask(){
		List<AimlCfgLogTaskData> sourceList = JSONArray.parseArray(sources, AimlCfgLogTaskData.class);
		logTask.setSourceList(sourceList);
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logTaskService.updateTask(logTask)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**取消任务
	 * @return
	 */
	public String cancelTask(){
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logTaskService.cancelTask(logTask.getTaskId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**置顶
	 * @return
	 */
	public String putTaskToTop(){
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logTaskService.putTaskToTop(logTask.getTaskId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	

	@Override
	public AimlCfgLogTask getModel() {
		return logTask;
	}
}
