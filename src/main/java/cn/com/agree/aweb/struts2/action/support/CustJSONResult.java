package cn.com.agree.aweb.struts2.action.support;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONResult;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.serializer.SerializerFeature;

public class CustJSONResult extends JSONResult {

	private static final long serialVersionUID = -1272234954237149122L;

	protected String createJSONString(HttpServletRequest request, Object rootObject) throws JSONException {
		String json = JSON.toJSONString(rootObject,SerializerFeature.DisableCircularReferenceDetect);
		json = addCallbackIfApplicable(request, json);
		return json;
	}

}
