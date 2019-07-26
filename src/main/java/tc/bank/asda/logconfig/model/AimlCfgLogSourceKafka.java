package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_log_source_kafka")
public class AimlCfgLogSourceKafka extends AimlCfgLogSourceBasic implements
		Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 日志配置ID
	 */
	@Column(name = "sourceid")
	private long sourceId;
	/**
	 * kakfa地址
	 */
	@Column(name = "host")
	private String host;
	/**
	 * kafka消费者组名
	 */
	@Column(name = "group_id")
	private String groupId;
	/**
	 * kakfa主题
	 */
	@Column(name = "topic")
	private String topic;
	/**
	 * 每批读取大小
	 * 
	 * @return
	 */
	@Column(name = "batch_size")
	private String batchSize;

	public long getSourceId() {
		return sourceId;
	}

	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(String batchSize) {
		this.batchSize = batchSize;
	}
}
