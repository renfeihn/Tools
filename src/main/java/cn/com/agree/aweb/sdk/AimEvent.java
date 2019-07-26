package cn.com.agree.aweb.sdk;

import org.springframework.context.ApplicationEvent;

import com.aim.alibaba.fastjson.JSONObject;

public class AimEvent extends ApplicationEvent {
	/**
	 * 
	 */
	private static final long serialVersionUID = -928744651721673749L;
	/**
	 * 同步消息
	 */
	private boolean sync = true;
	private String mc = null;
	private String tc = null;
	/**
	 * 请求数据
	 */
	private JSONObject reqData;
	/**
	 * 响应数据
	 */
	private JSONObject rspData;

	public AimEvent() {
		this(null);
	}

	public AimEvent(Object source) {
		super(source);
	}

	public boolean isSync() {
		return sync;
	}

	public void setSync(boolean sync) {
		this.sync = sync;
	}

	public String getMc() {
		return mc;
	}

	public void setMc(String mc) {
		this.mc = mc;
	}

	public String getTc() {
		return tc;
	}

	public void setTc(String tc) {
		this.tc = tc;
	}

	public JSONObject getReqData() {
		return reqData;
	}

	public void setReqData(JSONObject reqData) {
		this.reqData = reqData;
	}

	public JSONObject getRspData() {
		return rspData;
	}

	public void setRspData(JSONObject rspData) {
		this.rspData = rspData;
	}

}
