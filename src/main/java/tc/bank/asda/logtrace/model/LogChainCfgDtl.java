package tc.bank.asda.logtrace.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_log_chain_cfg_dtl")
public class LogChainCfgDtl implements Serializable {
	/**
	 * 链路配置表
	 */
	private static final long serialVersionUID = 7022602263594153365L;
	
	@Column(name = "id")
	private int id;
	
	@Column(name = "fields_id")
	private int fieldsId;
	
	@Column(name = "from_field")
	private String fromField;
	
	@Column(name = "to_field")
	private String toField;
	
	@Column(name = "create_time")
	private String createTime;
	
	@Column(name = "update_time")
	private String updateTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getFieldsId() {
		return fieldsId;
	}

	public void setFieldsId(int fieldsId) {
		this.fieldsId = fieldsId;
	}

	public String getFromField() {
		return fromField;
	}

	public void setFromField(String fromField) {
		this.fromField = fromField;
	}

	public String getToField() {
		return toField;
	}

	public void setToField(String toField) {
		this.toField = toField;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public String toString() {
		return "LogChainCfgDtl [id=" + id + ", fieldsId=" + fieldsId
				+ ", fromField=" + fromField + ", toField=" + toField
				+ ", createTime=" + createTime + ", updateTime=" + updateTime
				+ "]";
	}
	
}
