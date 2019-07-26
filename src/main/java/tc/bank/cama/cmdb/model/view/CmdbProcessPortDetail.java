package tc.bank.cama.cmdb.model.view;

import java.util.Map;

import javax.persistence.Column;

import tc.bank.cama.cmdb.model.table.BaseColumnLabel;
import tc.bank.cama.cmdb.model.table.ColumnLabel;

/**
 * 软件实例的进程和端口明细
 */
public class CmdbProcessPortDetail implements ColumnLabel {
	
	private final ColumnLabel columnLabel;
	
	@Label("进程名称")
	private String process;
	
	@Label("监听端口")
	private Integer port;

	public CmdbProcessPortDetail() {
		this.columnLabel = new BaseColumnLabel(this.getClass());
	}
	
	/*
	 * setters
	 */
	
	@Column(name = "process_name")
	public void setProcess(String process) {
		this.process = process;
	}

	@Column(name = "listening_port")
	public void setPort(Integer port) {
		this.port = port;
	}

	/*
	 * getters
	 */
	
	public String getProcess() {
		return process;
	}
	
	public Integer getPort() {
		return port;
	}

	@Override
	public String toString() {
		return "CmdbProcessPortDetail [process=" + process + ", port=" + port + "]";
	}

	@Override
	public Map<String, String> getFieldLabels() {
		return this.columnLabel.getFieldLabels();
	}
	
}
