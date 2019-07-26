package tc.cama.aweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "aweb_user_attention_obj")
public class AwebUserAttentionObj implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6216188609534358695L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 用户名
	 */
	@Column(name = "username")
	private String username;
	/**
	 * 对象ID
	 */
	@Column(name = "obj_id")
	private int objId;

	/**
	 * @return ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            ID
	 */
	public void setId(Integer id) {
		this.id = id;
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

	/**
	 * @return 对象ID
	 */
	public int getObjId() {
		return this.objId;
	}

	/**
	 * @param objId
	 *            对象ID
	 */
	public void setObjId(int objId) {
		this.objId = objId;
	}

}