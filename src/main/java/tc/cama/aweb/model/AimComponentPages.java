package tc.cama.aweb.model;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_component_pages")
public class AimComponentPages implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1460176991144967747L;
	/**
	 * id
	 */
	@Column(name = "id")
	private String id;
	/**
	 * 页面名称
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 创建者
	 */
	@Column(name = "createuser")
	private String createuser;
	/**
	 * 更新时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "updatetime")
	private Date updatetime;
	/**
	 * 创建时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "createtime")
	private Date createtime;
	/**
	 * 用户组
	 */
	@Column(name = "usergroup")
	private String usergroup;
	/**
	 * 分享与否 0私有的 1分享的
	 */
	@Column(name = "sharegroup")
	private String sharegroup;
	/**
	 * 描述
	 */
	@Column(name = "description")
	private String description;
	/**
	 * 昵称
	 */
	@Column(name = "nickname")
	private String nickname;
	/**
	 * 页面样式
	 */
	@Column(name = "config")
	private String config;

	/**
	 * @return id
	 */
	public String getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            id
	 */
	@Column(name = "id")
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return 页面名称
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            页面名称
	 */
	@Column(name = "name")
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 创建者
	 */
	public String getCreateuser() {
		return this.createuser;
	}

	/**
	 * @param createuser
	 *            创建者
	 */
	@Column(name = "createuser")
	public void setCreateuser(String createuser) {
		this.createuser = createuser;
	}

	/**
	 * @return 更新时间
	 */
	public Date getUpdatetime() {
		return this.updatetime;
	}

	/**
	 * @param updatetime
	 *            更新时间
	 */
	@Column(name = "updatetime")
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}

	/**
	 * @return 创建时间
	 */
	public Date getCreatetime() {
		return this.createtime;
	}

	/**
	 * @param createtime
	 *            创建时间
	 */
	@Column(name = "createtime")
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	/**
	 * @return 用户组
	 */
	public String getUsergroup() {
		return this.usergroup;
	}

	/**
	 * @param usergroup
	 *            用户组
	 */
	@Column(name = "usergroup")
	public void setUsergroup(String usergroup) {
		this.usergroup = usergroup;
	}

	/**
	 * @return 分享与否 0私有的 1分享的
	 */
	public String getSharegroup() {
		return this.sharegroup;
	}

	/**
	 * @param sharegroup
	 *            分享与否 0私有的 1分享的
	 */
	@Column(name = "sharegroup")
	public void setSharegroup(String sharegroup) {
		this.sharegroup = sharegroup;
	}

	/**
	 * @return 描述
	 */
	public String getDescription() {
		return this.description;
	}

	/**
	 * @param description
	 *            描述
	 */
	@Column(name = "description")
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return 昵称
	 */
	public String getNickname() {
		return this.nickname;
	}

	/**
	 * @param nickname
	 *            昵称
	 */
	@Column(name = "nickname")
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	/**
	 * @return 页面样式
	 */
	public String getConfig() {
		return this.config;
	}

	/**
	 * @param config
	 *            页面样式
	 */
	@Column(name = "config")
	public void setConfig(String config) {
		this.config = config;
	}
	 public AimComponentPages(){
	        this.id=java.util.UUID.randomUUID().toString();
	        this.createtime=new Date();
	    }

	
}
