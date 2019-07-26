package tc.cama.aweb.service;

import java.util.List;

public interface ILogManager {
	/**
	 * 得到配置名稱
	 * @return
	 * @throws Exception
	 */
	public List<String> getConfigName() throws Exception;
	/**
	 * 得到模板名稱
	 * @return
	 * @throws Exception
	 */
	public List<String> getConfigtempletName() throws Exception;
	/**
	 * 得到配置内容
	 * @param fileName
	 * @throws Exception
	 */
	public byte[] getConfigInfo(String fileName) throws Exception;
	/**
	 * 得到模板内容
	 * @param fileName
	 * @throws Exception
	 */
	public byte[] getTempletInfo(String fileName) throws Exception;
	/**
	 * 提交配置内容
	 * @param fileName
	 * @param content
	 * @throws Exception
	 */
	public void subConfig(String fileName,String content) throws Exception;
	/**
	 * 删除配置内容
	 * @param fileName
	 * @param type
	 * @throws Exception
	 */
	public void delConfig(String fileName,String type) throws Exception;
}
