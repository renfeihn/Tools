package tc.bank.asda.etl.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_etl_task_log")
public class AimlEtlTaskLog implements Serializable {
	private static final long serialVersionUID = -6643820254214904010L;
	/**
	 * 应用系统id
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 任务id
	 */
	@Column(name = "task_id")
	private long taskId;
	/**
	 * 采集es开始区间
	 */
	@Column(name = "es_start_time")
	private String esStartTime;
	/**
	 * 采集es结束区间
	 */
	@Column(name = "es_end_time")
	private String esEndTime;
	/**
	 * 执行结果
	 */
	@Column(name = "result")
	private String result;
	/**
	 * 1运行中0停止
	 */
	@Column(name = "state")
	private int state;
	/**
	 * 创建时间
	 */
	@Column(name = "create_time")
	private Date createTime;
	/**
	 * 创建时间
	 */
	@Column(name = "update_time")
	private Date updateTime;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getTaskId() {
		return taskId;
	}
	public void setTaskId(long l) {
		this.taskId = l;
	}
	public String getEsStartTime() {
		return esStartTime;
	}
	public void setEsStartTime(String esStartTime) {
		this.esStartTime = esStartTime;
	}
	public String getEsEndTime() {
		return esEndTime;
	}
	public void setEsEndTime(String esEndTime) {
		this.esEndTime = esEndTime;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public AimlEtlTaskLog() {
		super();
		this.createTime = new Date();
		this.updateTime = new Date();
	}

}