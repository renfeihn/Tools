package tc.cama.aweb.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;
@Entity
@Table(name = "aiml_keywords_config")
public class AimlKeywordsConfig implements Serializable {
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
/**
 *ID
*/
@Id
@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
@Column(name = "id")
private Integer id;
/**
 * 系统码
 */
@Column(name = "app")
private String app;
/**
 * 应用系统对象Id
 */
@Column(name = "app_id")
private Integer appId;
@Column(name = "seqno")
private Integer seqno;
/**
 *文件名
*/
@Column(name = "pattern")
private String pattern;
/**
 *关键字类型
*/
@Column(name = "keywords_type")
private Integer keywordsType;
/**
 *关键字配置
*/
@Column(name = "keywords_config")
private String keywordsConfig;
/**
 *是否启用
*/
@Column(name = "enabled")
private Integer enabled;
/**
 *创建时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "created")
private Date created;
/**
 *更新时间
*/
@JSONField(format="yyyy-MM-dd HH:mm:ss")
@Column(name = "modified")
private Date modified;
/**
 *@return ID
*/
public Integer getId(){return this.id;}
/**
 *@param id ID
*/
@Column(name = "id")
public void setId(Integer id) {this.id = id;}
/**
 * 系统码
 * @return
 */
public String getApp() {
	return app;
}
/**
 * 系统码
 * @param app
 */
@Column(name = "app")
public void setApp(String app) {
	this.app = app;
}
/**
 * 应用系统编号Id
 * @return
 */
public Integer getAppId() {
	return appId;
}
/**
 * 应用系统编号Id
 * @param appId
 */
@Column(name = "app_id")
public void setAppId(Integer appId) {
	this.appId = appId;
}
/**
 *@return %s
*/
public Integer getSeqno(){return this.seqno;}
/**
 *@param %s %s
*/
@Column(name = "%s")
public void setSeqno(Integer seqno) {this.seqno = seqno;}
/**
 *@return 文件名
*/
public String getPattern(){return this.pattern;}
/**
 *@param pattern 文件名
*/
@Column(name = "pattern")
public void setPattern(String pattern) {this.pattern = pattern;}
/**
 *@return 关键字类型
*/
public Integer getKeywordsType(){return this.keywordsType;}
/**
 *@param keywordsType 关键字类型
*/
@Column(name = "keywords_type")
public void setKeywordsType(Integer keywordsType) {this.keywordsType = keywordsType;}
/**
 *@return 关键字配置
*/
public String getKeywordsConfig(){return this.keywordsConfig;}
/**
 *@param keywordsConfig 关键字配置
*/
@Column(name = "keywords_config")
public void setKeywordsConfig(String keywordsConfig) {this.keywordsConfig = keywordsConfig;}
/**
 *@return 是否启用
*/
public Integer getEnabled(){return this.enabled;}
/**
 *@param enabled 是否启用
*/
@Column(name = "enabled")
public void setEnabled(Integer enabled) {this.enabled = enabled;}
/**
 *@return 创建时间
*/
public Date getCreated(){return this.created;}
/**
 *@param created 创建时间
*/
@Column(name = "created")
public void setCreated(Date created) {this.created = created;}
/**
 *@return 更新时间
*/
public Date getModified(){return this.modified;}
/**
 *@param modified 更新时间
*/
@Column(name = "modified")
public void setModified(Date modified) {this.modified = modified;}

}