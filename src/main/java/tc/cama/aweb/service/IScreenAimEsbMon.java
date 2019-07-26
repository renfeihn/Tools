package tc.cama.aweb.service;

import java.util.Map;

public interface IScreenAimEsbMon {
	/**
	 * 根据系统码查询所有系统的各项指标
	 * @param  objIds
	 * @return
	 */
	Map<String,Object> getAppSummary(String objIds) throws Exception;

}
