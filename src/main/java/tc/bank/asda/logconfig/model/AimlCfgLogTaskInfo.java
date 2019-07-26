package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_cfg_log_task_info")
public class AimlCfgLogTaskInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 任务ID
	 */
	@Column(name = "task_id")
	private long taskId;
	/**
	 * 任务描述
	 */
	@Column(name = "task_desc")
	private String taskDesc;
	/**
	 * 任务条件
	 */
	@Column(name = "task_cond")
	private String taskCond;
	/**
	 * 起始时间
	 */
	@Column(name = "start_time")
	private String startTime;
	/**
	 * 截止时间
	 */
	@Column(name = "end_time")
	private String endTime;
	/**
	 * 数据大小
	 */
	@Column(name = "data_size")
	private Integer dataSize;
	/**
	 * 任务状态；0-排队、1-处理中、2-处理完成、3-已取消
	 */
	@Column(name = "task_status")
	private String taskStatus;
	/**
	 * 任务百分比
	 */
	@Column(name = "task_per")
	private String taskPer;
	/**
	 * 任务处理描述
	 */
	@Column(name = "task_msg")
	private String taskMsg;
	
	@Column(name="task_seq")
	private int taskSeq;
	
	@Column(name="category")
	private String category;
	
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getTaskSeq() {
		return taskSeq;
	}

	public void setTaskSeq(int taskSeq) {
		this.taskSeq = taskSeq;
	}

	/**
	 * @return 任务ID
	 */
	public long getTaskId() {
		return this.taskId;
	}

	/**
	 * @param taskId
	 *            任务ID
	 */
	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}

	/**
	 * @return 任务描述
	 */
	public String getTaskDesc() {
		return this.taskDesc;
	}

	/**
	 * @param taskDesc
	 *            任务描述
	 */
	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}

	/**
	 * @return 任务条件
	 */
	public String getTaskCond() {
		return this.taskCond;
	}

	/**
	 * @param taskCond
	 *            任务条件
	 */
	public void setTaskCond(String taskCond) {
		this.taskCond = taskCond;
	}

	/**
	 * @return 起始时间
	 */
	public String getStartTime() {
		return this.startTime;
	}

	/**
	 * @param startTime
	 *            起始时间
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return 截止时间
	 */
	public String getEndTime() {
		return this.endTime;
	}

	/**
	 * @param endTime
	 *            截止时间
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	/**
	 * @return 数据大小
	 */
	public Integer getDataSize() {
		return this.dataSize;
	}

	/**
	 * @param dataSize
	 *            数据大小
	 */
	public void setDataSize(Integer dataSize) {
		this.dataSize = dataSize;
	}

	/**
	 * @return 任务状态；0-排队、1-处理中、2-处理完成、3-已取消
	 */
	public String getTaskStatus() {
		return this.taskStatus;
	}

	/**
	 * @param taskStatus
	 *            任务状态；0-排队、1-处理中、2-处理完成、3-已取消
	 */
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}

	/**
	 * @return 任务百分比
	 */
	public String getTaskPer() {
		return this.taskPer;
	}

	/**
	 * @param taskPer
	 *            任务百分比
	 */
	public void setTaskPer(String taskPer) {
		this.taskPer = taskPer;
	}

	/**
	 * @return 任务处理描述
	 */
	public String getTaskMsg() {
		return this.taskMsg;
	}

	/**
	 * @param taskMsg
	 *            任务处理描述
	 */
	public void setTaskMsg(String taskMsg) {
		this.taskMsg = taskMsg;
	}

}
