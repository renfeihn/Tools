package tc.cama.aweb.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;

import com.aim.alibaba.fastjson.annotation.JSONField;
import com.aim.alibaba.fastjson.serializer.SerializerFeature;

/**
 * 
 * 监控对象采集命令列表
 *
 */
public class AimCommandView extends AbstractDataModel {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	private Long cmdId;
	
	@Column(name = "cmd_name")
	private String cmdName;
	
	@Column(name = "cmd_ver")
	private Integer cmdVersion;
	
	private String cmdVersionName;

	@Column(name = "cmd")
	private String cmd;
	
	@Column(name = "cmd_params")
	@JSONField(serialzeFeatures=SerializerFeature.WriteNullStringAsEmpty)
	private String cmdParams;
	
	@Column(name = "result_set")
	private String resultSet;

	private List<String> resultItemNames = new ArrayList<String>();
	
	public void setCmdId(Long cmdId) {
		this.cmdId = cmdId;
	}

	public void setCmdName(String cmdName) {
		this.cmdName = cmdName;
	}

	public void setCmdVersion(Integer cmdVersion) {
		this.cmdVersion = cmdVersion;
		switch (cmdVersion.intValue()) {
			case 0:
				this.cmdVersionName = "通用";
				break;
			case 1:
				this.cmdVersionName = "Windows";
				break;
			case 2:
				this.cmdVersionName = "Unix";
				break;
			case 3:
				this.cmdVersionName = "AIX";
				break;
			default:
				this.cmdVersionName = "未知";
		}
	}

	public void setCmd(String cmd) {
		this.cmd = cmd;
	}

	public void setCmdParams(String cmdParams) {
		this.cmdParams = cmdParams;
	}

	public void setResultSet(String resultSet) {
		this.resultSet = resultSet;
	}

	public Long getCmdId() {
		return cmdId;
	}

	public String getCmdName() {
		return cmdName;
	}

	public Integer getCmdVersion() {
		return cmdVersion;
	}

	public String getCmd() {
		return cmd;
	}

	public String getCmdParams() {
		return cmdParams;
	}

	public String getResultSet() {
		return resultSet;
	}

	public String getCmdVersionName() {
		return cmdVersionName;
	}
	
	public void addResultItemName(String name) {
		this.resultItemNames.add(name);
	}
	
	public List<String> getResultItemNames() {
		return resultItemNames;
	}
	
	@Override
	public String toString() {
		
		StringBuilder builder = new StringBuilder();
		
		builder.append("cmdId = ").append(this.cmdId).append("\n");
		builder.append("cmdName = ").append(this.cmdName).append("\n");
		builder.append("cmdVersion = ").append(this.cmdVersion).append("\n");
		builder.append("cmdVersionName = ").append(this.cmdVersionName).append("\n");
		builder.append("cmd = ").append(this.cmd).append("\n");
		builder.append("cmdParams = ").append(this.cmdParams).append("\n");
		builder.append("resultSet = ").append(this.resultSet).append("\n");
		
		return builder.toString();
	}
}
