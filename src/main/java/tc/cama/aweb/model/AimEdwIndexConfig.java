package tc.cama.aweb.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aim_edw_index_config")
public class AimEdwIndexConfig implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 *记录ID
	*/
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 *配置分类
	*/
	@Column(name = "cfg_type")
	private String cfgType;
	/**
	 *配置键
	*/
	@Column(name = "cfg_key")
	private String cfgKey;
	/**
	 *配置值
	*/
	@Column(name = "cfg_val")
	private String cfgVal;
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
	 *@return 配置分类
	*/
	public String getCfgType(){
		return this.cfgType;
	}
	/**
	 *@param cfgType 配置分类
	*/
	@Column(name = "cfg_type")
	public void setCfgType(String cfgType) {
		this.cfgType = cfgType;
	}
	/**
	 *@return 配置键
	*/
	public String getCfgKey(){
		return this.cfgKey;
	}
	/**
	 *@param cfgKey 配置键
	*/
	@Column(name = "cfg_key")
	public void setCfgKey(String cfgKey) {
		this.cfgKey = cfgKey;
	}
	/**
	 *@return 配置值
	*/
	public String getCfgVal(){
		return this.cfgVal;
	}
	/**
	 *@param cfgVal 配置值
	*/
	@Column(name = "cfg_val")
	public void setCfgVal(String cfgVal) {
		this.cfgVal = cfgVal;
	}

}
