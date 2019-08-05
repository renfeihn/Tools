package cn.com.agree.aweb.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.zip.ZipException;

import org.apache.commons.compress.archivers.ArchiveStreamFactory;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.compress.archivers.zip.ZipFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.Constants;

/**
 * ZIP压缩,解压工具
 */
public class ZipTool {

	private static final String ENCODING = "utf8";
	public static final String VERSION_CONFIG_FILE = "packconfig.txt";

	/**
	 * 压缩文件
	 * 
	 * @param zipPath
	 * 			@param targetFiles @throws Exception @throws
	 */
	public static void compress(String zipPath, ArrayList<File> targetFiles, ArrayList<String> baseList)
			throws Exception {
		ZipArchiveOutputStream zos = null;
		try {
			zos = (ZipArchiveOutputStream) new ArchiveStreamFactory().createArchiveOutputStream("zip",
					new FileOutputStream(zipPath));
			zos.setEncoding(ENCODING);
			InputStream is = null;
			ZipArchiveEntry ze = null;
			for (int i = 0; i < targetFiles.size(); i++) {
				File file = targetFiles.get(i);
				try {

					is = new FileInputStream(file);
					ze = new ZipArchiveEntry(baseList.get(i));
					zos.putArchiveEntry(ze);
					byte[] buf = new byte[32];
					int len = 0;
					while ((len = is.read(buf)) != -1) {
						zos.write(buf, 0, len);
					}
				} finally {
					if (is != null) {
						is.close();
					}
					if (zos != null) {
						zos.closeArchiveEntry();
					}
				}
			}
		} finally {
			if (zos != null) {
				try {
					zos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 压缩文件
	 * 
	 * @param zipPath
	 * 			@param inputFile @throws Exception @throws
	 */
	public static void compress(String zipPath, File inputFile) throws Exception {
		ArrayList<File> targetFiles = new ArrayList<File>();
		ArrayList<String> baseList = new ArrayList<String>();
		getFileList(targetFiles, baseList, inputFile, null);

		compress(zipPath, targetFiles, baseList);
	}

	/**
	 * 获取压缩文件列表
	 * 
	 * @param targetFiles
	 * @param inputFile
	 */
	private static void getFileList(ArrayList<File> targetFiles, ArrayList<String> baseList, File inputFile,
			String base) {
		if (inputFile.isFile()) {
			targetFiles.add(inputFile);
			baseList.add(base);
		} else if (inputFile.isDirectory()) {
			File[] children = inputFile.listFiles();
			for (File child : children) {
				if (base == null) {
					getFileList(targetFiles, baseList, child, child.getName());
				} else {
					getFileList(targetFiles, baseList, child, base + "/" + child.getName());
				}

			}
		}
	}

	/**
	 * 解压zip到target目录下
	 * 
	 * @param targetPath
	 * @param path
	 * @throws IOException
	 */
	public static void decompress(File inputFile, String targetPath, String path) throws IOException {
		ZipFile src = new ZipFile(inputFile);

		Enumeration<?> en = src.getEntries();
		byte[] buf = new byte[64];
		int len = -1;
		try {
			while (en.hasMoreElements()) {
				ZipArchiveEntry ze = (ZipArchiveEntry) en.nextElement();
				String zeName = ze.getName();
				zeName = zeName.replace("\\", "/");

				if (!zeName.startsWith(path)) {
					continue;
				}

				File file = new File(targetPath, zeName.substring(path.length()));
				if (ze.isDirectory()) {
					file.mkdirs();
					continue;
				}
				if (!file.getParentFile().exists())
					file.getParentFile().mkdirs();
				FileOutputStream fos = new FileOutputStream(file);
				InputStream is = src.getInputStream(ze);
				while (true) {
					len = is.read(buf);
					if (len == -1)
						break;
					fos.write(buf, 0, len);
				}
				is.close();
				fos.close();
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (ZipException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取zip包中的配置文件
	 * 
	 * @param sZipPathFile
	 * @return
	 * @throws IOException
	 */
	public static JSONObject getConfigFile(File sZipPathFile) throws IOException {
		ZipFile src = new ZipFile(sZipPathFile);
		Enumeration<?> en = src.getEntries();
		try {
			while (en.hasMoreElements()) {
				ZipArchiveEntry ze = (ZipArchiveEntry) en.nextElement();

				if (ze.getName().toLowerCase().endsWith("/" + VERSION_CONFIG_FILE)) {
					StringBuffer content = new StringBuffer();

					InputStream is = src.getInputStream(ze);
					BufferedReader reader = new BufferedReader(
							new InputStreamReader(is, Charset.forName(Constants.ENCODING_UTF8)));
					String line = null;
					while ((line = reader.readLine()) != null) {
						content.append(line);
					}
					reader.close();
					src.close();

					return JSON.parseObject(content.toString());
				}

			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (ZipException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

}
