package cn.com.agree.aweb.util;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.core.Timeline;
import tc.bank.common.utils.TimelineUtils;

public class EchartsUtils {

	public static <Y> StrutsMessage setEchartsData(StrutsMessage msg, Timeline<Y> timeline) {
		JSONObject data = TimelineUtils.toEchartsData(timeline);
		msg.addParameter(TimelineUtils.ECHARTS_DATA, data);
		return msg;
	}

}
