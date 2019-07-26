package tc.cama.aweb.service;

import tc.bank.common.core.Timeline;
import tc.cama.aweb.bean.MQBaseInfo;

/**
 * MQ二级汇总交易
 * 
 * @author dai
 * 
 */
public interface IMQSecondarySum {

	/**
	 * MQ二级汇总交易基础信息
	 * 
	 * @param objId
	 * @return
	 * @throws Exception 
	 */
	public MQBaseInfo getMQBaseInfo() throws Exception;
	/**
     * 获取事件总览echarts
     * @param time
     * @param interval
     * @return
     */
	Timeline<Integer> getEventViewEcharts(int time, int interval);

}
