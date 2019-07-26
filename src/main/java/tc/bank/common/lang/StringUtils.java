package tc.bank.common.lang;

import org.apache.commons.lang3.ArrayUtils;

public class StringUtils extends org.apache.commons.lang3.StringUtils {

	/**
	 * str1第i位是否与str2相同
	 * 
	 * @param str1
	 * @param index
	 * @param str2
	 * @return
	 */
	public static boolean equals(String str1, int index, String str2) {
		if (str1 == null || str1.length() == 0) {
			return false;
		}
		if (index < 0 || index > str1.length()) {
			return false;
		}
		if (str2 == null || str2.length() == 0) {
			return false;
		}
		return str1.charAt(index) == str2.charAt(0);
	}

	/**
	 * 字符串是否存在
	 * 
	 * @param str
	 * @param array
	 * @return
	 */
	public static boolean in(String str, String... array) {
		return ArrayUtils.contains(array, str);
	}

	/**
	 * 转为小写
	 * 
	 * @param array
	 * @return
	 */
	public static String[] lowerCase(String[] array) {
		if (array == null) {
			return null;
		}
		String[] larray = new String[array.length];
		for (int i = 0; i < array.length; i++) {
			larray[i] = lowerCase(array[i]);
		}
		return array;
	}

	/**
	 * 无此字符串
	 * 
	 * @param str
	 * @param array
	 * @return
	 */
	public static boolean notIn(String str, String... array) {
		return in(str, array) == false;
	}

	/**
	 * 生成重复字符串
	 * 
	 * @param s
	 * @param times
	 * @return
	 */
	public static String[] repeatAsArray(String s, int times) {
		String[] arr = new String[times];
		for (int i = 0; i < times; i++) {
			arr[i] = s;
		}
		return arr;
	}

	public static String toHexString(byte[] data) {
		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < data.length; i++) {
			String hex = Integer.toHexString(data[i] & 0xFF);
			hex = leftPad(hex, 2, "0");
			builder.append(hex);
		}
		return builder.toString();
	}

	/**
	 * 转为大写
	 * 
	 * @param array
	 * @return
	 */
	public static String[] upperCase(String[] array) {
		if (array == null) {
			return null;
		}
		String[] uarray = new String[array.length];
		for (int i = 0; i < array.length; i++) {
			uarray[i] = upperCase(array[i]);
		}
		return array;
	}

	public static String valueOf(Object obj) {
		return valueOf(obj, null);
	}

	/**
	 * 抓为字符串
	 * 
	 * @param obj
	 * @param defaultStr
	 *            为null或空字符串时的默认值
	 * @return
	 */
	public static String valueOf(Object obj, String defaultStr) {
		if (obj == null) {
			return defaultStr;
		}
		String val = obj.toString();
		return StringUtils.isEmpty(val) ? defaultStr : val;
	}

	/**
	 * start - end 替换为指定字符串
	 * 
	 * @param str
	 * @param start
	 * @param end
	 * @param replaceStr
	 * @return
	 */
	public static String replace(String str, int start, int end, String replaceStr) {
		String a = substring(str, 0, start);
		String b = substring(str, end);
		return a + replaceStr + b;
	}

}
