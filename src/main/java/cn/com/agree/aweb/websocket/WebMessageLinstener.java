package cn.com.agree.aweb.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

import cn.com.agree.aweb.sdk.AimEvent;

import com.aim.alibaba.fastjson.JSONObject;

@Service
public class WebMessageLinstener implements ApplicationListener<AimEvent> {

	private Logger LOGGRE = LoggerFactory.getLogger(WebMessageLinstener.class);

	@Override
	public void onApplicationEvent(AimEvent aimEvent) {
		JSONObject eventData = aimEvent.getReqData();
		LOGGRE.debug("eventData: {}", eventData);
		WebSocketPushService.asyncPushToAllClients(eventData.toJSONString());
	}

}
