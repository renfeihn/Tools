package tc.bank.asda.app.bean;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.asda.app.model.AppStatisticBean;

public class AppStatisticRet extends AppStatisticBean{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8750839153350111798L;

	private JSONObject statis;

	public JSONObject getStatis() {
		return statis;
	}

	public void setStatis(JSONObject statis) {
		this.statis = statis;
	}
	
}
