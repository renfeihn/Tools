package tc.cama.aweb.esb.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "esb_mon_nmap")
public class EsbMonNmap {

	private String id;
	private String monObj;
	private String monName;

	@Column(name = "id", unique = true)
	public String getId() {
		return id;
	}

	@Column(name = "mon_obj")
	public String getMonObj() {
		return monObj;
	}

	@Column(name = "mon_name")
	public String getMonName() {
		return monName;
	}

	@Column(name = "id", unique = true)
	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "mon_obj")
	public void setMonObj(String monObj) {
		this.monObj = monObj;
	}

	@Column(name = "mon_name")
	public void setMonName(String monName) {
		this.monName = monName;
	}

	@Override
	public String toString() {
		return "ESBMonNmap [id=" + id + ", monObj=" + monObj + ", monName=" + monName + "]";
	}
	
}
