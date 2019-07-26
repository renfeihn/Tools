package tc.cama.aweb.service;

import java.util.Map;

public interface ISummaryAPM {
	/**
	 * 获取最后一个点的数据
	 * 
	 * @param appId
	 * @param timeBlock
	 * @return
	 * @throws Exception
	 */
	Map<String, Map<String, Object>> getLastEchartsData(Long appId,
			int timeBlock) throws Exception;

	/**
	 * 获取echartsData
	 * 
	 * @param appId
	 * @param timeBlock
	 * @return
	 * @throws Exception
	 */
	Map<String, Map<String, Object>> getEchartsData(Long appId, int timeBlock)
			throws Exception;
}
