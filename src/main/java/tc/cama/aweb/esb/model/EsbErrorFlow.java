package tc.cama.aweb.esb.model;

import javax.persistence.Column;

/**
 * 流水错误信息统计
 */
public class EsbErrorFlow {
	
	String respCode;
	String esbflowno;
	String respmsg;
	
	@Column(name = "respcode")
	public String getRespCode() {
		return respCode;
	}

	@Column(name = "respcode")
	public void setRespCode(String respCode) {
		this.respCode = respCode;
	}

	@Column(name = "respmsg")
	public String getRespmsg() {
		return respmsg;
	}
	
	@Column(name = "respmsg")
	public void setRespmsg(String respmsg) {
		this.respmsg = respmsg;
	}

	@Column(name = "esbflowno")
	public String getEsbflowno() {
		return esbflowno;
	}

	@Column(name = "esbflowno")
	public void setEsbflowno(String esbflowno) {
		this.esbflowno = esbflowno;
	}

	@Override
	public String toString() {
		return "EsbErrorFlow [respCode=" + respCode + ", esbflowno="
				+ esbflowno + ", respmsg=" + respmsg + "]";
	}

}
