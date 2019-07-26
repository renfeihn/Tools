package tc.cama.aweb.esb.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * AIM_ESB_SYSTEM的POJO
 */
@Table(name = "aim_esb_system")
public class EsbSystem {

	private Long sysId;
	private String sysName;
	private String sysCode;
	private String sysType;
	
	/*
	 * setters
	 */
	
	@Column(name = "sysid", unique = true)
	public void setSysId(Long sysId) {
		this.sysId = sysId;
	}
	
	@Column(name = "sysname")
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	
	@Column(name = "syscode")
	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}
	
	@Column(name = "systype")
	public void setSysType(String sysType) {
		this.sysType = sysType;
	}

	/*
	 * getters
	 */
	
	@Column(name = "sysid", unique = true)
	public Long getSysId() {
		return sysId;
	}

	@Column(name = "sysname")
	public String getSysName() {
		return sysName;
	}

	@Column(name = "syscode")
	public String getSysCode() {
		return sysCode;
	}

	@Column(name = "systype")
	public String getSysType() {
		return sysType;
	}
	
}
