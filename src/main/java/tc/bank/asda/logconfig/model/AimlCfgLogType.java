package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
/**
 * 日志分类表
 * @author parry
 *
 */
@Entity
@Table(name = "aiml_cfg_log_type")
public class AimlCfgLogType implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -427835474501537602L;

	/**
	 * 主键ID
	 */
	@Column(name ="typeid")
	private long typeId;
	
	@Column(name = "typename")
	private String typeName;

	public long getTypeId() {
		return typeId;
	}

	public void setTypeId(long typeId) {
		this.typeId = typeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
}
