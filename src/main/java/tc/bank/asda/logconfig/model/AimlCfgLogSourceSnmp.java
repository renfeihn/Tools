package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_log_source_snmp")
public class AimlCfgLogSourceSnmp extends AimlCfgLogSourceBasic implements
		Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 日志配置ID
	 */
	@Column(name = "sourceid")
	private long sourceId;
	/**
	 * ips  ip地址列表,逗号分隔
	 */
	@Column(name = "ips")
	private String ips;
	/**
	 * version  v1  v2  v3
	 */
	@Column(name = "version")
	private String version;
	/**
	 * community 默认public
	 */
	@Column(name = "community")
	private String community;
	
	/**
	 * authUser 用户
	 */
	@Column(name = "authUser")
	private String authUser;
	
	/**
	 * authPasswd 密码
	 */
	@Column(name = "authPasswd")
	private String authPasswd;
	
	
	/**
	 * authProto 认证协议
	 */
	@Column(name = "authProto")
	private String authProto;
	
	/**
	 * decProto  解密协议
	 */
	@Column(name = "decProto")
	private String decProto;
	
	
	/**
	 * decKey 加密字符串
	 */
	@Column(name = "decKey")
	private String decKey;
	
	/**
	 * decKey 加密字符串
	 */
	@Column(name = "snmp_key_id")
	private int snmpKeyId;

	private List<String> keyStringList;
	
	private List<AimlCfgLogSourceSnmpKey> keyList;
	
	public void addSnmpKey(AimlCfgLogSourceSnmpKey bean) {
		if(keyList == null)
			keyList = new ArrayList<>();
		keyList.add(bean);
	}
	
	public List<String> getKeyStringList() {
		return keyStringList;
	}

	public void setKeyStringList(List<String> keyStringList) {
		this.keyStringList = keyStringList;
	}

	public List<AimlCfgLogSourceSnmpKey> getKeyList() {
		return keyList;
	}

	public void setKeyList(List<AimlCfgLogSourceSnmpKey> keyList) {
		this.keyList = keyList;
	}


	public int getSnmpKeyId() {
		return snmpKeyId;
	}


	public void setSnmpKeyId(int snmpKeyId) {
		this.snmpKeyId = snmpKeyId;
	}


	public long getSourceId() {
		return sourceId;
	}


	public void setSourceId(long sourceId) {
		this.sourceId = sourceId;
	}


	public String getIps() {
		return ips;
	}


	public void setIps(String ips) {
		this.ips = ips;
	}


	public String getVersion() {
		return version;
	}


	public void setVersion(String version) {
		this.version = version;
	}


	public String getCommunity() {
		return community;
	}


	public void setCommunity(String community) {
		this.community = community;
	}


	public String getAuthUser() {
		return authUser;
	}


	public void setAuthUser(String authUser) {
		this.authUser = authUser;
	}


	public String getAuthPasswd() {
		return authPasswd;
	}


	public void setAuthPasswd(String authPasswd) {
		this.authPasswd = authPasswd;
	}


	public String getAuthProto() {
		return authProto;
	}


	public void setAuthProto(String authProto) {
		this.authProto = authProto;
	}


	public String getDecProto() {
		return decProto;
	}


	public void setDecProto(String decProto) {
		this.decProto = decProto;
	}


	public String getDecKey() {
		return decKey;
	}

	public void setDecKey(String decKey) {
		this.decKey = decKey;
	}


	@Override
	public String toString() {
		return "AimlCfgLogSourceSnmp [sourceId=" + sourceId + ", ips=" + ips
				+ ", version=" + version + ", community=" + community
				+ ", authUser=" + authUser + ", authPasswd=" + authPasswd
				+ ", authProto=" + authProto + ", decProto=" + decProto
				+ ", decKey=" + decKey + ", snmpKeyId=" + snmpKeyId
				+ ", keyList=" + keyList + "]";
	}
	
}
