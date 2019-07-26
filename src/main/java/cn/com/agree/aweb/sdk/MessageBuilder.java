package cn.com.agree.aweb.sdk;

import com.aim.alibaba.fastjson.JSONObject;

public class MessageBuilder {

	public static MessageBuilder getBuilder() {
		return new MessageBuilder();
	}

	private JSONObject head = new JSONObject();
	private JSONObject data = new JSONObject();

	private MessageBuilder() {
	}

	public JSONObject build() {
		JSONObject msg = new JSONObject();
		msg.put("head", head);
		msg.put("data", data);
		return msg;
	}

	public MessageBuilder setData(String name, Object val) {
		data.put(name, val);
		return this;
	}

	public MessageBuilder setData(JSONObject data) {
		if (data != null) {
			this.data.putAll(data);
		}
		return this;
	}

	public MessageBuilder setHead(String name, Object val) {
		head.put(name, val);
		return this;
	}
}
