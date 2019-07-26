package tc.cama.aweb.service;



import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.LINUXSummaryBaseInfo;

public interface ILINUXSummary {
	/**
	 * 获取linux汇总页面信息
	 * @return
	 * @throws Exception
	 */
	LINUXSummaryBaseInfo getLINUXSummaryBaseInfo() throws Exception;
	
    /**
     * 获取事件总览echarts
     * @param time
     * @param interval
     * @return
     */
	Timeline<Integer> getEventViewEcharts(int time,int interval);
}
