package tc.bank.common.db;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author dual
 * 
 */
public class Sort {

	public static class Order {

		private String direction;
		private String property;

		public Order() {
		}

		public Order(String direction, String property) {
			this.direction = direction;
			this.property = property;
		}

		public String getDirection() {
			return direction;
		}

		public void setDirection(String direction) {
			this.direction = direction;
		}

		public String getProperty() {
			return property;
		}

		public void setProperty(String property) {
			this.property = property;
		}

		public String toString() {
			return String.format("%s %s", property, direction);
		}

	}

	private List<Order> orders;

	public Sort() {
	}

	public Sort(List<Order> orders) {
		this.orders = orders;
	}

	public Sort(String direction, List<String> properties) {
		orders = new ArrayList<Order>();
		for (String property : properties) {
			Order order = new Order(direction, property);
			orders.add(order);
		}
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	@Override
	public String toString() {
		if (orders == null || orders.isEmpty()) {
			return "";
		}
		StringBuilder strBuilder = new StringBuilder();
		for (int i = 0; i < orders.size(); i++) {
			if (i > 0) {
				strBuilder.append(",");
			}
			strBuilder.append(orders.get(i).toString());
		}
		return strBuilder.toString();
	}
}
