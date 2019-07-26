package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.esb.model.EsbMonMS;


/**
 * 应用概览-APM性能模块
 * @author Win-User
 *
 */
public class PageAppAPMView {

	
	private Map<String, List<String>> echartsData; 
	
	//当前点的交易信息(包含当日累计)
	private EsbMonMS currentMs;
	
	//昨日同比
	private String percentTradeChanged;
	

	public EsbMonMS getCurrentMs() {
		return currentMs;
	}

	public String getPercentTradeChanged() {
		return percentTradeChanged;
	}


	public void setCurrentMs(EsbMonMS currentMs) {
		this.currentMs = currentMs;
	}

	public void setPercentTradeChanged(String percentTradeChanged) {
		this.percentTradeChanged = percentTradeChanged;
	}

	public Map<String, List<String>> getEchartsData() {
		return echartsData;
	}

	public void setEchartsData(Map<String, List<String>> echartsData) {
		this.echartsData = echartsData;
	}

	
	
	
	
}
