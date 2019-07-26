package tc.bank.asda.es.bean;

import java.io.Serializable;

public class PopularRet implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3883089517633431846L;
	/**
	 * 值
	 */
	private String value;
	/**
	 * 所占百分比
	 */
	private float percent;
	/**
	 * 次数
	 */
	private int count;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public float getPercent() {
		return percent;
	}

	public void setPercent(float percent) {
		this.percent = percent;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public PopularRet(String value, float percent, int count) {
		super();
		this.value = value;
		this.percent = percent;
		this.count = count;
	}

	public PopularRet() {
		super();
	}

}
