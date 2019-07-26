package tc.cama.aweb.service;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.PageOracleSummary;

public interface IOracleSummary {
	
	/**
	 * 获取oracle汇总页面信息
	 * @return
	 * @throws Exception
	 */
	PageOracleSummary getOracleSummaryInfo() throws Exception;
	
    /**
     * 获取事件总览echarts
     * @param time
     * @param interval
     * @return
     */
	Timeline<Integer> getEventViewEcharts(int time,int interval);

}
