package tc.cama.aweb.esb.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * ESB_MON_TRANS的POJO
 */
@Table(name = "aim_esb_mon_trans")
public class EsbMonTrans {

	private String esbFlowNo;
	private String flowStepId;
	private String esbServsequ;
	private String reqFlowNo;
	private String tranStamp;
	private String channelId;
	private String serviceId;
	private String respStatus;
	private String respCode;
	private String respMsg;
	private Date operStamp;
	private String tranStamp1;
	private String tranStamp2;
	private String tranStamp3;
	private String tranStamp4;
	private String logicSystem;
	private Date transDate;
	private String loop;
	private String accno;
	private int transDuration;
	
	/*
	 * setters
	 */
	
	@Column(name = "EsbFlowNo")
	public void setEsbFlowNo(String esbFlowNo) {
		this.esbFlowNo = esbFlowNo;
	}

	@Column(name = "FlowStepId")
	public void setFlowStepId(String flowStepId) {
		this.flowStepId = flowStepId;
	}

	@Column(name = "EsbServsequ")
	public void setEsbServsequ(String esbServsequ) {
		this.esbServsequ = esbServsequ;
	}

	@Column(name = "ReqFlowNo")
	public void setReqFlowNo(String reqFlowNo) {
		this.reqFlowNo = reqFlowNo;
	}

	@Column(name = "TranStamp")
	public void setTranStamp(String tranStamp) {
		this.tranStamp = tranStamp;
	}

	@Column(name = "ChannelId")
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	@Column(name = "ServiceId")
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	@Column(name = "RespStatus")
	public void setRespStatus(String respStatus) {
		this.respStatus = respStatus;
	}

	@Column(name = "RespCode")
	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}

	@Column(name = "RespMsg")
	public void setRespMsg(String respMsg) {
		this.respMsg = respMsg;
	}

	@Column(name = "OperStamp")
	public void setOperStamp(Date operStamp) {
		this.operStamp = operStamp;
	}

	@Column(name = "TranStamp1")
	public void setTranStamp1(String tranStamp1) {
		this.tranStamp1 = tranStamp1;
	}

	@Column(name = "TranStamp2")
	public void setTranStamp2(String tranStamp2) {
		this.tranStamp2 = tranStamp2;
	}

	@Column(name = "TranStamp3")
	public void setTranStamp3(String tranStamp3) {
		this.tranStamp3 = tranStamp3;
	}

	@Column(name = "TranStamp4")
	public void setTranStamp4(String tranStamp4) {
		this.tranStamp4 = tranStamp4;
	}

	@Column(name = "LogicSystem")
	public void setLogicSystem(String logicSystem) {
		this.logicSystem = logicSystem;
	}

	@Column(name = "Trans_Date")
	public void setTransDate(Date transDate) {
		this.transDate = transDate;
	}

	@Column(name = "INSTANCE")
	public void setLoop(String loop) {
		this.loop = loop;
	}
	
	/*
	 * getters
	 */
	@Column(name = "EsbFlowNo")
	public String getEsbFlowNo() {
		return esbFlowNo;
	}
	
	@Column(name = "FlowStepId")
	public String getFlowStepId() {
		return flowStepId;
	}

	@Column(name = "EsbServsequ")
	public String getEsbServsequ() {
		return esbServsequ;
	}

	@Column(name = "ReqFlowNo")
	public String getReqFlowNo() {
		return reqFlowNo;
	}

	@Column(name = "TranStamp")
	public String getTranStamp() {
		return tranStamp;
	}

	@Column(name = "ChannelId")
	public String getChannelId() {
		return channelId;
	}

	@Column(name = "ServiceId")
	public String getServiceId() {
		return serviceId;
	}

	@Column(name = "RespStatus")
	public String getRespStatus() {
		return respStatus;
	}

	@Column(name = "RespCode")
	public String getRespCode() {
		return respCode;
	}

	@Column(name = "RespMsg")
	public String getRespMsg() {
		return respMsg;
	}

	@Column(name = "OperStamp")
	public Date getOperStamp() {
		return operStamp;
	}

	@Column(name = "TranStamp1")
	public String getTranStamp1() {
		return tranStamp1;
	}

	@Column(name = "TranStamp2")
	public String getTranStamp2() {
		return tranStamp2;
	}

	@Column(name = "TranStamp3")
	public String getTranStamp3() {
		return tranStamp3;
	}

	@Column(name = "TranStamp4")
	public String getTranStamp4() {
		return tranStamp4;
	}

	@Column(name = "LogicSystem")
	public String getLogicSystem() {
		return logicSystem;
	}

	@Column(name = "Trans_Date")
	public Date getTransDate() {
		return transDate;
	}

	@Column(name = "INSTANCE")
	public String getLoop() {
		return loop;
	}
	
	@Column(name = "TRANS_DURATION")
	public int getTransDuration() {
		return transDuration;
	}

	@Column(name = "TRANS_DURATION")
	public void setTransDuration(int transDuration) {
		this.transDuration = transDuration;
	}

	@Column(name = "ACCNO")
	public String getAccno() {
		return accno;
	}

	@Column(name = "ACCNO")
	public void setAccno(String accno) {
		this.accno = accno;
	}

	@Override
	public String toString() {
		return "EsbMonTrans [esbFlowNo=" + esbFlowNo + ", flowStepId=" + flowStepId + ", esbServsequ=" + esbServsequ
				+ ", reqFlowNo=" + reqFlowNo + ", tranStamp=" + tranStamp + ", channelId=" + channelId + ", serviceId="
				+ serviceId + ", respStatus=" + respStatus + ", respCode=" + respCode + ", respMsg=" + respMsg
				+ ", operStamp=" + operStamp + ", tranStamp1=" + tranStamp1 + ", tranStamp2=" + tranStamp2
				+ ", tranStamp3=" + tranStamp3 + ", tranStamp4=" + tranStamp4 + ", logicSystem=" + logicSystem
				+ ", transDate=" + transDate + ", loop=" + loop + "]";
	}
	
}
