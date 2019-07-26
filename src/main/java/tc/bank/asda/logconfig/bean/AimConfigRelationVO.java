package tc.bank.asda.logconfig.bean;

import javax.persistence.Column;


public class AimConfigRelationVO {
	/**
	 * 对象ID
	 */
	private String objectid;
	/**
	 *日志ID 
	 */
	@Column(name = "logid")
	private String logid;
	/**
	 * 功能分类
	 */
	private String functype;
	/**
	 * 访问顺序
	 */
	private String transferno;
	/**
	 * 目标对象ID
	 */
	private String targetobjectid;
	/**
	 * 源匹配字段
	 */
	private String orifields;
	/**
	 * 目标匹配字段
	 */
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
