package tc.bank.asda.logconfig.bean;


public class AimConfigDictVO {

	/**
	 *配置ID 
	 */
	private String dictid;
	/**
	 * 配置描述
	 */
	private String dictdesc;
	/**
	 * 一级分类
	 */
	private String category1;
	/**
	 * 二级分类
	 */
	private String category2;
	/**
	 * 三级分类
	 */
	private String category3;
	/**
	 * 字典名称
	 */
	private String filefield;
	/**
	 * 字典描述
	 */
	private String filedesc;
	/**
	 * 字典类型:int/string
	 */
	private String filetype;
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
	
	private String splitType;
	/**
	 * 系统分类1-系统公共,2-用户配置
	 */
	private String systype;
	
	/**
	 * 脚本内容
	 */
	private String scriptcontext;
	
	public String getScriptcontext() {
		return scriptcontext;
	}
	public void setScriptcontext(String scriptcontext) {
		this.scriptcontext = scriptcontext;
	}
	public String getSplitType() {
		return splitType;
	}
	public void setSplitType(String splitType) {
		this.splitType = splitType;
	}
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
	public String getDictid() {
		return dictid;
	}
	public void setDictid(String dictid) {
		this.dictid = dictid;
	}
	public String getDictdesc() {
		return dictdesc;
	}
	public void setDictdesc(String dictdesc) {
		this.dictdesc = dictdesc;
	}
	public String getCategory2() {
		return category2;
	}
	public void setCategory2(String category2) {
		this.category2 = category2;
	}
	public String getCategory3() {
		return category3;
	}
	public void setCategory3(String category3) {
		this.category3 = category3;
	}
	public String getFilefield() {
		return filefield;
	}
	public void setFilefield(String filefield) {
		this.filefield = filefield;
	}
	public String getFiledesc() {
		return filedesc;
	}
	public void setFiledesc(String filedesc) {
		this.filedesc = filedesc;
	}
	public String getFiletype() {
		return filetype;
	}
	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}
	public String getCategory1() {
		return category1;
	}
	public void setCategory1(String category1) {
		this.category1 = category1;
	}
	public String getSystype() {
		return systype;
	}
	public void setSystype(String systype) {
		this.systype = systype;
	}
	public String getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}
	
}
