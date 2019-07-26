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
@Table(name = "aweb_user_group")
public class AwebUserGroup implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 分组名字
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 分组id
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "groupid")
	private Integer groupid;
	/**
	 * 创建人
	 */
	@Column(name = "createuser")
	private String createuser;
	/**
	 * 创建时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "createtime")
	private Date createtime;

	/**
	 * @return 分组名字
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            分组名字
	 */
	@Column(name = "name")
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 分组id
	 */
	public Integer getGroupid() {
		return this.groupid;
	}

	/**
	 * @param groupid
	 *            分组id
	 */
	@Column(name = "groupid")
	public void setGroupid(Integer groupid) {
		this.groupid = groupid;
	}

	/**
	 * @return 创建人
	 */
	public String getCreateuser() {
		return this.createuser;
	}

	/**
	 * @param createuser
	 *            创建人
	 */
	@Column(name = "createuser")
	public void setCreateuser(String createuser) {
		this.createuser = createuser;
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

}