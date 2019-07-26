package tc.bank.cama.core.bean;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

/**
 * 已转工单事件
 * 
 * @author Win7-user
 *
 */
public class ItilEventsCount implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1027951394042844433L;
	/**
	 * 全部事件
	 */
	private int event;
	/**
	 * 告警事件
	 */
	private int alarm;
	/**
	 * 预警事件
	 */
	private int warning;

	/**
	 * 预警+告警 明细
	 */
	private List<ItilEventCount> itilEvent = Collections.emptyList();

	/**
	 * 告警明细
	 */
	private List<ItilEventCount> itilAlarm = Collections.emptyList();

	/**
	 * 预警明细
	 */
	private List<ItilEventCount> itilWarning = Collections.emptyList();

	/**
	 * @return 全部事件
	 */
	public int getEvent() {
		return event;
	}

	/**
	 * @param events
	 *            全部事件
	 */
	public void setEvent(int event) {
		this.event = event;
	}

	/**
	 * @return 告警事件
	 */
	public int getAlarm() {
		return alarm;
	}

	/**
	 * @param alarm
	 *            告警事件
	 */
	public void setAlarm(int alarm) {
		this.alarm = alarm;
	}

	/**
	 * @return 预警事件
	 */
	public int getWarning() {
		return warning;
	}

	/**
	 * @param warning
	 *            预警事件
	 */
	public void setWarning(int warning) {
		this.warning = warning;
	}

	/**
	 * @return 预警+告警 明细
	 */
	public List<ItilEventCount> getItilEvent() {
		return itilEvent;
	}

	/**
	 * @param itilEvent
	 *            预警+告警 明细
	 */
	public void setItilEvent(List<ItilEventCount> itilEvent) {
		this.itilEvent = itilEvent;
	}

	/**
	 * @return 告警明细
	 */
	public List<ItilEventCount> getItilAlarm() {
		return itilAlarm;
	}

	/**
	 * @param itilAlarm
	 *            告警明细
	 */
	public void setItilAlarm(List<ItilEventCount> itilAlarm) {
		this.itilAlarm = itilAlarm;
	}

	/**
	 * @return 预警明细
	 */
	public List<ItilEventCount> getItilWarning() {
		return itilWarning;
	}

	/**
	 * @param itilWarning
	 *            预警明细
	 */
	public void setItilWarning(List<ItilEventCount> itilWarning) {
		this.itilWarning = itilWarning;
	}

}
