package tc.bank.asda.logconfig.bean;

import java.util.List;

import tc.bank.asda.logconfig.model.AimlConfigSplitElement;

public class AimConfigSplitVO {
	/**
	 * 对象ID
	 */
	private String objectid;
	/**
	 * 应用分类ID
	 */
	private String applicationId;
	/**
	 *日志ID 
	 */
	private String logid;
	/**
	 * 功能分类
	 */
	private String functype;
	/**
	 * 功能描述
	 */
	private String funcdesc;
	/**
	 * 匹配规则
	 */
	private String logregex;
	/**
	 * 字典ID
	 */
	private String dictid;
	/**
	 * 拆分脚本方式:1-可视化配置 2-python脚本 3-groovy脚本
	 */
	private String scripttype;
	/**
	 * 拆分脚本:脚本内容
	 */
	private String scriptcontext;
	
	private List<AimlConfigSplitElement> elementContexts;
	
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
	public List<AimlConfigSplitElement> getElementContexts() {
		return elementContexts;
	}
	public void setElementContexts(List<AimlConfigSplitElement> elementContexts) {
		this.elementContexts = elementContexts;
	}
	public String getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}
	
}
