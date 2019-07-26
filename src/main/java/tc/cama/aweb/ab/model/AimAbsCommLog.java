package tc.cama.aweb.ab.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_abs_comm_log")
public class AimAbsCommLog implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3861849762505023020L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 日期
	 */
	@JSONField(format="yyyy-MM-dd")
	@Column(name = "logdate")
	private String logdate;
	/**
	 * 时间
	 */
	@JSONField(format="HH:mm:ss")
	@Column(name = "logtime")
	private String logtime;
	/**
	 * 交易ID
	 */
	@Column(name = "tradeid")
	private String tradeid;
	/**
	 * INVOKEID
	 */
	@Column(name = "invokeid")
	private String invokeid;
	/**
	 * ABS地址
	 */
	@Column(name = "absoid")
	private String absoid;
	/**
	 * ABCOID
	 */
	@Column(name = "abcoid")
	private String abcoid;
	/**
	 * METHOD
	 */
	@Column(name = "method")
	private String method;
	/**
	 * 交易名程
	 */
	@Column(name = "tradename")
	private String tradename;
	/**
	 * RADEPATH
	 */
	@Column(name = "tradepath")
	private String tradepath;

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
	@Column(name = "id")
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return 日期
	 */
	public String getLogdate() {
		return this.logdate;
	}

	/**
	 * @param logdate
	 *            日期
	 */
	@Column(name = "logdate")
	public void setLogdate(String logdate) {
		this.logdate = logdate;
	}

	/**
	 * @return 时间
	 */
	public String getLogtime() {
		return this.logtime;
	}

	/**
	 * @param logtime
	 *            时间
	 */
	@Column(name = "logtime")
	public void setLogtime(String logtime) {
		this.logtime = logtime;
	}

	/**
	 * @return 交易ID
	 */
	public String getTradeid() {
		return this.tradeid;
	}

	/**
	 * @param tradeid
	 *            交易ID
	 */
	@Column(name = "tradeid")
	public void setTradeid(String tradeid) {
		this.tradeid = tradeid;
	}

	/**
	 * @return INVOKEID
	 */
	public String getInvokeid() {
		return this.invokeid;
	}

	/**
	 * @param invokeid
	 *            INVOKEID
	 */
	@Column(name = "invokeid")
	public void setInvokeid(String invokeid) {
		this.invokeid = invokeid;
	}

	/**
	 * @return ABS地址
	 */
	public String getAbsoid() {
		return this.absoid;
	}

	/**
	 * @param absoid
	 *            ABS地址
	 */
	@Column(name = "absoid")
	public void setAbsoid(String absoid) {
		this.absoid = absoid;
	}

	/**
	 * @return ABCOID
	 */
	public String getAbcoid() {
		return this.abcoid;
	}

	/**
	 * @param abcoid
	 *            ABCOID
	 */
	@Column(name = "abcoid")
	public void setAbcoid(String abcoid) {
		this.abcoid = abcoid;
	}

	/**
	 * @return METHOD
	 */
	public String getMethod() {
		return this.method;
	}

	/**
	 * @param method
	 *            METHOD
	 */
	@Column(name = "method")
	public void setMethod(String method) {
		this.method = method;
	}

	/**
	 * @return 交易名程
	 */
	public String getTradename() {
		return this.tradename;
	}

	/**
	 * @param tradename
	 *            交易名程
	 */
	@Column(name = "tradename")
	public void setTradename(String tradename) {
		this.tradename = tradename;
	}

	/**
	 * @return RADEPATH
	 */
	public String getTradepath() {
		return this.tradepath;
	}

	/**
	 * @param tradepath
	 *            RADEPATH
	 */
	@Column(name = "tradepath")
	public void setTradepath(String tradepath) {
		this.tradepath = tradepath;
	}

}