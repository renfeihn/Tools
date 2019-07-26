package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
/**
 * 日志源信息表-服务接入源信息表
 * @author parry
 *
 */
@Entity
@Table(name = "aiml_cfg_log_source_servicein")
public class AimlCfgLogSourceServiceIn extends AimlCfgLogSourceBasic implements Serializable{
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
	 * 服务类型 UDP/TCP/HTTP
	 */
	@Column(name = "servicetype")
	private String serviceType;
	/**
	 * 服务接入ID
	 */
	@Column(name = "serviceinid")
	private long serviceInId;
	/**
	 * 源日志接入地址
	 */
	@Column(name = "serviceaddress")
	private String serviceAddress;
	
	private String serviceInAddress;
	
	public long getSourceId() {
		return sourceId;
	}
	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getServiceAddress() {
		return serviceAddress;
	}
	public void setServiceAddress(String serviceAddress) {
		this.serviceAddress = serviceAddress;
	}
	public long getServiceInId() {
		return serviceInId;
	}
	public void setServiceInId(long serviceInId) {
		this.serviceInId = serviceInId;
	}
	public String getServiceInAddress() {
		return serviceInAddress;
	}
	public void setServiceInAddress(String serviceInAddress) {
		this.serviceInAddress = serviceInAddress;
	}
	
}
