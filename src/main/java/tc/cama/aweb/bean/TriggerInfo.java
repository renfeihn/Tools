package tc.cama.aweb.bean;

public class TriggerInfo {
	/**
	 * 触发器id
	 */
	private int trigerId;
	/**
	 * 触发器名称
	 */
	private String  triggerName;

	/**
	 * 已处理事件数
	 */
	//private int doEventCount;
	/**
	 * 未处理事件数 
	 */
	//private int undoEventCount;
	
	
	public String getTriggerName() {
		return triggerName;
	}
	public void setTriggerName(String triggerName) {
		this.triggerName = triggerName;
	}
	public int getTrigerId() {
		return trigerId;
	}
	public void setTrigerId(int trigerId) {
		this.trigerId = trigerId;
	}
//	public int getDoEventCount() {
//		return doEventCount;
//	}
//	public void setDoEventCount(int doEventCount) {
//		this.doEventCount = doEventCount;
//	}
//	public int getUndoEventCount() {
//		return undoEventCount;
//	}
//	public void setUndoEventCount(int undoEventCount) {
//		this.undoEventCount = undoEventCount;
//	}
	
}
