package tc.bank.asda.etl.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_etl_task_field_mapping")
public class AimlEtlTaskFieldMapping implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 应用系统
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 应用系统
	 */
	@Column(name = "task_id")
	private int task_id;
	/**
	 * 源字段
	 */
	@Column(name = "source_filed")
	private String source_filed;
	/**
	 * 目标字段
	 */
	@Column(name = "target_filed")
	private String target_filed;
	/**
	 * 目标字段
	 */
	@Column(name = "filed_type")
	private String filedTpype;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	public String getSource_filed() {
		return source_filed;
	}
	public void setSource_filed(String source_filed) {
		this.source_filed = source_filed;
	}
	public String getTarget_filed() {
		return target_filed;
	}
	public void setTarget_filed(String target_filed) {
		this.target_filed = target_filed;
	}
	public String getFiledTpype() {
		return filedTpype;
	}
	public void setFiledTpype(String filedTpype) {
		this.filedTpype = filedTpype;
	}
	
}