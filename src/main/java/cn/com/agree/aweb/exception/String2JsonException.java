package cn.com.agree.aweb.exception;
/**
 * 字符串转json异常
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年8月15日
 */
public class String2JsonException extends ExceptionBase{
	
	private static final long serialVersionUID = 5514065526489793229L;
	
	public String2JsonException(String errorMsg) {
		super(errorMsg);
	}
	
	public String2JsonException(String errorCode, Throwable cause) {
		super(errorCode, cause);
	}

	public String2JsonException(String errorCode, String errorMsg, Throwable cause) {
		super(errorCode, errorMsg, cause);
	}

}
