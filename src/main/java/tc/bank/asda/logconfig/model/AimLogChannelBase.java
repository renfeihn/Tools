package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_channel")
public class AimLogChannelBase implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3862190575767993332L;
	
	/**
	 * 渠道ID
	 */
	@Column(name = "channelid")
	private String channelid;
	
	/**
	 * 渠道名称
	 */
	@Column(name = "channelname")
	private String channelname;
	
	/**
	 * 对象ID
	 */
	@Column(name = "objectid")
	private String objectid;
	
	/**
	 * 通道类型
	 */
	@Column(name = "channeltype")
	private String channeltype;
	
	/**
	 * 通道容量大小
	 */
	@Column(name = "channelcapacity")
	private long channelcapacity;
	
	/**
	 * 事务容量大小
	 */
	@Column(name = "channeltransactioncapacity")
	private long channeltransactioncapacity;

	public String getChannelid() {
		return channelid;
	}

	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	public String getChannelname() {
		return channelname;
	}

	public void setChannelname(String channelname) {
		this.channelname = channelname;
	}

	public String getChanneltype() {
		return channeltype;
	}

	public void setChanneltype(String channeltype) {
		this.channeltype = channeltype;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getObjectid() {
		return objectid;
	}

	public void setObjectid(String objectid) {
		this.objectid = objectid;
	}

	public long getChannelcapacity() {
		return channelcapacity;
	}

	public void setChannelcapacity(long channelcapacity) {
		this.channelcapacity = channelcapacity;
	}

	public long getChanneltransactioncapacity() {
		return channeltransactioncapacity;
	}

	public void setChanneltransactioncapacity(long channeltransactioncapacity) {
		this.channeltransactioncapacity = channeltransactioncapacity;
	}
	
	
}
