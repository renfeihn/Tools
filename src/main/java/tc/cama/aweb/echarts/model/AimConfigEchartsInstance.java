package tc.cama.aweb.echarts.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aim_config_echarts_instance")
public class AimConfigEchartsInstance implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7851724206842769814L;
	
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "uid")
	private Integer uid;
	
	/**
	 *实例化Echart的ID
	 */
	@Column(name = "id")
	private int id;
	/**
	 *实例化Echart的名称
	 */
	@Column(name = "name")
	private String name;
	/**
	 *指标ID
	 */
	@Column(name = "tid")
	private String tid;
	/**
	 *指标名称
	 */
	@Column(name = "t_name")
	private String tName;
	/**
	 *线的样式（bar,line,linepool）
	 */
	@Column(name = "e_type")
	private String eType;
	@Column(name = "unit")
	private String unit;
	
	/**
	 *@return 实例化Echart的ID
	 */
	public int getId(){return this.id;}
	/**
	 *@param id 实例化Echart的ID
	 */
	@Column(name = "id")
	public void setId(int id) {this.id = id;}
	/**
	 *@return 实例化Echart的名称
	 */
	public String getName(){return this.name;}
	/**
	 *@param name 实例化Echart的名称
	 */
	@Column(name = "name")
	public void setName(String name) {this.name = name;}
	/**
	 *@return 指标ID
	 */
	public String getTid(){return this.tid;}
	/**
	 *@param tid 指标ID
	 */
	@Column(name = "tid")
	public void setTid(String tid) {this.tid = tid;}
	/**
	 *@return 指标名称
	 */
	public String getTName(){return this.tName;}
	/**
	 *@param tName 指标名称
	 */
	@Column(name = "t_name")
	public void setTName(String tName) {this.tName = tName;}
	/**
	 *@return 线的样式（bar,line,linepool）
	 */
	public String getEType(){return this.eType;}
	/**
	 *@param eType 线的样式（bar,line,linepool）
	 */
	@Column(name = "e_type")
	public void setEType(String eType) {this.eType = eType;}
	/**
	 *@return unit
	 */
	public String getUnit(){return this.unit;}
	/**
	 *@param unit
	 */
	@Column(name = "unit")
	public void setUnit(String unit) {this.unit = unit;}
	/**
	 *@return uid
	 */
	public Integer getUid(){return this.uid;}
	/**
	 *@param uid
	 */
	@Column(name = "uid")
	public void setUid(Integer uid) {this.uid = uid;}

}