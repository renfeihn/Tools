package tc.cama.aweb.nmon;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

public class GZipCompressUtil {

	public static byte[] zip(byte[] raw) {
		if (raw == null || raw.length == 0) {
			return raw;
		}
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		GZIPOutputStream out = null;
		try {
			out = new GZIPOutputStream(buffer);
			// 必须用UTF-8，因为不能保证所有属性都是GBK的，例如图像内容
			out.write(raw);
		} catch (IOException e) {
			throw new Error(e);
		} finally {
			if (out != null)
				try {
					out.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		return buffer.toByteArray();
	}

	public static byte[] unzip(byte[] zipped) {
		if (zipped == null || zipped.length == 0) {
			return zipped;
		}
		byte[] raw;
		GZIPInputStream is = null;
		try {
			is = new GZIPInputStream(new ByteArrayInputStream(zipped));
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buff = new byte[1024];
			int length = 0;
			while ((length = is.read(buff)) > 0) {
				baos.write(buff, 0, length);
			}
			// 必须用UTF-8，因为不能保证所有属性都是GBK的，例如图像内容
			raw = baos.toByteArray();
		} catch (IOException e) {
			throw new Error(e);
		} finally {
			if (is != null)
				try {
					is.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		return raw;
	}

}
