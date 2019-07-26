package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志源信息表-代理采集扩展表
 * 
 * @author parry
 * 
 */
@Entity
@Table(name = "aiml_cfg_log_source_agent")
public class AimlCfgLogSourceAgent extends AimlCfgLogSourceBasic implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1136140317804650933L;
	/**
	 * 日志配置ID
	 */
	@Column(name = "sourceid")
	private long sourceId;
	/**
	 * 主机地址
	 */
	@Column(name = "hostip")
	private String hostIp;
	/**
	 * 日志文件匹配格式
	 */
	@Column(name = "logdirregex")
	private String logDirRegex;
	/**
	 * 日志文件名
	 */
	@Column(name = "filename")
	private String fileName;
	/**
	 * 是否从文件末尾进行扫描 0 true 1 false
	 * @return
	 */
	@Column(name = "skip_to_end")
	private String skipToEnd;
	/**
	 * 扫描深度
	 * 0是不限制 1是当前路径 依次往下
	 */
	@Column(name = "depth")
	private String depth;
	
	/**
	 * 文件类型 TEXT/BIN
	 */
	@Column(name = "file_type")
	private String fileType;
	
	/**
	 * '日志编码格式
	 */
	@Column(name = "logcoding")
	private String logcoding;
	
	/**
	 * 读到文件末尾时，文件n秒未发生改变则发送
	 */
	@Column(name = "flush_last_secd")
	private String flushLastSecd;
	
	/**
	 * 文件多长时间不变化，不再采集，默认24小时
	 */
	@Column(name = "filter_file_hours")
	private String filterFileHours;
	
	/**
	 * 是否重要
	 */
	@Column(name = "is_important")
	private String isImportant;
	
	/**
	 * 是否重要
	 */
	@Column(name = "file_size")
	private String fileSize;
	
	public String getIsImportant() {
		return isImportant;
	}

	public void setIsImportant(String isImportant) {
		this.isImportant = isImportant;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public long getSourceId() {
		return sourceId;
	}

	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}

	public String getHostIp() {
		return hostIp;
	}

	public void setHostIp(String hostIp) {
		this.hostIp = hostIp;
	}

	public String getLogDirRegex() {
		return logDirRegex;
	}

	public void setLogDirRegex(String logDirRegex) {
		this.logDirRegex = logDirRegex;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getSkipToEnd() {
		return skipToEnd;
	}

	public void setSkipToEnd(String skipToEnd) {
		this.skipToEnd = skipToEnd;
	}
	public String getDepth() {
		return depth;
	}

	public void setDepth(String depth) {
		this.depth = depth;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getLogcoding() {
		return logcoding;
	}

	public void setLogcoding(String logcoding) {
		this.logcoding = logcoding;
	}

	public String getFlushLastSecd() {
		return flushLastSecd;
	}

	public void setFlushLastSecd(String flushLastSecd) {
		this.flushLastSecd = flushLastSecd;
	}

	public String getFilterFileHours() {
		return filterFileHours;
	}

	public void setFilterFileHours(String filterFileHours) {
		this.filterFileHours = filterFileHours;
	}
}
