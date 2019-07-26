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
@Table(name = "aim_config_measure")
public class AimConfigMeasure implements Serializable {
	private static final long serialVersionUID = -20845692752367003L;
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
	 * 取值名称 如CPU使用率
	 */
	@Column(name = "eval_name")
	private String evalName;
	/**
	 * 取值函数
	 */
	@Column(name = "eval")
	private String eval;
	/**
	 * 函数名称 如大于，小于
	 */
	@Column(name = "func_name")
	private String funcName;
	/**
	 * 计算函数 只返回true/false
	 * gt/lt/ge/le/eq/neq/contains/exclsive/startwith/endwith/in/nin
	 */
	@Column(name = "func")
	private String func;
	/**
	 * 描述如CPU使用率较低可能是由于服务器计算机的错误所造成
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
	 * @return 取值名称 如CPU使用率
	 */
	public String getEvalName() {
		return this.evalName;
	}

	/**
	 * @param evalName
	 *            取值名称 如CPU使用率
	 */
	public void setEvalName(String evalName) {
		this.evalName = evalName;
	}

	/**
	 * @return 取值函数
	 */
	public String getEval() {
		return this.eval;
	}

	/**
	 * @param eval
	 *            取值函数
	 */
	public void setEval(String eval) {
		this.eval = eval;
	}

	/**
	 * @return 函数名称 如大于，小于
	 */
	public String getFuncName() {
		return this.funcName;
	}

	/**
	 * @param funcName
	 *            函数名称 如大于，小于
	 */
	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}

	/**
	 * @return 计算函数 只返回true/false
	 *         gt/lt/ge/le/eq/neq/contains/exclsive/startwith/endwith/in/nin
	 */
	public String getFunc() {
		return this.func;
	}

	/**
	 * @param func
	 *            计算函数 只返回true/false
	 *            gt/lt/ge/le/eq/neq/contains/exclsive/startwith/endwith/in/nin
	 */
	public void setFunc(String func) {
		this.func = func;
	}

	/**
	 * @return 描述如CPU使用率较低可能是由于服务器计算机的错误所造成
	 */
	public String getDescription() {
		return this.description;
	}

	/**
	 * @param description
	 *            描述如CPU使用率较低可能是由于服务器计算机的错误所造成
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
