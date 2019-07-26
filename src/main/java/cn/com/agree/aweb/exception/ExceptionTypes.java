package cn.com.agree.aweb.exception;

/**
 * 异常错误码与错误信息映射
 *
 * @author lihao lihao01@cfischina.com
 * Aug 3, 2015
 */
public class ExceptionTypes {
	

	/**
	 * 
	 *
	 * @author lihao lihao01@cfischina.com
	 * Aug 6, 2015
	 */
	public static enum AWEB {
		/**
		 * 解析XML异常
		 */
		AWEB01("AWEB-01", "解析XML时出现异常"), 
		
		/**
		 * 操作文件异常
		 */
		AWEB02("AWEB-02", "进行文件类操作时发生错误"), 
		
		/**
		 * 编解码异常
		 */
		AWEB03("AWEB-03", "进行编解码操作时出现异常"), 
		
		/**
		 * 解压缩异常
		 */
		AWEB04("AWEB-04", "进行压缩解压缩时出现异常"), 
		
		/**
		 * json字符串解析异常
		 */
		AWEB05("AWEB-05","字符串解析为json对象异常"),
		/**
		 * 数据库相关操作异常
		 */
		AWEB50("AWEB-50", "与数据库交互时发生异常"), 
		
		/**
		 * 业务处理异常
		 */
		AWEB90("AWEB-90", "业务处理异常"), 
		
		/**
		 * 未知异常
		 */
		AWEB99("AWEB-99", "发生未知异常，详情请查看日志");
		
		private String errorCode;
		private String errorMsg;
		
		private AWEB(String errorCode, String errorMsg) {
			this.errorCode = errorCode;
			this.errorMsg = errorMsg;
		}
		
		public String getErrorCode() {
			return errorCode;
		}
		
		public String getErrorMsg() {
			return errorMsg;
		}
	}
	
}
