package cn.com.agree.aim4.core.utils;

import cn.com.agree.afa.svc.javaengine.TCResult;

public class ServiceFailException extends RuntimeException {

	private static final long serialVersionUID = -6378992732951347682L;

	private TCResult result;

	public ServiceFailException() {
		super();
		this.result = new TCResult(0);
	}

	public ServiceFailException(int status) {
		super();
		this.result = new TCResult(status);
	}

	public ServiceFailException(int status, String errorCode, String errorMsg) {
		super(errorCode + " " + Objects.toString(errorMsg, "未知错误,请查看日志."));
		this.result = new TCResult(status, errorCode, errorMsg);
	}

	public ServiceFailException(TCResult result) {
		super(result.getErrorCode() + " " + Objects.toString(result.getErrorMsg(), "未知错误,请查看日志."));
		this.result = result;
	}

	public ServiceFailException(String message) {
		super(message);
		this.result = new TCResult(0, null, message);
	}

	public ServiceFailException(String message, Throwable cause) {
		super(message, cause);
		this.result = new TCResult(0, null, cause);
	}

	public ServiceFailException(Throwable cause) {
		super(cause);
		this.result = new TCResult(0, null, cause);
	}

	public TCResult getResult() {
		return result;
	}

}
