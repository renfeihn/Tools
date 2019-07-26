package tc.cama.aweb.echarts.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aim_config_echarts_style")
public class AimConfigEchartsStyle implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 *序号 由系统自动生成
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 *名称 样式名称解释
	 */
	@Column(name = "name")
	private String name;
	/**
	 *Echart属性
	 */
	@Column(name = "grid")
	private String grid;
	/**
	 *Echart属性
	 */
	@Column(name = "tooltip")
	private String tooltip;
	/**
	 *Echart属性
	 */
	@Column(name = "legend")
	private String legend;
	/**
	 *Echart属性
	 */
	@Column(name = "xaxis")
	private String xaxis;
	/**
	 *Echart属性
	 */
	@Column(name = "yaxis")
	private String yaxis;
	/**
	 *Echart属性
	 */
	@Column(name = "title")
	private String title;
	/**
	 *Echart属性
	 */
	@Column(name = "color")
	private String color;
	/**
	 *@return 序号 由系统自动生成
	 */
	public Integer getId(){return this.id;}
	/**
	 *@param id 序号 由系统自动生成
	 */
	@Column(name = "id")
	public void setId(Integer id) {this.id = id;}
	/**
	 *@return 名称 样式名称解释
	 */
	public String getName(){return this.name;}
	/**
	 *@param name 名称 样式名称解释
	 */
	@Column(name = "name")
	public void setName(String name) {this.name = name;}
	/**
	 *@return Echart属性
	 */
	public String getGrid(){return this.grid;}
	/**
	 *@param grid Echart属性
	 */
	@Column(name = "grid")
	public void setGrid(String grid) {this.grid = grid;}
	/**
	 *@return Echart属性
	 */
	public String getTooltip(){return this.tooltip;}
	/**
	 *@param tooltip Echart属性
	 */
	@Column(name = "tooltip")
	public void setTooltip(String tooltip) {this.tooltip = tooltip;}
	/**
	 *@return Echart属性
	 */
	public String getLegend(){return this.legend;}
	/**
	 *@param legend Echart属性
	 */
	@Column(name = "legend")
	public void setLegend(String legend) {this.legend = legend;}
	/**
	 *@return Echart属性
	 */
	public String getXaxis(){return this.xaxis;}
	/**
	 *@param xaxis Echart属性
	 */
	@Column(name = "xaxis")
	public void setXaxis(String xaxis) {this.xaxis = xaxis;}
	/**
	 *@return Echart属性
	 */
	public String getYaxis(){return this.yaxis;}
	/**
	 *@param yaxis Echart属性
	 */
	@Column(name = "yaxis")
	public void setYaxis(String yaxis) {this.yaxis = yaxis;}
	/**
	 *@return Echart属性
	 */
	public String getTitle(){return this.title;}
	/**
	 *@param title Echart属性
	 */
	@Column(name = "title")
	public void setTitle(String title) {this.title = title;}
	/**
	 *@return Echart属性
	 */
	public String getColor(){return this.color;}
	/**
	 *@param color Echart属性
	 */
	@Column(name = "color")
	public void setColor(String color) {this.color = color;}

}
