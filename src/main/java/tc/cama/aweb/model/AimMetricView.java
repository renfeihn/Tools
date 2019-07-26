package tc.cama.aweb.model;

import javax.persistence.Column;

/**
 * 
 * 监控指标视图
 *
 */
public class AimMetricView extends AbstractDataModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 指标ID
	 */
	@Column(name = "id")
	private Long metricId;
	
	/**
	 * 指标分组(大类)
	 */
	@Column(name = "metric_grp")
	private String metricGroup;
	
	/**
	 * 指标分组(小类)
	 */
	@Column(name = "metric_subgrp")
	private String metricSubGroup;
	
	/**
	 * 指标分类
	 */
	@Column(name = "category")
	private String category;
	
	/**
	 * 指标分类名称
	 */
	@Column(name = "metric_grpname")
	private String categoryName;

	/**
	 * 指标项
	 */
	@Column(name = "item")
	private String item;
	
	/**
	 * 指标名称
	 */
	@Column(name = "display_name")
	private String metricName;
	
	/**
	 * 指标单位
	 */
	@Column(name = "unit")
	private String unit;

	public void setMetricId(Long metricId) {
		this.metricId = metricId;
	}

	public void setMetricGroup(String metricGroup) {
		this.metricGroup = metricGroup;
	}

	public void setMetricSubGroup(String metricSubGroup) {
		this.metricSubGroup = metricSubGroup;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getMetricId() {
		return metricId;
	}

	public String getMetricGroup() {
		return metricGroup;
	}

	public String getMetricSubGroup() {
		return metricSubGroup;
	}

	public String getCategory() {
		return category;
	}

	public String getItem() {
		return item;
	}

	public String getMetricName() {
		return metricName;
	}

	public String getUnit() {
		return unit;
	}
	
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	@Override
	public String toString() {

		StringBuilder builder = new StringBuilder();
		
		builder.append("metricId = ").append(this.metricId).append("\n");
		builder.append("metricGroup = ").append(this.metricGroup).append("\n");
		builder.append("metricSubGroup = ").append(this.metricSubGroup).append("\n");
		builder.append("category = ").append(this.category).append("\n");
		builder.append("item = ").append(this.item).append("\n");
		builder.append("metricName = ").append(this.metricName).append("\n");
		builder.append("unit = ").append(this.unit).append("\n");
		builder.append("categoryName = ").append(this.categoryName).append("\n");
		
		return builder.toString();
	}
}
