package tc.cama.aweb.bean;
/**
 * 数据库运行状态
 * @author jcm
 *
 */
public class DB2RunStatus {
	/**
	 * 连接数
	 */
     private int connCount;
     /**
      * 锁超时次数
      */
     
     private int lockTimeOutTimes;
     /**
      * 为提交sql数
      */
     private int unSubmitCount;
     /**
      * 提交sql数
      */
     
     private int  submitCount;
	public int getConnCount() {
		return connCount;
	}
	public void setConnCount(int connCount) {
		this.connCount = connCount;
	}
	public int getLockTimeOutTimes() {
		return lockTimeOutTimes;
	}
	public void setLockTimeOutTimes(int lockTimeOutTimes) {
		this.lockTimeOutTimes = lockTimeOutTimes;
	}
	public int getUnSubmitCount() {
		return unSubmitCount;
	}
	public void setUnSubmitCount(int unSubmitCount) {
		this.unSubmitCount = unSubmitCount;
	}
	public int getSubmitCount() {
		return submitCount;
	}
	public void setSubmitCount(int submitCount) {
		this.submitCount = submitCount;
	}
     
}
