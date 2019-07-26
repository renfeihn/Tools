package tc.bank.asda.logconfig.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="aiml_cfg_split_element")
public class AimlConfigSplitElement {
	/**
	 * 对象ID
	 */
	@Column(name = "objectid")
	private String objectid;
	/**
	 * 对象ID
	 */
	@Column(name = "logid")
	private String logid;
	/**
	 * 对象ID
	 */
	@Column(name = "functype")
	private String functype;
	/**
	 * 对象ID
	 */
	@Column(name = "funcdesc")
	private String funcdesc;
	/**
	 * 对象ID
	 */
	@Column(name = "objectname")
	private String objectname;
	/**
	 * 对象ID
	 */
	@Column(name = "elementname")
	private String elementname;
	/**
	 * 对象ID
	 */
	@Column(name = "elementdesc")
	private String elementdesc;
	/**
	 * 对象ID
	 */
	@Column(name = "splittype")
	private String splittype;
	/**
	 * 对象ID
	 */
	@Column(name = "classname")
	private String classname;
	/**
	 * 对象ID
	 */
	@Column(name = "scriptcontext")
	private String scriptcontext;
	
	/**
	 * 对象ID
	 */
	@Column(name = "systype")
	private String systype;
	
	
	public String getObjectid() {
		return objectid;
	}
	public void setObjectid(String objectid) {
		this.objectid = objectid;
	}
	public String getLogid() {
		return logid;
	}
	public void setLogid(String logid) {
		this.logid = logid;
	}
	public String getFunctype() {
		return functype;
	}
	public void setFunctype(String functype) {
		this.functype = functype;
	}
	public String getObjectname() {
		return objectname;
	}
	public void setObjectname(String objectname) {
		this.objectname = objectname;
	}
	public String getElementname() {
		return elementname;
	}
	public void setElementname(String elementname) {
		this.elementname = elementname;
	}
	public String getElementdesc() {
		return elementdesc;
	}
	public void setElementdesc(String elementdesc) {
		this.elementdesc = elementdesc;
	}
	public String getSplittype() {
		return splittype;
	}
	public void setSplittype(String splittype) {
		this.splittype = splittype;
	}
	public String getClassname() {
		return classname;
	}
	public void setClassname(String classname) {
		this.classname = classname;
	}
	public String getScriptcontext() {
		return scriptcontext;
	}
	public void setScriptcontext(String scriptcontext) {
		this.scriptcontext = scriptcontext;
	}
	public String getFuncdesc() {
		return funcdesc;
	}
	public void setFuncdesc(String funcdesc) {
		this.funcdesc = funcdesc;
	}
	public String getSystype() {
		return systype;
	}
	public void setSystype(String systype) {
		this.systype = systype;
	}
	
}
