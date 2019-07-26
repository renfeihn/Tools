package tc.bank.common.lang;

public class NumberUtils extends org.apache.commons.lang3.math.NumberUtils {

	public static byte[] toBytes(long num) {
		byte[] bytes = new byte[8];
		for (int i = 0; i < bytes.length; i++) {
			bytes[i] = Long.valueOf(num & 0xffL).byteValue();
			num = num >> 8;
		}
		return bytes;
	}

	public static long toLong(byte[] bytes) {
		if (bytes == null || bytes.length == 0) {
			return 0;
		}
		long num = 0;
		for (int i = 0; i < bytes.length; i++) {
			num |= (bytes[i] & 0xffL) << (i * 8);
		}
		return num;
	}

}