package tc.bank.cama.cmdb.model.table.extention;

import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Table;

import tc.bank.cama.cmdb.model.table.BaseColumnLabel;
import tc.bank.cama.cmdb.model.table.ColumnLabel;

/**
 * CMDB_Process_Port的POJO对象
 *
 */

@Table(name = "cmdb_process_port")
public class CmdbProcessPort implements ColumnLabel {

	private final ColumnLabel columnLabel;
	
	@Label("记录ID")
	private Long recordId;

	@Label("对象ID")
	private Long objectId;
	
	@Label("所属进程记录ID")
	private Long processRecordId;
	
	@Label("监听端口")
	private int port;
	
	@Label("端口描述")
	private String description;

	public CmdbProcessPort() {
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
	
	@Column(name="proc_rec_id")
	public void setProcessRecordId(Long processRecordId) {
		this.processRecordId = processRecordId;
	}

	@Column(name="listening_port")
	public void setPort(int port) {
		this.port = port;
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

	@Column(name = "proc_rec_id")
	public Long getProcessRecordId() {
		return processRecordId;
	}

	@Column(name = "listening_port")
	public int getPort() {
		return port;
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
