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
@Table(name = "aweb_role")
public class AwebRole implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7531958234418353489L;
	/**
	 * 角色id自动生成
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "rid")
	private Integer rid;
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
	 * @return 角色id自动生成
	 */
	public Integer getRid() {
		return this.rid;
	}

	/**
	 * @param rid
	 *            角色id自动生成
	 */
	public void setRid(Integer rid) {
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