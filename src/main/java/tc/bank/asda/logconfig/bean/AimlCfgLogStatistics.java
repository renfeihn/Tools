package tc.bank.asda.logconfig.bean;

import java.io.Serializable;
import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogType;

public class AimlCfgLogStatistics implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8497311207569067304L;
	/**
	 * 分类总数
	 */
	private int logTypeCount;
	/**
	 * 日志总数
	 */
	private int logLogCount;
	/**
	 * 分类列表信息
	 */
	private List<AimlCfgLogType> logTypes;

	public int getLogTypeCount() {
		return logTypeCount;
	}

	public void setLogTypeCount(int logTypeCount) {
		this.logTypeCount = logTypeCount;
	}

	public int getLogLogCount() {
		return logLogCount;
	}

	public void setLogLogCount(int logLogCount) {
		this.logLogCount = logLogCount;
	}

	public List<AimlCfgLogType> getLogTypes() {
		return logTypes;
	}

	public void setLogTypes(List<AimlCfgLogType> logTypes) {
		this.logTypes = logTypes;
	}

	public AimlCfgLogStatistics(int logTypeCount, int logLogCount,
			List<AimlCfgLogType> logTypes) {
		super();
		this.logTypeCount = logTypeCount;
		this.logLogCount = logLogCount;
		this.logTypes = logTypes;
	}

	public AimlCfgLogStatistics() {
		super();
	}
	
}
