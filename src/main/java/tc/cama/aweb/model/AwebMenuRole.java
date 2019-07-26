package tc.cama.aweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "aweb_menu_role")
public class AwebMenuRole implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4422999753651127223L;
	/**
	 * 表记录id
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "regid")
	private Integer regid;
	/**
	 * 菜单ID
	 */
	@Column(name = "mid")
	private int mid;
	/**
	 * 角色ID
	 */
	@Column(name = "rid")
	private int rid;

	/**
	 * @return 表记录id
	 */
	public Integer getRegid() {
		return this.regid;
	}

	/**
	 * @param regid
	 *            表记录id
	 */
	public void setRegid(Integer regid) {
		this.regid = regid;
	}

	/**
	 * @return 菜单ID
	 */
	public int getMid() {
		return this.mid;
	}

	/**
	 * @param mid
	 *            菜单ID
	 */
	public void setMid(int mid) {
		this.mid = mid;
	}

	/**
	 * @return 角色ID
	 */
	public int getRid() {
		return this.rid;
	}

	/**
	 * @param rid
	 *            角色ID
	 */
	public void setRid(int rid) {
		this.rid = rid;
	}

}