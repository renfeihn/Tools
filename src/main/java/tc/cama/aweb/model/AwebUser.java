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
@Table(name = "Aweb_user")
public class AwebUser implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2281631656005605011L;
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
	 * 密码
	 */
	@Column(name = "password")
	private String password;
	/**
	 * 昵称
	 */
	@Column(name = "nickname")
	private String nickname;
	/**
	 * 用户ID
	 */
	@Column(name = "userid")
	private String userid;
	/**
	 * ip
	 */
	@Column(name = "ip")
	private String ip;
	/**
	 * 机构号
	 */
	@Column(name = "brno")
	private String brno;
	/**
	 * 用户组
	 */
	@Column(name = "usergroup")
	private String usergroup;
	/**
	 * 电话
	 */
	@Column(name = "telephone")
	private String telephone;
	/**
	 * mail
	 */
	@Column(name = "mail")
	private String mail;
	/**
	 * 微信
	 */
	@Column(name = "wx")
	private String wx;
	/**
	 * 创建人
	 */
	@Column(name = "create_user")
	private String createUser;
	/**
	 * 创建日期
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "create_time")
	private Date createTime;
	/**
	 * 更新日期
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "update_time")
	private Date updateTime;
	/**
	 * 最后登录时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "login_time")
	private Date loginTime;
	/**
	 * 锁定时间
	 */
	@Column(name = "lock_time")
	private Date lockTime;
	/**
	 * 连续登录错误次数
	 */
	@Column(name = "continuous_error_num")
	private Integer continuousErrorNum;
	/**
	 * 状态 0:未生效，1:生效 , 2:锁定
	 */
	@Column(name = "state")
	private Integer state;
	/**
	 * 用户类型，0:普通用户，1:管理员
	 */
	@Column(name = "user_type")
	private Integer userType;
	/**
	 * 备注
	 */
	@Column(name = "remark")
	private String remark;

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
	 * @return 密码
	 */
	public String getPassword() {
		return this.password;
	}

	/**
	 * @param password
	 *            密码
	 */
	public void setPassword(String password) {
		this.password = password;
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
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	/**
	 * @return 用户ID
	 */
	public String getUserid() {
		return this.userid;
	}

	/**
	 * @param userid
	 *            用户ID
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}

	/**
	 * @return ip
	 */
	public String getIp() {
		return this.ip;
	}

	/**
	 * @param ip
	 *            ip
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * @return 机构号
	 */
	public String getBrno() {
		return this.brno;
	}

	/**
	 * @param brno
	 *            机构号
	 */
	public void setBrno(String brno) {
		this.brno = brno;
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
	public void setUsergroup(String usergroup) {
		this.usergroup = usergroup;
	}

	/**
	 * @return 电话
	 */
	public String getTelephone() {
		return this.telephone;
	}

	/**
	 * @param telephone
	 *            电话
	 */
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	/**
	 * @return mail
	 */
	public String getMail() {
		return this.mail;
	}

	/**
	 * @param mail
	 *            mail
	 */
	public void setMail(String mail) {
		this.mail = mail;
	}

	/**
	 * @return 微信
	 */
	public String getWx() {
		return this.wx;
	}

	/**
	 * @param wx
	 *            微信
	 */
	public void setWx(String wx) {
		this.wx = wx;
	}

	/**
	 * @return 创建人
	 */
	public String getCreateUser() {
		return this.createUser;
	}

	/**
	 * @param createUser
	 *            创建人
	 */
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	/**
	 * @return 创建日期
	 */
	public Date getCreateTime() {
		return this.createTime;
	}

	/**
	 * @param createTime
	 *            创建日期
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * @return 更新日期
	 */
	public Date getUpdateTime() {
		return this.updateTime;
	}

	/**
	 * @param updateTime
	 *            更新日期
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	/**
	 * @return 最后登录时间
	 */
	public Date getLoginTime() {
		return this.loginTime;
	}

	/**
	 * @param loginTime
	 *            最后登录时间
	 */
	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	/**
	 * @return 锁定时间
	 */
	public Date getLockTime() {
		return this.lockTime;
	}

	/**
	 * @param lockTime
	 *            锁定时间
	 */
	public void setLockTime(Date lockTime) {
		this.lockTime = lockTime;
	}

	/**
	 * @return 连续登录错误次数
	 */
	public Integer getContinuousErrorNum() {
		return this.continuousErrorNum;
	}

	/**
	 * @param continuousErrorNum
	 *            连续登录错误次数
	 */
	public void setContinuousErrorNum(Integer continuousErrorNum) {
		this.continuousErrorNum = continuousErrorNum;
	}

	/**
	 * @return 状态 0:未生效，1:生效 , 2:锁定
	 */
	public Integer getState() {
		return this.state;
	}

	/**
	 * @param state
	 *            状态 0:未生效，1:生效 , 2:锁定
	 */
	public void setState(Integer state) {
		this.state = state;
	}

	/**
	 * @return 用户类型，0:普通用户，1:管理员
	 */
	public Integer getUserType() {
		return this.userType;
	}

	/**
	 * @param userType
	 *            用户类型，0:普通用户，1:管理员
	 */
	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	/**
	 * @return 备注
	 */
	public String getRemark() {
		return this.remark;
	}

	/**
	 * @param remark
	 *            备注
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}

}