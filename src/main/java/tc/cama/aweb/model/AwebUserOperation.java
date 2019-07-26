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
@Table(name = "aweb_user_operation")
public class AwebUserOperation implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -7150995554715934645L;
	/**
	 *ID
	*/
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 *用户名
	*/
	@Column(name = "username")
	private String username;
	/**
	 *记录时间
	*/
	@JSONField(format="yyyy-MM-dd HH:mm:ss")
	@Column(name = "record_time")
	private Date time;
	/**
	 *交易
	*/
	@Column(name = "trade")
	private String trade;
	/**
	 *操作
	*/
	@Column(name = "operation")
	private String operation;
	/**
	 *@return ID
	*/
	public Integer getId(){
		return this.id;
	}
	/**
	 *@param id ID
	*/
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 *@return 用户名
	*/
	public String getUsername(){
		return this.username;
	}
	/**
	 *@param username 用户名
	*/
	@Column(name = "username")
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 *@return 记录时间
	*/
	public Date getTime(){
		return this.time;
	}
	/**
	 *@param time 记录时间
	*/
	@Column(name = "record_time")
	public void setTime(Date time) {
		this.time = time;
	}
	/**
	 *@return 交易
	*/
	public String getTrade(){
		return this.trade;
	}
	/**
	 *@param trade 交易
	*/
	@Column(name = "trade")
	public void setTrade(String trade) {
		this.trade = trade;
	}
	/**
	 *@return 操作
	*/
	public String getOperation(){
		return this.operation;
	}
	/**
	 *@param operation 操作
	*/
	@Column(name = "operation")
	public void setOperation(String operation) {
		this.operation = operation;
	}

}
