package cn.com.agree.aweb.exception;


/**
 * 
 *
 * @author lihao lihao01@cfischina.com
 * Aug 3, 2015
 */
public class AWebException extends ExceptionBase {
	
	private static final long serialVersionUID = 8902734998784330413L;
	
	public AWebException(String errorMsg) {
		super(errorMsg);
	}
	
	public AWebException(String errorCode, Throwable cause) {
		super(errorCode, cause);
	}

	public AWebException(String errorCode, String errorMsg, Throwable cause) {
		super(errorCode, errorMsg, cause);
	}

}
