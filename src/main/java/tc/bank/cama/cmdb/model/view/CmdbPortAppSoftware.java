package tc.bank.cama.cmdb.model.view;

import javax.persistence.Column;

public class CmdbPortAppSoftware extends CmdbProcessAppSoftware{

	private Long portId;

	private int port;
	
	private String portDescription;

	/**
	 * getters
	 * @return
	 */
	public Long getPortId() {
		return portId;
	}

	public int getPort() {
		return port;
	}

	public String getPortDescription() {
		return portDescription;
	}

	/**
	 * setters
	 * @param portId
	 */
	
	@Column(name = "port_id")
	public void setPortId(Long portId) {
		this.portId = portId;
	}
	
	@Column(name = "listening_port")
	public void setPort(int port) {
		this.port = port;
	}

	@Column(name = "port_description")
	public void setPortDescription(String portDescription) {
		this.portDescription = portDescription;
	}
	
	
}
