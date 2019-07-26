package tc.bank.cama.core.service.alert;

public class EventConstants {

	/**
	 * 事件类型
	 * <ul>
	 * <li>ALARM_WARING</li>
	 * <li>ALARM 报警/故障</li>
	 * <li>WARING 预警</li>
	 * </ul>
	 * 
	 * @author Win7-user
	 * 
	 */
	public static enum EventType {

		ALARM_WARING(-1), ALARM(0), WARING(1), INFO(2);

		public final int val;

		EventType(int val) {
			this.val = val;
		}

	}

	/**
	 * 事件关闭状态
	 * 
	 * @author Win7-user
	 * 
	 */
	public static enum EventClosed {
		ALL(-1), FALSE(0), TRUE(1);

		public final int val;

		EventClosed(int val) {
			this.val = val;
		}
	}

	/**
	 * 事件状态
	 * <ul>
	 * <li>触发 NEW-0</li>
	 * <li>解决 DEAL-1</li>
	 * <li>关闭 CLOSED-2</li>
	 * </ul>
	 * 
	 * @author Win7-user
	 * 
	 */
	public static enum EventStatus {
		NEW(0), DEAL(1), CLOSED(2);
		public final int val;

		EventStatus(int val) {
			this.val = val;
		}
	}

	/**
	 * 工单状态
	 * <ul>
	 * <li>ALL("全部")</li>
	 * <li>PENDING("待分派")</li>
	 * <li>ASSIGNED("已分派")</li>
	 * <li>IN_PROGRESS("处理中")</li>
	 * <li>RESOLVED("已解决")</li>
	 * <li>CLOSED("已关闭")</li>
	 * <li>CANCELLED("已取消")</li>
	 * </ul>
	 * 
	 * @author Win7-user
	 * 
	 */
	public static enum ItilStatus {
		ALL("全部"), //
		PENDING("待分派"), //
		ASSIGNED("已分派"), //
		IN_PROGRESS("处理中"), //
		RESOLVED("已解决"), //
		CLOSED("已关闭"), //
		CANCELLED("已取消");
		public final String val;

		ItilStatus(String val) {
			this.val = val;
		}
	}

	/**
	 * 事件受理状态
	 * <ul>
	 * <li>DEALT("已解除")</li>
	 * <li>DEALING("未解除")</li>
	 * <li>DEALING_LONGTIME("长时间未解除")</li>
	 * <li>DEAL_LONGTIME("长时间未受理")</li>
	 * </ul>
	 * 
	 * @author Win7-user
	 * 
	 */
	public static enum EventDealStatus {
		DEALT("已解除"), //
		DEALING("未解除"), //
		DEALING_LONGTIME("长时间未解除"), //
		DEAL_LONGTIME("长时间未受理");

		public final String val;

		EventDealStatus(String val) {
			this.val = val;
		}
	}

	/**
	 * 相似事件
	 * 
	 * @author Win7-user
	 * 
	 */
	public static enum SimilarEvent {
		// 同期对象
		CONCURRENT_OBJECT,
		// 同期服务器
		CONCURRENT_SERVER,
		// 同期应用系统
		CONCURRENT_APPLICTION,
		// 同期接入应用系统
		CONCURRENT_CONSUMER,
		// 同期接出应用系统
		CONCURRENT_SERVICE,
		// 同类事件历史
		EVENT_HISTORY,
	}

}
