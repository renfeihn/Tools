
package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
/**
 * 日志源信息表-本地上传扩展表
 * @author parry
 *
 */
@Entity
@Table(name = "aiml_cfg_log_source_manualup")
public class AimlCfgLogSourceManualUp extends AimlCfgLogSourceBasic implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -5523076173926007691L;
	/**
	 * 日志源ID
	 */
	@Column(name = "sourceid")
	private long sourceId;
	/**
	 * 日志位置
	 */
	@Column(name = "location")
	private String location;
	/**
	 * 日志名
	 */
	@Column(name = "filename")
	private String fileName;
	
	public long getSourceId() {
		return sourceId;
	}
	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}
