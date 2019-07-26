package tc.bank.asda.etl.service;

import java.util.List;

import tc.bank.asda.etl.model.AimlEtlTask;
import tc.bank.asda.etl.model.AimlEtlTaskLog;

/**
 * 任务管理类
 * @author Administrator
 *
 */
public interface IAimlEtlTaskService {
	/**
	 * 创建ETL任务
	 * @param task
	 * @param frequency 1 一分钟 ONEMINUTE; 5五分钟   FIVEMINUTE; 60 一小时   ONEHOUR; 1140 一天     ONEDAY
	 * @return
	 */
	public boolean createTask(AimlEtlTask task, int frequency);
	/**
	 * 更新ETL任务
	 * @param task
	 * @param frequency 1 一分钟 ONEMINUTE; 5五分钟   FIVEMINUTE; 60 一小时   ONEHOUR; 1140 一天     ONEDAY
	 * @return
	 */
	boolean updateTask(AimlEtlTask task, int frequency);
	/**
	 * 启动ETL任务
	 * @param task
	 * @return
	 */
	public boolean startTask(long taskId);
	/**
	 * 停止ETL任务
	 * @param task
	 * @return
	 */
	public boolean stopTask(long taskId);
	/**
	 * 根据数据源类型获取采集任务列表
	 * @param dbType
	 * @return
	 */
	public List<AimlEtlTask> queryTaskListByDBType(int dbType);
	/**
	 * 获取所有启用任务列表
	 * @param dbType
	 * @return
	 */
	public List<AimlEtlTask> queryAllTaskList(long datasourceId);
	/**
	 * 获取所有启用任务列表
	 * @param dbType
	 * @return
	 */
	public List<AimlEtlTask> queryAllActiveTaskList(Long datasourceId);
	/**
	 * 获取任务日志列表
	 * @param dbType
	 * @return
	 */
	public List<AimlEtlTaskLog> queryTaskRunningLogList(long taskId);

}
