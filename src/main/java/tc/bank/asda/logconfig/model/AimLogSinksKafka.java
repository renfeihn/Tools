package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_sinks_kafka")
public class AimLogSinksKafka implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8920846086595288497L;
	
	/**
	 * 转发对象ID
	 */
	@Column(name = "sinkid")
	private String sinkid;
	
	/**
	 * kafka主题
	 */
	@Column(name = "kafkatopic")
	private String kafkatopic;
	
	/**
	 * kafka地址
	 */
	@Column(name = "kafkaaddr")
	private String kafkaaddr;
	
	/**
	 * kafka打包笔数
	 */
	@Column(name = "kafkabatchsize")
	private long  kafkabatchsize;
	
	/**
	 * 收妥确认标识
	 */
	@Column(name = "kafkarequiredacks")
	private String kafkarequiredacks;

	public String getSinkid() {
		return sinkid;
	}

	public void setSinkid(String sinkid) {
		this.sinkid = sinkid;
	}

	public String getKafkatopic() {
		return kafkatopic;
	}

	public void setKafkatopic(String kafkatopic) {
		this.kafkatopic = kafkatopic;
	}

	public String getKafkaaddr() {
		return kafkaaddr;
	}

	public void setKafkaaddr(String kafkaaddr) {
		this.kafkaaddr = kafkaaddr;
	}

	public long getKafkabatchsize() {
		return kafkabatchsize;
	}

	public void setKafkabatchsize(long kafkabatchsize) {
		this.kafkabatchsize = kafkabatchsize;
	}

	public String getKafkarequiredacks() {
		return kafkarequiredacks;
	}

	public void setKafkarequiredacks(String kafkarequiredacks) {
		this.kafkarequiredacks = kafkarequiredacks;
	}
}
