package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Table;
@Table(name = "aiml_cfg_log_source_rel")
public class AimlCfgLogSourceRel implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = -7013108052288797509L;
/**
 *日志源ID
*/
@Column(name = "sourceid")
private long sourceid;
/**
 *应用系统id
*/
@Column(name = "relappid")
private long relappid;
/**
 *应用系统名称
*/
@Column(name = "relappname")
private String relappname;
public long getRelappid() {
	return relappid;
}
public void setRelappid(long relappid) {
	this.relappid = relappid;
}
public String getRelappname() {
	return relappname;
}
public void setRelappname(String relappname) {
	this.relappname = relappname;
}
/**
 *关联日志id
*/
@Column(name = "relsourceid")
private long relsourceid;
/**
 *关联日志名称
*/
@Column(name = "relsourcename")
private String relsourcename;
/**
 *关联方式 0-全局流水 1-自定义
*/
@Column(name = "relway")
private String relway;
/**
 *关联字段
*/
@Column(name = "relfields")
private String relfields;
/**
 *@return 日志源ID
*/
public long getSourceid(){return this.sourceid;}
/**
 *@param sourceid 日志源ID
*/
public void setSourceid(long sourceid) {this.sourceid = sourceid;}
/**
 *@return 关联日志id
*/
public long getRelsourceid(){return this.relsourceid;}
/**
 *@param relsourceid 关联日志id
*/
public void setRelsourceid(long relsourceid) {this.relsourceid = relsourceid;}
/**
 *@return 关联日志名称
*/
public String getRelsourcename(){return this.relsourcename;}
/**
 *@param relsourcename 关联日志名称
*/
public void setRelsourcename(String relsourcename) {this.relsourcename = relsourcename;}
/**
 *@return 关联方式 0-全局流水 1-自定义
*/
public String getRelway(){return this.relway;}
/**
 *@param relway 关联方式 0-全局流水 1-自定义
*/
public void setRelway(String relway) {this.relway = relway;}
/**
 *@return 关联字段
*/
public String getRelfields(){return this.relfields;}
/**
 *@param relfields 关联字段
*/
public void setRelfields(String relfields) {this.relfields = relfields;}

}
