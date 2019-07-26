package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.bean.AimlCfgLogTask;
import tc.bank.asda.logconfig.model.AimlCfgLogTaskInfo;

public interface IAimlCfgLogTaskService {

	boolean addLogTask(AimlCfgLogTask task);
	
	List<AimlCfgLogTaskInfo> listLogTasks();
	
	int getTaskSeq();
	
	AimlCfgLogTask getClostestTask();
	
	void setTaskStatus(long taskId, String status);
	
	AimlCfgLogTask getTaskById(long taskId);
	boolean updateTask(AimlCfgLogTask task);
	boolean cancelTask(long taskId);
	boolean putTaskToTop(long taskId);
}
