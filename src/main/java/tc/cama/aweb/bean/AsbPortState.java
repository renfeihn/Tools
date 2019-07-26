package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.ab.model.AimAbsAgentCur;

public class AsbPortState {
	/**
	 * 实时abs对象
	 */
	private AimAbsAgentCur absCur;
	/**
	 * 端口echarts
	 */
	private Map<String,List<String>> echartsData;
	public AimAbsAgentCur getAbsCur() {
		return absCur;
	}
	public void setAbsCur(AimAbsAgentCur absCur) {
		this.absCur = absCur;
	}
	public Map<String, List<String>> getEchartsData() {
		return echartsData;
	}
	public void setEchartsData(Map<String, List<String>> echartsData) {
		this.echartsData = echartsData;
	}
	
	
}
