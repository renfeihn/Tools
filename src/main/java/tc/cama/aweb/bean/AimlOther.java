package tc.cama.aweb.bean;

import java.util.Date;

public class AimlOther {
	
	/**
	 * 日志名称
	 */
	private String name;
	
	/**
	 * 文件类型
	 */
	private String fileType;
	
	/**
	 * 日志大小
	 */
	private Long size;
	
	/**
	 * 最后修改时间
	 */
	private Date lastDate;
	
	/**
	 * 服务器ip
	 */
	
	private String serverIp;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public Date getLastDate() {
		return lastDate;
	}

	public void setLastDate(Date lastDate) {
		this.lastDate = lastDate;
	}

	public String getServerIp() {
		return serverIp;
	}

	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}

}
