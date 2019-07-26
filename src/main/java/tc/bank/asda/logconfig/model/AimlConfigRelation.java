package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="aiml_cfg_relation")
public class AimlConfigRelation implements Serializable {

	private static final long serialVersionUID = 4713726762567820439L;
	
	/**
	 * 对象ID
	 */
	@Column(name = "objectid")
	private String objectid;
	/**
	 *日志ID 
	 */
	@Column(name = "logid")
	private String logid;
	/**
	 * 功能分类
	 */
	@Column(name = "functype")
	private String functype;
	/**
	 * 访问顺序
	 */
	@Column(name = "transferno")
	private String transferno;
	/**
	 * 目标对象ID
	 */
	@Column(name = "targetobjectid")
	private String targetobjectid;
	/**
	 * 源匹配字段
	 */
	@Column(name = "orifields")
	private String orifields;
	/**
	 * 目标匹配字段
	 */
	@Column(name = "targetfields")
	private String targetfields;
	
	public String getLogid() {
		return logid;
	}
	public void setLogid(String logid) {
		this.logid = logid;
	}
	public String getObjectid() {
		return objectid;
	}
	public void setObjectid(String objectid) {
		this.objectid = objectid;
	}
	public String getFunctype() {
		return functype;
	}
	public void setFunctype(String functype) {
		this.functype = functype;
	}
	public String getTransferno() {
		return transferno;
	}
	public void setTransferno(String transferno) {
		this.transferno = transferno;
	}
	public String getTargetobjectid() {
		return targetobjectid;
	}
	public void setTargetobjectid(String targetobjectid) {
		this.targetobjectid = targetobjectid;
	}
	public String getOrifields() {
		return orifields;
	}
	public void setOrifields(String orifields) {
		this.orifields = orifields;
	}
	public String getTargetfields() {
		return targetfields;
	}
	public void setTargetfields(String targetfields) {
		this.targetfields = targetfields;
	}
}
