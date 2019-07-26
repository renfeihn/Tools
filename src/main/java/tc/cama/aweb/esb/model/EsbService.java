package tc.cama.aweb.esb.model;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * aim_esb_service的POJO
 */
@Table(name = "aim_esb_service")
public class EsbService {
	
	private String serviceId;
	private String serviceName;
	
	@Column(name = "serviceid", unique = true)
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}
	
	@Column(name = "servicename")
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	@Column(name = "serviceid", unique = true)
	public String getServiceId() {
		return serviceId;
	}

	@Column(name = "servicename")
	public String getServiceName() {
		return serviceName;
	}

	@Override
	public String toString() {
		return "EsbService [serviceId=" + serviceId + ", serviceName=" + serviceName + "]";
	}
	
	
}
