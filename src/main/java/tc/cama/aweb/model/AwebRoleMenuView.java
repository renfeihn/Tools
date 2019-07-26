package tc.cama.aweb.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aweb_role_menu_view")
public class AwebRoleMenuView implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3883403101933431163L;
	/**
	 * 角色ID
	 */
	@Column(name = "rid")
	private int rid;
	/**
	 * 自动生成id
	 */
	@Column(name = "mid")
	private int mid;
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

	/**
	 * @return 自动生成id
	 */
	public int getMid() {
		return this.mid;
	}

	/**
	 * @param mid
	 *            自动生成id
	 */
	public void setMid(int mid) {
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

}