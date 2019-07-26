package cn.com.agree.afa.svc.javaengine;

import java.util.Arrays;
import java.util.List;

import cn.com.agree.afa.util.ExceptionUtils;

public class TCResult {
	public static final int STAT_FAILURE = 0;
	public static final int STAT_SUCCESS = 1;
	private int status;
	private String errorCode;
	private String errorMsg;
	private List<?> outputParams;

	public TCResult(int status) {
		this(status, null, null, null);
	}

	public TCResult(int status, String errorCode, String errorMsg) {
		this(status, errorCode, errorMsg, null);
	}

	public TCResult(int status, String errorCode, Throwable e) {
		this(status, errorCode, ExceptionUtils.toDetailString(e), null);
	}

	public TCResult(int status, List<?> outputParams) {
		this(status, null, null, outputParams);
	}

	public TCResult(int status, String errorCode, String errorMsg, List<?> outputParams) {
		this.status = status;
		this.errorCode = errorCode;
		this.errorMsg = errorMsg;
		this.outputParams = outputParams;
	}

	public static TCResult newSuccessResult(Object... outputParams) {
		return new TCResult(1).setOutputParams(outputParams);
	}

	public static TCResult newFailureResult(String errorCode, String errorMsg) {
		return new TCResult(0, errorCode, errorMsg);
	}

	public static TCResult newFailureResult(String errorCode, Throwable e) {
		return new TCResult(0, errorCode, e);
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public List<?> getOutputParams() {
		return outputParams;
	}

	public TCResult setOutputParams(List<?> outputParams) {
		this.outputParams = outputParams;
		return this;
	}

	public TCResult setOutputParams(Object... outputParams) {
		this.outputParams = Arrays.asList(outputParams);
		return this;
	}
}
