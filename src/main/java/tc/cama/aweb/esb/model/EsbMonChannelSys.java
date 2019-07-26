package tc.cama.aweb.esb.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aim_esb_mon_nmap")
public class EsbMonChannelSys {

	private String channelId;
	private String monObj;
	private String monName;

	@Column(name = "Channel_Id", unique = true)
	public String getChannelId() {
		return channelId;
	}

	@Column(name = "Mon_Obj", unique = true)
	public String getMonObj() {
		return monObj;
	}

	@Column(name = "Mon_Name", unique = true)
	public String getMonName() {
		return monName;
	}

	@Column(name = "Channel_Id", unique = true)
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	@Column(name = "Mon_Obj", unique = true)
	public void setMonObj(String monObj) {
		this.monObj = monObj;
	}

	@Column(name = "Mon_Name", unique = true)
	public void setMonName(String monName) {
		this.monName = monName;
	}

	@Override
	public String toString() {
		return "EsbMonChannelSyscode [channelId=" + channelId + ", monObj=" + monObj + ", monName=" + monName + "]";
	}

}
