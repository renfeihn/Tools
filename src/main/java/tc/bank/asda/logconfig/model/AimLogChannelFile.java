package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_channel_file")
public class AimLogChannelFile implements Serializable {
	private static final long serialVersionUID = 9117191978884617093L;
	/**
	 * 渠道ID
	 */
	@Column(name = "channelid")
	private String channelid;
	
	/**
	 * 检查点目录（绝对路径）
	 */
	@Column(name = "filecheckpointdir")
	private String filecheckpointdir;
	
	/**
	 * 数据目录（绝对路径）
	 */
	@Column(name = "filedatadir")
	private String filedatadir;

	public String getChannelid() {
		return channelid;
	}

	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	public String getFilecheckpointdir() {
		return filecheckpointdir;
	}

	public void setFilecheckpointdir(String filecheckpointdir) {
		this.filecheckpointdir = filecheckpointdir;
	}

	public String getFiledatadir() {
		return filedatadir;
	}

	public void setFiledatadir(String filedatadir) {
		this.filedatadir = filedatadir;
	}
	
}
