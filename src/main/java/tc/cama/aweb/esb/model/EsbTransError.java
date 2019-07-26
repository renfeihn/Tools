package tc.cama.aweb.esb.model;

import javax.persistence.Column;

/**
 * 流水错误信息统计
 */
public class EsbTransError {
	
	String respCode;
	Integer errorCount;
	String logicSystem;
	String respmsg;
	String loop;
	String channelid;
	String serviceid;
	
	@Column(name = "logicsystem")
	public String getLogicSystem() {
		return logicSystem;
	}

	@Column(name = "respcode")
	public String getRespCode() {
		return respCode;
	}

	@Column(name = "errorcount")
	public Integer getErrorCount() {
		return errorCount;
	}

	@Column(name = "respcode")
	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}

	@Column(name = "errorcount")
	public void setErrorCount(Integer errorCount) {
		this.errorCount = errorCount;
	}

	@Column(name = "logicsystem")
	public void setLogicSystem(String logicSystem) {
		this.logicSystem = logicSystem;
	}
	
	@Column(name = "respmsg")
	public String getRespmsg() {
		return respmsg;
	}
	
	@Column(name = "respmsg")
	public void setRespmsg(String respmsg) {
		this.respmsg = respmsg;
	}

	@Column(name = "loop")
	public String getLoop() {
		return loop;
	}

	@Column(name = "loop")
	public void setLoop(String loop) {
		this.loop = loop;
	}

	@Column(name = "channelid")
	public String getChannelid() {
		return channelid;
	}

	@Column(name = "channelid")
	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	@Column(name = "serviceid")
	public String getServiceid() {
		return serviceid;
	}

	@Column(name = "serviceid")
	public void setServiceid(String serviceid) {
		this.serviceid = serviceid;
	}

	@Override
	public String toString() {
		return "EsbTransError [respCode=" + respCode + ", errorCount="
				+ errorCount + ", logicSystem=" + logicSystem + ", respmsg="
				+ respmsg + ", loop=" + loop + ", channelid=" + channelid
				+ ", serviceid=" + serviceid + "]";
	}

}
