package tc.cama.aweb.bean;

public class ABEvent {
	/**
	 * 事件未解决数
	 */
	private int unDoEvent;
	/**
	 * 事件已解决数
	 */
	private int hDoEvent;
	/**
	 * 告警未解决数
	 */
	private int alarmUnDoCount;
	/**
	 * 预警未解决数
	 */
	private int waingUnDoCount;
	/**
	 * 告警已解决数
	 */
	private int alarmHDoCount;
	/**
	 * 预警已解决数
	 */
	private int waingHDoCount;

	public int getUnDoEvent() {
		return unDoEvent;
	}

	public void setUnDoEvent(int unDoEvent) {
		this.unDoEvent = unDoEvent;
	}

	public int gethDoEvent() {
		return hDoEvent;
	}

	public void sethDoEvent(int hDoEvent) {
		this.hDoEvent = hDoEvent;
	}

	public int getAlarmUnDoCount() {
		return alarmUnDoCount;
	}

	public void setAlarmUnDoCount(int alarmUnDoCount) {
		this.alarmUnDoCount = alarmUnDoCount;
	}

	public int getWaingUnDoCount() {
		return waingUnDoCount;
	}

	public void setWaingUnDoCount(int waingUnDoCount) {
		this.waingUnDoCount = waingUnDoCount;
	}

	public int getAlarmHDoCount() {
		return alarmHDoCount;
	}

	public void setAlarmHDoCount(int alarmHDoCount) {
		this.alarmHDoCount = alarmHDoCount;
	}

	public int getWaingHDoCount() {
		return waingHDoCount;
	}

	public void setWaingHDoCount(int waingHDoCount) {
		this.waingHDoCount = waingHDoCount;
	}

}
