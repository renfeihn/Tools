package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_channel_kafka")
public class AimLogChannelKafka implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -351609896051921023L;
	
	/**
	 * 通道ID
	 */
	@Column(name = "channelid")
	private String channelid;
	
	/**
	 * kafka主题
	 */
	@Column(name = "topic")
	private String topic;
	
	/**
	 * kafka集群列表，逗号分隔
	 */
	@Column(name = "brokerlist")
	private String brokerlist;
	
	/**
	 * zookeeper路径
	 */
	@Column(name = "zookeeperconnect")
	private String zookeeperconnect;

	public String getChannelid() {
		return channelid;
	}

	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getBrokerlist() {
		return brokerlist;
	}

	public void setBrokerlist(String brokerlist) {
		this.brokerlist = brokerlist;
	}

	public String getZookeeperconnect() {
		return zookeeperconnect;
	}

	public void setZookeeperconnect(String zookeeperconnect) {
		this.zookeeperconnect = zookeeperconnect;
	}
}
