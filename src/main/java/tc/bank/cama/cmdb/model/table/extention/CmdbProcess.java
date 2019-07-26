package tc.bank.cama.cmdb.model.table.extention;



import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Table;

import tc.bank.cama.cmdb.model.table.BaseColumnLabel;
import tc.bank.cama.cmdb.model.table.ColumnLabel;

/**
 * CMDB_Process的POJO对象
 *
 */

@Table(name = "cmdb_process")
public class CmdbProcess implements ColumnLabel {

	private final ColumnLabel columnLabel;

	@Label("记录ID")
	private Long recordId;

	@Label("对象ID")
	private Long objectId;
	
	@Label("进程名称")
	private String processName;
	
	@Label("进程描述")
	private String description;

	public CmdbProcess() {
		this.columnLabel = new BaseColumnLabel(this.getClass());
	}
	
	/*
	 * setters
	 */
	
	@Column(name="Record_Id")
	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	@Column(name="object_id")
	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}
	
	@Column(name="process_name")
	public void setProcessName(String processName) {
		this.processName = processName;
	}

	@Column(name="description")
	public void setDescription(String description) {
		this.description = description;
	}

	/*
	 * getters
	 */

	@Column(name = "Record_Id",unique=true)
	public Long getRecordId() {
		return recordId;
	}

	@Column(name = "Object_Id")
	public Long getObjectId() {
		return objectId;
	}

	@Column(name = "Process_Name")
	public String getProcessName() {
		return processName;
	}

	@Column(name = "Description")
	public String getDescription() {
		return description;
	}

	@Override
	public Map<String, String> getFieldLabels() {
		return this.columnLabel.getFieldLabels();
	}
	
}
