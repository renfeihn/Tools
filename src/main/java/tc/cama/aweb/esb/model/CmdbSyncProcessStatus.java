package tc.cama.aweb.esb.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 同步步骤明细信息
 */
@Table(name = "cmdb_sync_process_status")
public class CmdbSyncProcessStatus {

	/** 同步步骤序号. */
	private Long stepOrder;

	/** 步骤名称. */
	private String stepName;

	/** 同步状态. */
	private String status;

	/** 同步开始时间. */
	private Date startTime;

	/** 同步结束时间. */
	private Date endTime;

	/** 同步异常信息. */
	private String exception;

	/*
	 * setters
	 */
	
	@Column(name = "step_order")
	public void setStepOrder(Long stepOrder) {
		this.stepOrder = stepOrder;
	}

	@Column(name = "step_name")
	public void setStepName(String stepName) {
		this.stepName = stepName;
	}

	@Column(name = "status")
	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "start_time")
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	@Column(name = "end_time")
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	@Column(name = "exception")
	public void setException(String exception) {
		this.exception = exception;
	}

	@Column(name = "step_order")
	public Long getStepOrder() {
		return stepOrder;
	}

	@Column(name = "step_name")
	public String getStepName() {
		return stepName;
	}

	@Column(name = "status")
	public String getStatus() {
		return status;
	}

	@Column(name = "start_time")
	public Date getStartTime() {
		return startTime;
	}

	@Column(name = "end_time")
	public Date getEndTime() {
		return endTime;
	}

	@Column(name = "exception")
	public String getException() {
		return exception;
	}
	
}
