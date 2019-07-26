package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_cfg_dict")
public class AimlConfigDict implements Serializable{

	private static final long serialVersionUID = 5817500430825819254L;
	
	/**
	 *配置ID 
	 */
	@Column(name = "dictid")
	private String dictid;
	
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
	 * 配置描述
	 */
	@Column(name = "dictdesc")
	private String dictdesc;
	/**
	 * 一级分类
	 */
	@Column(name = "category1")
	private String category1;
	/**
	 * 二级分类
	 */
	@Column(name = "category2")
	private String category2;
	/**
	 * 三级分类
	 */
	@Column(name = "category3")
	private String category3;
	/**
	 * 字典名称
	 */
	@Column(name = "filefield")
	private String filefield;
	/**
	 * 字典描述
	 */
	@Column(name = "filedesc")
	private String filedesc;
	/**
	 * 字典类型:int/string
	 */
	@Column(name = "filetype")
	private String filetype;
	
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
	public String getCategory1() {
		return category1;
	}
	public void setCategory1(String category1) {
		this.category1 = category1;
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
}
