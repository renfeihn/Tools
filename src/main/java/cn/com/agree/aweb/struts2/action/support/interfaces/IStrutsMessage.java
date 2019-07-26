/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support.interfaces;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes;

/**
 * StrutsMessage接口
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年10月26日
 */
public interface IStrutsMessage {
	public IStrutsMessage addParameter(String key,Object value);
	public IStrutsMessage addErrorMsg(String errorMsg);
	public IStrutsMessage successMessage();
	public IStrutsMessage successMessage(JSONObject content);
	public IStrutsMessage errorMessage(String errorMsg);
	public IStrutsMessage errorMessage(ExceptionTypes.AWEB aweb, Throwable e);
}
