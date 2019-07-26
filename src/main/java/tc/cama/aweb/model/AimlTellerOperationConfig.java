package tc.cama.aweb.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aiml_teller_operation_config")
public class AimlTellerOperationConfig implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -1948242821874089780L;
	/**
	 *记录ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 *操作名称
	 */
	@Column(name = "name")
	private String name;
	/**
	 *操作描述
	 */
	@Column(name = "description")
	private String description;
	/**
	 *@return 记录ID
	 */
	public Integer getId(){
		return this.id;
	}
	/**
	 *@param id 记录ID
	 */
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 *@return 操作名称
	 */
	public String getName(){
		return this.name;
	}
	/**
	 *@param name 操作名称
	 */
	@Column(name = "name")
	public void setName(String name) {
		this.name = name;
	}
	/**
	 *@return 操作描述
	 */
	public String getDescription(){
		return this.description;
	}
	/**
	 *@param description 操作描述
	 */
	@Column(name = "description")
	public void setDescription(String description) {
		this.description = description;
	}

}