package cn.com.agree.aweb.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream;

/**
 * 文件压缩工具类
 * @author yangkuanjun
 *
 */
public class CompressUtil {
	
	/**
	 * 文件压缩
	 * @param fileName 待压缩的文件
	 * @param tarFile 压缩文件名
	 */
	public static void compressedFile(String fileName, String tarFile) {
		try {
			byte[] buf = new byte[1024];
			// 建立压缩文件输出流
			FileOutputStream out = new FileOutputStream(tarFile);
			// 建立tar压缩输出流
			TarArchiveOutputStream tout = new TarArchiveOutputStream(out);
			File file = new File(fileName);
			// 打开需压缩文件作为文件输入流
			FileInputStream is = new FileInputStream(fileName); 
			TarArchiveEntry tarEn = new TarArchiveEntry(file,file.getName()); //配置忽略路径
			tout.putArchiveEntry(tarEn);
			int num = -1;
			while ((num = is.read(buf, 0, 1024)) != -1) {
				tout.write(buf, 0, num);
			}
			tout.closeArchiveEntry();
			is.close();
			tout.close();
			out.close();

			// 建立压缩文件输出流
			FileOutputStream gzFile = new FileOutputStream(tarFile + ".gz");
			// 建立gzip压缩输出流
			GZIPOutputStream gzOut = new GZIPOutputStream(gzFile);
			// 打开需压缩文件作为文件输入流
			FileInputStream tarIn = new FileInputStream(tarFile);
			int len;
			while ((len = tarIn.read(buf, 0, 1024)) != -1) {
				gzOut.write(buf, 0, len);
			}
			tarIn.close();
			gzOut.close();
			gzFile.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			 new File(tarFile).deleteOnExit();
		}
	}

	public static void main(String[] args) throws FileNotFoundException {
		compressedFile("/Users/yangkuanjun/Downloads/G1_aweb_C016_16.log","/Users/yangkuanjun/Downloads/log.tar");
		System.out.println("压缩成功");

	}
}
