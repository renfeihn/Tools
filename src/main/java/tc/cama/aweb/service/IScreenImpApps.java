package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.bean.PageScreenAppRate;

public interface IScreenImpApps {
	
	/**
	 * 
	 * @param time
	 * @param interval
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getTPSEcharts(Integer time, int interval) throws Exception;
	
	/**
	 * 
	 * @param type
	 * @return
	 * @throws Exception
	 */
	PageScreenAppRate getAppRates(Integer type) throws Exception;
	
	/**
	 * tps实时数据
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getCurrTPSEcharts() throws Exception;
}
