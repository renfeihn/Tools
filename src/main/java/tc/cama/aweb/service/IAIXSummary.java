package tc.cama.aweb.service;



import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.AIXSummaryBaseInfo;

public interface IAIXSummary {
	/**
	 * 获取AIX汇总页面信息
	 * @return
	 * @throws Exception
	 */
	AIXSummaryBaseInfo getAIXSummaryBaseInfo() throws Exception;
	
    /**
     * 获取事件总览echarts
     * @param time
     * @param interval
     * @return
     */
	Timeline<Integer> getEventViewEcharts(int time,int interval);
}
