package tc.bank.cama.core.module;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.aim.alibaba.fastjson.annotation.JSONField;

@Entity
@Table(name = "aim_config_metric")
public class AimConfigMetric implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8270010917516611083L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 指标ID
	 */
	@Column(name = "mid")
	private int mid;
	/**
	 * 命令类型:系统命令-0默认0
	 */
	@Column(name = "cmd_type")
	private Integer cmdType;
	/**
	 * 版本类型:所有版本-0,windows-1,unix-2,aix-3
	 */
	@Column(name = "cmd_ver")
	private Integer cmdVer;
	/**
	 * 采集命令
	 */
	@Column(name = "cmd")
	private String cmd;
	/**
	 * 解析器
	 */
	@Column(name = "parser")
	private String parser;
	/**
	 * 解析参数
	 */
	@Column(name = "parser_params")
	private String parserParams;
	/**
	 * 表达式类型 xy-0,ognl-1
	 */
	@Column(name = "exp_type")
	private Integer expType;
	/**
	 * 表达式
	 */
	@Column(name = "exp")
	private String exp;
	/**
	 * 采集周期 单位秒
	 */
	@Column(name = "sampling_period")
	private Integer samplingPeriod;
	/**
	 * 描述
	 */
	@Column(name = "description")
	private String description;
	/**
	 * 创建时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "created")
	private Date created;
	/**
	 * 更新时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "modified")
	private Date modified;

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
	 * @return 指标ID
	 */
	public int getMid() {
		return this.mid;
	}

	/**
	 * @param mid
	 *            指标ID
	 */
	public void setMid(int mid) {
		this.mid = mid;
	}

	/**
	 * @return 命令类型:系统命令-0默认0
	 */
	public Integer getCmdType() {
		return this.cmdType;
	}

	/**
	 * @param cmdType
	 *            命令类型:系统命令-0默认0
	 */
	public void setCmdType(Integer cmdType) {
		this.cmdType = cmdType;
	}

	/**
	 * @return 版本类型:所有版本-0,windows-1,unix-2,aix-3
	 */
	public Integer getCmdVer() {
		return this.cmdVer;
	}

	/**
	 * @param cmdVer
	 *            版本类型:所有版本-0,windows-1,unix-2,aix-3
	 */
	public void setCmdVer(Integer cmdVer) {
		this.cmdVer = cmdVer;
	}

	/**
	 * @return 采集命令
	 */
	public String getCmd() {
		return this.cmd;
	}

	/**
	 * @param cmd
	 *            采集命令
	 */
	public void setCmd(String cmd) {
		this.cmd = cmd;
	}

	/**
	 * @return 解析器
	 */
	public String getParser() {
		return this.parser;
	}

	/**
	 * @param parser
	 *            解析器
	 */
	public void setParser(String parser) {
		this.parser = parser;
	}

	/**
	 * @return 解析参数
	 */
	public String getParserParams() {
		return this.parserParams;
	}

	/**
	 * @param parserParams
	 *            解析参数
	 */
	public void setParserParams(String parserParams) {
		this.parserParams = parserParams;
	}

	/**
	 * @return 表达式类型 xy-0,ognl-1
	 */
	public Integer getExpType() {
		return this.expType;
	}

	/**
	 * @param expType
	 *            表达式类型 xy-0,ognl-1
	 */
	public void setExpType(Integer expType) {
		this.expType = expType;
	}

	/**
	 * @return 表达式
	 */
	public String getExp() {
		return this.exp;
	}

	/**
	 * @param exp
	 *            表达式
	 */
	public void setExp(String exp) {
		this.exp = exp;
	}

	/**
	 * @return 采集周期 单位秒
	 */
	public Integer getSamplingPeriod() {
		return this.samplingPeriod;
	}

	/**
	 * @param samplingPeriod
	 *            采集周期 单位秒
	 */
	public void setSamplingPeriod(Integer samplingPeriod) {
		this.samplingPeriod = samplingPeriod;
	}

	/**
	 * @return 描述
	 */
	public String getDescription() {
		return this.description;
	}

	/**
	 * @param description
	 *            描述
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return 创建时间
	 */
	public Date getCreated() {
		return this.created;
	}

	/**
	 * @param created
	 *            创建时间
	 */
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return 更新时间
	 */
	public Date getModified() {
		return this.modified;
	}

	/**
	 * @param modified
	 *            更新时间
	 */
	public void setModified(Date modified) {
		this.modified = modified;
	}

}