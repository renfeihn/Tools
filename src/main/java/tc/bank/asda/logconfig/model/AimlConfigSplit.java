package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_split")
public class AimlConfigSplit implements Serializable{

	private static final long serialVersionUID = -6834849654998071612L;
	
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
	 * 功能描述
	 */
	@Column(name = "funcdesc")
	private String funcdesc;
	/**
	 * 匹配规则
	 */
	@Column(name = "dictid")
	private String logregex;
	/**
	 * 字典ID
	 */
	@Column(name = "dictid")
	private String dictid;
	/**
	 * 拆分脚本方式:1-可视化配置 2-python脚本 3-groovy脚本
	 */
	@Column(name = "scripttype")
	private String scripttype;
	/**
	 * 拆分脚本:脚本内容
	 */
	@Column(name = "scriptcontext")
	private String scriptcontext;
	
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
	public String getFuncdesc() {
		return funcdesc;
	}
	public void setFuncdesc(String funcdesc) {
		this.funcdesc = funcdesc;
	}
	public String getLogregex() {
		return logregex;
	}
	public void setLogregex(String logregex) {
		this.logregex = logregex;
	}
	public String getDictid() {
		return dictid;
	}
	public void setDictid(String dictid) {
		this.dictid = dictid;
	}
	public String getScripttype() {
		return scripttype;
	}
	public void setScripttype(String scripttype) {
		this.scripttype = scripttype;
	}
	public String getScriptcontext() {
		return scriptcontext;
	}
	public void setScriptcontext(String scriptcontext) {
		this.scriptcontext = scriptcontext;
	}
}
