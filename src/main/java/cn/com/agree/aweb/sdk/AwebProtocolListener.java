package cn.com.agree.aweb.sdk;

import org.springframework.context.ApplicationContext;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.afa.aim.connector.AppHandlerException;
import cn.com.agree.afa.aim.connector.IProtocolListener;
import cn.com.agree.aweb.util.SpringUtil;

public class AwebProtocolListener implements IProtocolListener {

	@Override
	public String deployDownloadListener(String filename) throws AppHandlerException {
		// 远端请求下载aweb上的文件
		return null;
	}

	@Override
	public void deployUploadListener(boolean deploySuccess, String filename) throws AppHandlerException {
		// 向服务器上传文件的通知
	}

	@Override
	public JSONObject requestListener(String mc, String tc, byte mode, JSONObject content) throws AppHandlerException {
		AimEvent aimEvent = new AimEvent();
		aimEvent.setSync(true);
		aimEvent.setMc(mc);
		aimEvent.setTc(tc);
		JSONObject data = content.getJSONObject("data");
		data = data == null ? content : data;
		aimEvent.setReqData(data);
		aimEvent.setRspData(new JSONObject());
		publishEvent(aimEvent);
		// 返回响应数据
		JSONObject rsp = MessageBuilder.getBuilder().setData(aimEvent.getRspData()).build();
		return rsp;
	}

	@Override
	public void reportListener(String mc, String tc, byte mode, JSONObject content) throws AppHandlerException {
		AimEvent aimEvent = new AimEvent();
		aimEvent.setSync(false);
		aimEvent.setMc(mc);
		aimEvent.setTc(tc);
		JSONObject data = content.getJSONObject("data");
		data = data == null ? content : data;
		aimEvent.setReqData(data);
		aimEvent.setRspData(new JSONObject());
		publishEvent(aimEvent);
	}

	@Override
	public JSONObject controlListener(String mc, String tc, byte mode, JSONObject content) throws AppHandlerException {
		AimEvent aimEvent = new AimEvent();
		aimEvent.setSync(true);
		aimEvent.setMc(mc);
		aimEvent.setTc(tc);
		JSONObject data = content.getJSONObject("data");
		data = data == null ? content : data;
		aimEvent.setReqData(data);
		aimEvent.setRspData(new JSONObject());
		publishEvent(aimEvent);
		// 返回响应数据
		JSONObject rsp = MessageBuilder.getBuilder().setData(aimEvent.getRspData()).build();
		return rsp;
	}

	private void publishEvent(AimEvent aimEvent) {
		ApplicationContext context = SpringUtil.getAppContext();
		if (context == null) {
			return;
		}
		context.publishEvent(aimEvent);
	}

}
