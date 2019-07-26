package tc.cama.aweb.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aweb_user_role_view")
public class AwebUserRoleView implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6065356740410460625L;
	/**
	 * 用户名
	 */
	@Column(name = "username")
	private String username;
	/**
	 * 角色id自动生成
	 */
	@Column(name = "rid")
	private int rid;
	/**
	 * 角色描述
	 */
	@Column(name = "descp")
	private String descp;
	/**
	 * 角色名称
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 角色启用状态：0：未生效 1：生效
	 */
	@Column(name = "state")
	private Integer state;
	/**
	 * 添加人
	 */
	@Column(name = "create_user")
	private String createUser;
	/**
	 * 添加时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "create_time")
	private Date createTime;
	/**
	 * 权限配置状态 0：未配置 1：已配置
	 */
	@Column(name = "status")
	private Integer status;

	/**
	 * @return 用户名
	 */
	public String getUsername() {
		return this.username;
	}

	/**
	 * @param username
	 *            用户名
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return 角色id自动生成
	 */
	public int getRid() {
		return this.rid;
	}

	/**
	 * @param rid
	 *            角色id自动生成
	 */
	public void setRid(int rid) {
		this.rid = rid;
	}

	/**
	 * @return 角色描述
	 */
	public String getDescp() {
		return this.descp;
	}

	/**
	 * @param descp
	 *            角色描述
	 */
	public void setDescp(String descp) {
		this.descp = descp;
	}

	/**
	 * @return 角色名称
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            角色名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 角色启用状态：0：未生效 1：生效
	 */
	public Integer getState() {
		return this.state;
	}

	/**
	 * @param state
	 *            角色启用状态：0：未生效 1：生效
	 */
	public void setState(Integer state) {
		this.state = state;
	}

	/**
	 * @return 添加人
	 */
	public String getCreateUser() {
		return this.createUser;
	}

	/**
	 * @param createUser
	 *            添加人
	 */
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	/**
	 * @return 添加时间
	 */
	public Date getCreateTime() {
		return this.createTime;
	}

	/**
	 * @param createTime
	 *            添加时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * @return 权限配置状态 0：未配置 1：已配置
	 */
	public Integer getStatus() {
		return this.status;
	}

	/**
	 * @param status
	 *            权限配置状态 0：未配置 1：已配置
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

}