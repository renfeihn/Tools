package tc.bank.asda.logconfig.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Table;
@Table(name = "aiml_cfg_log_sourcerole")
public class AimlCfgLogSourcerole implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = 8789883857477999293L;
/**
 *日志源ID
*/
@Column(name = "sourceid")
private Long sourceid;
/**
 *角色id
*/
@Column(name = "sourceroles")
private String sourceroles;
/**
 *角色名称
*/
@Column(name = "rolenames")
private String rolenames;
/**
 *@return 日志源ID
*/
public Long getSourceid(){return this.sourceid;}
/**
 *@param sourceid 日志源ID
*/
public void setSourceid(Long sourceid) {this.sourceid = sourceid;}
/**
 *@return 角色id
*/
public String getSourceroles(){return this.sourceroles;}
/**
 *@param sourceroles 角色id
*/
public void setSourceroles(String sourceroles) {this.sourceroles = sourceroles;}
/**
 *@return 角色名称
*/
public String getRolenames(){return this.rolenames;}
/**
 *@param rolenames 角色名称
*/
public void setRolenames(String rolenames) {this.rolenames = rolenames;}

}
