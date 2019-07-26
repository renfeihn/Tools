package tc.bank.common.utils;

public class Bools {

	public static boolean isTrue(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj instanceof Number) {
			Number num = (Number) obj;
			return num.intValue() != 0;
		}
		if (obj instanceof String) {
			String str = (String) obj;
			if ("".equals(str) || "n".equalsIgnoreCase(str) || "0".equals(str)) {
				return false;
			}
			return true;
		}
		return true;
	}
}
