package tc.cama.aweb.bean;

import java.util.List;

public class FiveComper {
	/**
	 * 交易量
	 */
	List<String> trance;
	/**
	 * 响应率
	 */
	List<String> rspRate;
	/**
	 * 成功率
	 */
	List<String> susRate;
	/**
	 * TPS
	 */
	List<String> TPS;
	/**
	 * 响应时间
	 */
	List<String> rspTime;

	public List<String> getTrance() {
		return trance;
	}

	public void setTrance(List<String> trance) {
		this.trance = trance;
	}

	public List<String> getRspRate() {
		return rspRate;
	}

	public void setRspRate(List<String> rspRate) {
		this.rspRate = rspRate;
	}

	public List<String> getSusRate() {
		return susRate;
	}

	public void setSusRate(List<String> susRate) {
		this.susRate = susRate;
	}

	public List<String> getTPS() {
		return TPS;
	}

	public void setTPS(List<String> tPS) {
		TPS = tPS;
	}

	public List<String> getRspTime() {
		return rspTime;
	}

	public void setRspTime(List<String> rspTime) {
		this.rspTime = rspTime;
	}

}
