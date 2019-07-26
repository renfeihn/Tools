package tc.bank.asda.logtrace.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "aiml_log_chain_cfg")
public class LogChainCfg implements Serializable {
	/**
	 * 链路配置表
	 */
	private static final long serialVersionUID = 7022602263594153365L;
	/**
	 * id
	 */
	@Column(name = "id")
	private int id;
	
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "from_appid")
	private String fromAppid;
	
	@Column(name = "to_appid")
	private String toAppid;
	
	@Column(name = "create_time")
	private String createTime;
	
	@Column(name = "update_time")
	private String updateTime;
	
	@Column(name = "chain_name")
	private String chainName;

	private List<LogChainCfgDtl> dtlList;
	
	public List<LogChainCfgDtl> getDtlList() {
		return dtlList;
	}

	public void setDtlList(List<LogChainCfgDtl> dtlList) {
		this.dtlList = dtlList;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFromAppid() {
		return fromAppid;
	}

	public void setFromAppid(String fromAppid) {
		this.fromAppid = fromAppid;
	}

	public String getToAppid() {
		return toAppid;
	}

	public void setToAppid(String toAppid) {
		this.toAppid = toAppid;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public String getChainName() {
		return chainName;
	}

	public void setChainName(String chainName) {
		this.chainName = chainName;
	}

	@Override
	public String toString() {
		return "LogChainCfg [id=" + id + ", userId=" + userId + ", fromAppid="
				+ fromAppid + ", toAppid=" + toAppid + ", createTime="
				+ createTime + ", updateTime=" + updateTime + ", chainName="
				+ chainName + "]";
	}
	
}
