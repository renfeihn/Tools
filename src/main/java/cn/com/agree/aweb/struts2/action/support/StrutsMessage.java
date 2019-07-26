package cn.com.agree.aweb.struts2.action.support;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.struts2.action.support.bean.CommSerialBean;
import cn.com.agree.aweb.struts2.action.support.bean.SerialBean;

/**
 * 
 *
 * @author lihao lihao01@cfischina.com Aug 3, 2015
 */
public class StrutsMessage implements Serializable {

	private static final long serialVersionUID = -3831797881796577143L;

	private boolean status;

	private String errorMsg;

	private List<String> errorMsgList;

	private JSONObject content;

	private String exceptionInfo;

	private Object uids;

	private String seriaNo;

	private List<CommSerialBean> commList;

	@SuppressWarnings("unused")
	private StrutsMessage() {
		this(false);
	}

	public StrutsMessage(boolean status) {
		this(status, null);
	}

	public StrutsMessage(SerialBean serialBean) {
		this.seriaNo = serialBean.getSerialNo();
		this.commList = serialBean.getCommSerial();
	}

	public StrutsMessage(boolean status, String errorMsg) {
		this.status = status;
		this.errorMsg = errorMsg;

		RequestAttributes rattri = RequestContextHolder.getRequestAttributes();
		if (rattri instanceof ServletRequestAttributes) {
			HttpServletRequest req = ((ServletRequestAttributes) rattri).getRequest();
			Object uids = req.getAttribute("svruids");
			if (uids == null) {
				uids = new ArrayList<String>();
				req.setAttribute("svruids", uids);
			}
			this.uids = uids;
		}
	}

	public boolean isStatus() {
		return status;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public JSONObject getContent() {
		return content;
	}

	public void setContent(JSONObject content) {
		this.content = content;
	}

	public List<String> getErrorMsgList() {
		return errorMsgList;
	}

	/**
	 * 添加返回参数
	 * 
	 * @param key
	 * @param value
	 */
	public StrutsMessage addParameter(String key, Object value) {
		if (this.content == null) {
			this.content = new JSONObject();
		}
		this.content.put(key, value);
		return this;
	}

	/**
	 * 增加错误信息
	 * 
	 * @param errorMsg
	 * @return
	 */
	public StrutsMessage addErrorMsg(String errorMsg) {
		if (errorMsgList == null)
			errorMsgList = new ArrayList<String>();
		if (status)
			status = false;

		errorMsgList.add(errorMsg);

		return this;
	}

	/**
	 * 获取成功消息
	 * 
	 * @return
	 */
	public static StrutsMessage successMessage() {
		return successMessage(null);
	}

	/**
	 * 获取成功消息
	 * 
	 * @param content
	 * @return
	 */
	public static StrutsMessage successMessage(JSONObject content) {
		StrutsMessage message = new StrutsMessage(true);
		message.setContent(content == null ? new JSONObject() : content);
		return message;
	}

	/**
	 * 获取失败消息
	 * 
	 * @param errorMsg
	 * @return
	 */
	public static StrutsMessage errorMessage(String errorMsg) {
		return new StrutsMessage(false, errorMsg);
	}

	/**
	 * 获取失败消息
	 * 
	 * @param aweb
	 * @param e
	 * @return
	 */
	public static StrutsMessage errorMessage(ExceptionTypes.AWEB aweb, Throwable e) {
		if (aweb == ExceptionTypes.AWEB.AWEB99 && e != null) {
			return new StrutsMessage(false, e.getMessage());
		}
		return new StrutsMessage(false, aweb.getErrorMsg());
	}

	/**
	 * 获取string
	 * 
	 * @return
	 */
	public String jsonString() {
		return JSONObject.toJSONString(this);
	}

	public String getExceptionInfo() {
		return exceptionInfo;
	}

	public void setExceptionInfo(String exceptionInfo) {
		this.exceptionInfo = exceptionInfo;
	}

	public Object getUids() {
		return uids;
	}
	public String getSeriaNo() {
		return seriaNo;
	}
	public void setSeriaNo(String seriaNo) {
		this.seriaNo = seriaNo;
	}
	public List<CommSerialBean> getCommList() {
		return commList;
	}

	public void setCommList(List<CommSerialBean> commList) {
		this.commList = commList;
	}

}
