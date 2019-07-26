package tc.bank.cama.core.bean;

import tc.bank.cama.core.module.AimConfigMetric;

public class AimMerticConfigView {
	AimConfigMetric aimConfigMetric;
	private String metricName;
	private String categoryName;
	
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	private String type;
	
	
	public AimConfigMetric getAimConfigMetric() {
		return aimConfigMetric;
	}
	public void setAimConfigMetric(AimConfigMetric aimConfigMetric) {
		this.aimConfigMetric = aimConfigMetric;
	}
	public String getMetricName() {
		return metricName;
	}
	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}
}
