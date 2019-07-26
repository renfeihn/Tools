package tc.bank.common.core;

import java.io.Serializable;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class Timeline<Y> implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8660354606689328941L;

	/**
	 * 时间
	 */
	private List<Date> times = Collections.emptyList();

	/**
	 * 数据
	 */
	private List<List<Y>> datas = Collections.emptyList();

	/**
	 * 名称
	 */
	private List<String> alias = Collections.emptyList();

	/**
	 * 单位
	 */
	private String unit;

	private Date x;

	private Y y;

	public List<Date> getTimes() {
		return times;
	}

	public void setTimes(List<Date> times) {
		this.times = times;
	}

	public List<List<Y>> getDatas() {
		return datas;
	}

	public void setDatas(List<List<Y>> datas) {
		this.datas = datas;
	}

	public List<String> getAlias() {
		return alias;
	}

	public void setAlias(List<String> alias) {
		this.alias = alias;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Date getX() {
		return x;
	}

	public void setX(Date x) {
		this.x = x;
	}

	public Y getY() {
		return y;
	}

	public void setY(Y y) {
		this.y = y;
	}

}
