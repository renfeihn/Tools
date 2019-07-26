package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_sinks")
public class AimLogSinksBase implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8920846086595288497L;
	
	/**
	 * sinkID
	 */
	@Column(name = "sinkid")
	private String sinkid;
	
	/**
	 * sink名称
	 */
	@Column(name = "sinkname")
	private String sinkname;
	
	/**
	 * sink类型
	 */
	@Column(name = "sinktype")
	private String sinktype;
	
	/**
	 * sink使用通道
	 */
	@Column(name = "sinkchannel")
	private String sinkchannel;

	public String getSinkid() {
		return sinkid;
	}

	public void setSinkid(String sinkid) {
		this.sinkid = sinkid;
	}

	public String getSinkname() {
		return sinkname;
	}

	public void setSinkname(String sinkname) {
		this.sinkname = sinkname;
	}

	public String getSinktype() {
		return sinktype;
	}

	public void setSinktype(String sinktype) {
		this.sinktype = sinktype;
	}

	public String getSinkchannel() {
		return sinkchannel;
	}

	public void setSinkchannel(String sinkchannel) {
		this.sinkchannel = sinkchannel;
	}
}
