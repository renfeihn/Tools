package tc.bank.asda.logconfig.bean;

import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogTaskData;


public class AimlCfgLogTask {

	private long taskId;
	private String taskDesc;
	private String taskCond;
	private String startTime;
	private String endTime;
	private Integer dataSize;
	private String taskStatus;
	private String taskPer;
	private String taskMsg;
	private int taskSeq;
	private String category;
	private List<AimlCfgLogTaskData> sourceList;
	
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
	public long getTaskId() {
		return taskId;
	}
	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}
	public String getTaskDesc() {
		return taskDesc;
	}
	public void setTaskDesc(String taskDesc) {
		this.taskDesc = taskDesc;
	}
	public String getTaskCond() {
		return taskCond;
	}
	public void setTaskCond(String taskCond) {
		this.taskCond = taskCond;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public Integer getDataSize() {
		return dataSize;
	}
	public void setDataSize(Integer dataSize) {
		this.dataSize = dataSize;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	public String getTaskPer() {
		return taskPer;
	}
	public void setTaskPer(String taskPer) {
		this.taskPer = taskPer;
	}
	public String getTaskMsg() {
		return taskMsg;
	}
	public void setTaskMsg(String taskMsg) {
		this.taskMsg = taskMsg;
	}
	public List<AimlCfgLogTaskData> getSourceList() {
		return sourceList;
	}
	public void setSourceList(List<AimlCfgLogTaskData> sourceList) {
		this.sourceList = sourceList;
	}
	
}
