package tc.cama.aweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "aweb_role_user")
public class AwebRoleUser implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2409996743791271714L;
	/**
	 * 表记录id
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "ruid")
	private Integer ruid;
	/**
	 * 角色id
	 */
	@Column(name = "rid")
	private int rid;
	/**
	 * 用户名
	 */
	@Column(name = "username")
	private String username;

	/**
	 * @return 表记录id
	 */
	public Integer getRuid() {
		return this.ruid;
	}

	/**
	 * @param ruid
	 *            表记录id
	 */
	public void setRuid(Integer ruid) {
		this.ruid = ruid;
	}

	/**
	 * @return 角色id
	 */
	public int getRid() {
		return this.rid;
	}

	/**
	 * @param rid
	 *            角色id
	 */
	public void setRid(int rid) {
		this.rid = rid;
	}

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

}