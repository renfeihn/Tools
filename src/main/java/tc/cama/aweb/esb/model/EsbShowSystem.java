package tc.cama.aweb.esb.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * AIM_ESB_SHOWSYSTEM的POJO
 * @author Win-User
 *
 */

@Table(name = "aim_esb_showsystem")
public class EsbShowSystem {
	private String sysCode;
	private String sysName;
	
	/**
	 * getters
	 * @return
	 */
	@Column(name = "syscode", unique = true)
	public String getSysCode() {
		return sysCode;
	}
	
	@Column(name = "sysname", unique = true)
	public String getSysName() {
		return sysName;
	}
	
	
	/**
	 * setters
	 * @param sysCode
	 */
	@Column(name = "syscode", unique = true)
	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}
	
	@Column(name = "sysname", unique = true)
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	
	
}
