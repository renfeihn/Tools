package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
/**
 * 5分钟统计信息
 * @author zhangkun
 *
 */
public class FiveStates {
	/*
	 * 5分钟响应率
	 */

	private Map<String, List<String>> fiveRspRate;
	/*
	 * 5分钟成功率
	 */

	private Map<String, List<String>> fiveSussRate;
	/*
	 * 5分钟响应时间
	 */

	private Map<String, List<String>> fiveRspTime;

	public Map<String, List<String>> getFiveRspRate() {
		return fiveRspRate;
	}

	public void setFiveRspRate(Map<String, List<String>> fiveRspRate) {
		this.fiveRspRate = fiveRspRate;
	}

	public Map<String, List<String>> getFiveSussRate() {
		return fiveSussRate;
	}

	public void setFiveSussRate(Map<String, List<String>> fiveSussRate) {
		this.fiveSussRate = fiveSussRate;
	}

	public Map<String, List<String>> getFiveRspTime() {
		return fiveRspTime;
	}

	public void setFiveRspTime(Map<String, List<String>> fiveRspTime) {
		this.fiveRspTime = fiveRspTime;
	}

}
