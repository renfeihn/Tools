package tc.bank.cama.statistic;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aim_common_trans")
public class AimCommonTrans {

	private Integer id;
	private Date recordTime;
	private Date transStartTime;
	private Date transEndTime;
	private Integer transDuration;
	private String systemId;
	private String serviceId;
	private String channelId;
	private String instanceId;
	private String transFlowNo;
	private String reqFlowNo;
	private String rspFlowNo;
	private Integer rspStatus;
	private String bizRetCode;
	private String bizRetMsg;
	
	/*
	 * -- getters -- 
	 */
	@Column(name = "id")
	public Integer getId() {
		return id;
	}
	
	@Column(name = "record_time")
	public Date getRecordTime() {
		return recordTime;
	}
	
	@Column(name = "trans_start_time")
	public Date getTransStartTime() {
		return transStartTime;
	}
	
	@Column(name = "trans_end_time")
	public Date getTransEndTime() {
		return transEndTime;
	}
	
	@Column(name = "trans_duration")
	public Integer getTransDuration() {
		return transDuration;
	}
	
	@Column(name = "system_id")
	public String getSystemId() {
		return systemId;
	}
	
	@Column(name = "service_id")
	public String getServiceId() {
		return serviceId;
	}
	
	@Column(name = "channel_id")
	public String getChannelId() {
		return channelId;
	}
	
	@Column(name = "instance_id")
	public String getInstanceId() {
		return instanceId;
	}
	
	@Column(name = "trans_flow_no")
	public String getTransFlowNo() {
		return transFlowNo;
	}
	
	@Column(name = "req_flow_no")
	public String getReqFlowNo() {
		return reqFlowNo;
	}
	
	@Column(name = "rsp_flow_no")
	public String getRspFlowNo() {
		return rspFlowNo;
	}
	
	@Column(name = "rsp_status")
	public Integer getRspStatus() {
		return rspStatus;
	}
	
	@Column(name = "biz_ret_code")
	public String getBizRetCode() {
		return bizRetCode;
	}
	
	@Column(name = "biz_ret_msg")
	public String getBizRetMsg() {
		return bizRetMsg;
	}

	/*
	 * -- setters --
	 */
	
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "record_time")
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

	@Column(name = "trans_start_time")
	public void setTransStartTime(Date transStartTime) {
		this.transStartTime = transStartTime;
	}

	@Column(name = "trans_end_time")
	public void setTransEndTime(Date transEndTime) {
		this.transEndTime = transEndTime;
	}

	@Column(name = "trans_duration")
	public void setTransDuration(Integer transDuration) {
		if (null == transDuration || transDuration.intValue() <= 0) {
			// 尝试通过(结束时间-开始时间)计算
			if (null != this.transStartTime && null != this.transEndTime) {
				int duration = (int) (this.transEndTime.getTime() - this.transStartTime.getTime());
				if (duration > 0) {
					transDuration = duration;
				} else {
					transDuration = 0;
				}
			} else {
				transDuration = 0;
			}
		}
		this.transDuration = transDuration;
	}

	@Column(name = "system_id")
	public void setSystemId(String systemId) {
		this.systemId = systemId;
	}

	@Column(name = "service_id")
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	@Column(name = "channel_id")
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	@Column(name = "instance_id")
	public void setInstanceId(String instanceId) {
		this.instanceId = instanceId;
	}

	@Column(name = "trans_flow_no")
	public void setTransFlowNo(String transFlowNo) {
		this.transFlowNo = transFlowNo;
	}

	@Column(name = "req_flow_no")
	public void setReqFlowNo(String reqFlowNo) {
		this.reqFlowNo = reqFlowNo;
	}

	@Column(name = "rsp_flow_no")
	public void setRspFlowNo(String rspFlowNo) {
		this.rspFlowNo = rspFlowNo;
	}

	@Column(name = "rsp_status")
	public void setRspStatus(Integer rspStatus) {
		this.rspStatus = rspStatus;
	}

	@Column(name = "biz_ret_code")
	public void setBizRetCode(String bizRetCode) {
		this.bizRetCode = bizRetCode;
	}

	@Column(name = "biz_ret_msg")
	public void setBizRetMsg(String bizRetMsg) {
		this.bizRetMsg = bizRetMsg;
	}

}
