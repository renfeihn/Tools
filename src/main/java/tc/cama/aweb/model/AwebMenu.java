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
@Table(name = "aweb_menu")
public class AwebMenu implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2891978945849948234L;
	/**
	 * 自动生成id
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "mid")
	private Integer mid;
	/**
	 * 菜单路径
	 */
	@Column(name = "path")
	private String path;
	/**
	 * 菜单名称
	 */
	@Column(name = "name")
	private String name;
	/**
	 * 菜单顺序
	 */
	@Column(name = "seq")
	private Integer seq;
	/**
	 * 父菜单id
	 */
	@Column(name = "pregid")
	private int pregid;
	/**
	 * 添加人
	 */
	@Column(name = "create_user")
	private String createUser;
	/**
	 * 添加日期
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "create_time")
	private Date createTime;
	/**
	 * 交易状态 未启用-0, 启用-1
	 */
	@Column(name = "state")
	private Integer state;
	/**
	 * 菜单级别1：主菜单，2：左侧菜单
	 */
	@Column(name = "menu_level")
	private Integer menuLevel;
	/**
	 * 菜单标识1：分类，2：交易
	 */
	@Column(name = "menu_flag")
	private Integer menuFlag;
	/**
	 * 菜单图标的路径
	 */
	@Column(name = "icon_path")
	private String iconPath;

	/**
	 * @return 自动生成id
	 */
	public Integer getMid() {
		return this.mid;
	}

	/**
	 * @param mid
	 *            自动生成id
	 */
	public void setMid(Integer mid) {
		this.mid = mid;
	}

	/**
	 * @return 菜单路径
	 */
	public String getPath() {
		return this.path;
	}

	/**
	 * @param path
	 *            菜单路径
	 */
	public void setPath(String path) {
		this.path = path;
	}

	/**
	 * @return 菜单名称
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param name
	 *            菜单名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return 菜单顺序
	 */
	public Integer getSeq() {
		return this.seq;
	}

	/**
	 * @param seq
	 *            菜单顺序
	 */
	public void setSeq(Integer seq) {
		this.seq = seq;
	}

	/**
	 * @return 父菜单id
	 */
	public int getPregid() {
		return this.pregid;
	}

	/**
	 * @param pregid
	 *            父菜单id
	 */
	public void setPregid(int pregid) {
		this.pregid = pregid;
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
	 * @return 添加日期
	 */
	public Date getCreateTime() {
		return this.createTime;
	}

	/**
	 * @param createTime
	 *            添加日期
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * @return 交易状态 未启用-0, 启用-1
	 */
	public Integer getState() {
		return this.state;
	}

	/**
	 * @param state
	 *            交易状态 未启用-0, 启用-1
	 */
	public void setState(Integer state) {
		this.state = state;
	}

	/**
	 * @return 菜单级别1：主菜单，2：左侧菜单
	 */
	public Integer getMenuLevel() {
		return this.menuLevel;
	}

	/**
	 * @param menuLevel
	 *            菜单级别1：主菜单，2：左侧菜单
	 */
	public void setMenuLevel(Integer menuLevel) {
		this.menuLevel = menuLevel;
	}

	/**
	 * @return 菜单标识1：分类，2：交易
	 */
	public Integer getMenuFlag() {
		return this.menuFlag;
	}

	/**
	 * @param menuFlag
	 *            菜单标识1：分类，2：交易
	 */
	public void setMenuFlag(Integer menuFlag) {
		this.menuFlag = menuFlag;
	}

	/**
	 * @return 菜单图标的路径
	 */
	public String getIconPath() {
		return this.iconPath;
	}

	/**
	 * @param iconPath
	 *            菜单图标的路径
	 */
	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((createTime == null) ? 0 : createTime.hashCode());
		result = prime * result
				+ ((createUser == null) ? 0 : createUser.hashCode());
		result = prime * result
				+ ((iconPath == null) ? 0 : iconPath.hashCode());
		result = prime * result
				+ ((menuFlag == null) ? 0 : menuFlag.hashCode());
		result = prime * result
				+ ((menuLevel == null) ? 0 : menuLevel.hashCode());
		result = prime * result + ((mid == null) ? 0 : mid.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((path == null) ? 0 : path.hashCode());
		result = prime * result + pregid;
		result = prime * result + ((seq == null) ? 0 : seq.hashCode());
		result = prime * result + ((state == null) ? 0 : state.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AwebMenu other = (AwebMenu) obj;
		if (createTime == null) {
			if (other.createTime != null)
				return false;
		} else if (!createTime.equals(other.createTime))
			return false;
		if (createUser == null) {
			if (other.createUser != null)
				return false;
		} else if (!createUser.equals(other.createUser))
			return false;
		if (iconPath == null) {
			if (other.iconPath != null)
				return false;
		} else if (!iconPath.equals(other.iconPath))
			return false;
		if (menuFlag == null) {
			if (other.menuFlag != null)
				return false;
		} else if (!menuFlag.equals(other.menuFlag))
			return false;
		if (menuLevel == null) {
			if (other.menuLevel != null)
				return false;
		} else if (!menuLevel.equals(other.menuLevel))
			return false;
		if (mid == null) {
			if (other.mid != null)
				return false;
		} else if (!mid.equals(other.mid))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (path == null) {
			if (other.path != null)
				return false;
		} else if (!path.equals(other.path))
			return false;
		if (pregid != other.pregid)
			return false;
		if (seq == null) {
			if (other.seq != null)
				return false;
		} else if (!seq.equals(other.seq))
			return false;
		if (state == null) {
			if (other.state != null)
				return false;
		} else if (!state.equals(other.state))
			return false;
		return true;
	}

}