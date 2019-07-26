package tc.cama.aweb.model;

import javax.persistence.Column;

import com.aim.alibaba.fastjson.annotation.JSONField;
import com.aim.alibaba.fastjson.serializer.SerializerFeature;

public class AimObjectCommandView extends AbstractDataModel {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	private Long id;
	
	@Column(name = "execute_obj_id")
	private Long objectId;
	
	@Column(name = "execute_grp")
	private String executeGroup;
	
	@Column(name = "metric_grpname")
	private String executeGroupName;
	
	@Column(name = "execute_cmd")
	private Long cmdId;
	
	@Column(name = "execute_interval")
	private Long executeInterval;
	
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

	/**
	 * 对象名称
	 */
	private String objName;
	
	/**
	 * 对象所属的系统ID
	 */
	private Long appId;
	
	/**
	 * 对象所属的系统名称
	 */
	private String appName;
	
	/**
	 * CMDB一级分类名
	 */
	private String l1CateName;
	
	/**
	 * CMDB二级分类名
	 */
	private String l2CateName;
	
	/**
	 * CMDB三级分类名
	 */
	private String l3CateName;
	
	public void setId(Long id) {
		this.id = id;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	public void setExecuteGroup(String executeGroup) {
		this.executeGroup = executeGroup;
	}

	public void setCmdId(Long cmdId) {
		this.cmdId = cmdId;
	}

	public void setExecuteInterval(Long executeInterval) {
		this.executeInterval = executeInterval;
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

	public Long getId() {
		return id;
	}

	public Long getObjectId() {
		return objectId;
	}

	public String getExecuteGroup() {
		return executeGroup;
	}

	public Long getCmdId() {
		return cmdId;
	}

	public Long getExecuteInterval() {
		return executeInterval;
	}

	public String getCmdName() {
		return cmdName;
	}

	public Integer getCmdVersion() {
		return cmdVersion;
	}

	public String getCmdVersionName() {
		return cmdVersionName;
	}

	public String getCmd() {
		return cmd;
	}

	public String getCmdParams() {
		return cmdParams;
	}
	
	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getL1CateName() {
		return l1CateName;
	}

	public void setL1CateName(String l1CateName) {
		this.l1CateName = l1CateName;
	}

	public String getL2CateName() {
		return l2CateName;
	}

	public void setL2CateName(String l2CateName) {
		this.l2CateName = l2CateName;
	}

	public String getL3CateName() {
		return l3CateName;
	}

	public void setL3CateName(String l3CateName) {
		this.l3CateName = l3CateName;
	}

	public String getExecuteGroupName() {
		return executeGroupName;
	}

	public void setExecuteGroupName(String executeGroupName) {
		this.executeGroupName = executeGroupName;
	}

	@Override
	public String toString() {
		
		StringBuilder builder = new StringBuilder();
		
		builder.append("id = ").append(this.id).append("\n");
		builder.append("objectId = ").append(this.objectId).append("\n");
		builder.append("executeGroup = ").append(this.executeGroup).append("\n");
		builder.append("cmdId = ").append(this.cmdId).append("\n");
		builder.append("cmdName = ").append(this.cmdName).append("\n");
		builder.append("cmdVersion = ").append(this.cmdVersion).append("\n");
		builder.append("cmdVersionName = ").append(this.cmdVersionName).append("\n");
		builder.append("cmd = ").append(this.cmd).append("\n");
		builder.append("cmdParams = ").append(this.cmdParams).append("\n");
		builder.append("executeInterval = ").append(this.executeInterval).append("\n");
		builder.append("l1CateName = ").append(this.l1CateName).append("\n");
		builder.append("l2CateName = ").append(this.l2CateName).append("\n");
		builder.append("l3CateName = ").append(this.l3CateName).append("\n");
		
		return builder.toString();
	}
}
