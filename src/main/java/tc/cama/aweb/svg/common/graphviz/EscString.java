package tc.cama.aweb.svg.common.graphviz;

public class EscString implements AttrType {

	private String value;

	public EscString(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return this.value;
	}

	public String toGv() {
		return "\"" + this.value + "\"";
	}

	/*
	是否添加属性值中的双引号
	 */
	public String toGv(boolean qur) {
		if (qur) {
			return "\"" + this.value + "\"";
		}
		return this.value;
	}

}
