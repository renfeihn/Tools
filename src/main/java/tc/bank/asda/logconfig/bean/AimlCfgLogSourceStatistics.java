package tc.bank.asda.logconfig.bean;

import java.io.Serializable;
import java.util.Map;

public class AimlCfgLogSourceStatistics implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -281657492632495998L;

	/**
	 * 日志源分类数
	 */
	private int souurceTypeCount;
	
	/**
	 * 日志数
	 */
	private int logCount;
	/**
	 * 服务器数
	 */
	private int serverCount;
	/**
	 * 应用数
	 */
	private int applicationCount;
	
	/**
	 * 日志源名称和日志数量
	 */
	Map<String,Integer> sources;

	public int getSouurceTypeCount() {
		return souurceTypeCount;
	}

	public void setSouurceTypeCount(int souurceTypeCount) {
		this.souurceTypeCount = souurceTypeCount;
	}

	public int getLogCount() {
		return logCount;
	}

	public void setLogCount(int logCount) {
		this.logCount = logCount;
	}

	public int getServerCount() {
		return serverCount;
	}

	public void setServerCount(int serverCount) {
		this.serverCount = serverCount;
	}

	public int getApplicationCount() {
		return applicationCount;
	}

	public void setApplicationCount(int applicationCount) {
		this.applicationCount = applicationCount;
	}

	public Map<String, Integer> getSources() {
		return sources;
	}

	public void setSources(Map<String, Integer> sources) {
		this.sources = sources;
	}
}
