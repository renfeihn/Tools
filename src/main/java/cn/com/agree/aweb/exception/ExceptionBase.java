package cn.com.agree.aweb.exception;

/**
 * 自定义异常，增加errorCode
 * 映射关系可查看docs/异常字典.txt
 * 
 * @author lihao lihao01@cfischina.com
 * Jul 29, 2015
 */
public class ExceptionBase extends Exception {

	private static final long serialVersionUID = -8711628207950263817L;
	
	private String errorCode;
	private String errorMsg;
	private Throwable cause;
	
	public ExceptionBase() {
		super();
	}
	
	public ExceptionBase(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public ExceptionBase(Throwable cause) {
		this.cause = cause;
	}
	
	public ExceptionBase(String errorMsg, String errorCode) {
		this.errorMsg = errorMsg;
		this.errorCode = errorCode;
	}
	
	public ExceptionBase(String errorMsg, Throwable cause) {
		this.errorMsg = errorMsg;
		this.cause = cause;
	}
	
	public ExceptionBase(String errorCode, String errorMsg, Throwable cause) {
		this.errorMsg = errorMsg;
		this.errorCode = errorCode;
		this.cause = cause;
	}

	public String getErrorCode() {
		return errorCode;
	}
	
	/*
	 * (non-Javadoc)
	 * @see java.lang.Throwable#getMessage()
	 */
	@Override
	public String getMessage() {
		String causeMsg = null;
		if (this.cause != null) {
			causeMsg = this.cause.getMessage();
		}
		if (errorMsg != null) {
			if (causeMsg != null) {
				return errorMsg + " caused by: " + causeMsg;
			}
			return errorMsg;
		}
		
		return causeMsg;
	}
	
	/**
	 * 获取错误信息
	 */
	public String getJsonString() {
		StringBuffer info = new StringBuffer("{");
		info.append("'errorCode':'")
				.append(getErrorCode())
				.append("',")
				.append("'errorMsg':'")
				.append(getMessage())
				.append("'")
				.append("}");
		return info.toString();
	}

}