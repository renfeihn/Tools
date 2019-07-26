package tc.bank.cama.cmdb.model.view;

import javax.persistence.Column;

public class CmdbProcessAppSoftware extends CmdbAppSoftware{

	private Long processId;
	
	private String processName;
	
	private String processDescription;
	
	private String processCmd;

	/**
	 * getters
	 * @return
	 */
	public Long getProcessId() {
		return processId;
	}

	public String getProcessCmd() {
		return processCmd;
	}


	public String getProcessName() {
		return processName;
	}

	public String getProcessDescription() {
		return processDescription;
	}

	/**
	 * setters
	 * @param processId
	 */
	@Column(name = "process_id")
	public void setProcessId(Long processId) {
		this.processId = processId;
	}
	
	@Column(name = "process_name")
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	
	@Column(name = "process_description")
	public void setProcessDescription(String processDescription) {
		this.processDescription = processDescription;
	}
	
	@Column(name = "process_cmd")
	public void setProcessCmd(String processCmd) {
		this.processCmd = processCmd;
	}
	
}
