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
@Table(name = "aim_config_sample")
public class AimConfigSample implements Serializable {
	private static final long serialVersionUID = -5838633870829381009L;
	/**
	 * ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	/**
	 * 对象ID
	 */
	@Column(name = "mobj_id")
	private int mobjId;
	/**
	 * 运行对象ID
	 */
	@Column(name = "run_mobj_id")
	private int runMobjId;
	/**
	 * 指标ID
	 */
	@Column(name = "mid")
	private int mid;
	/**
	 * 指标配置ID
	 */
	@Column(name = "mcid")
	private int mcid;
	/**
	 * 采集周期 单位秒
	 */
	@Column(name = "sampling_period")
	private int samplingPeriod;
	/**
	 * 可用: 1/0
	 */
	@Column(name = "enabled")
	private Integer enabled;
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
	 * @return 对象ID
	 */
	public int getMobjId() {
		return this.mobjId;
	}

	/**
	 * @param mobjId
	 *            对象ID
	 */
	public void setMobjId(int mobjId) {
		this.mobjId = mobjId;
	}

	/**
	 * @return 运行对象ID
	 */
	public int getRunMobjId() {
		return this.runMobjId;
	}

	/**
	 * @param runMobjId
	 *            运行对象ID
	 */
	public void setRunMobjId(int runMobjId) {
		this.runMobjId = runMobjId;
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
	 * @return 指标配置ID
	 */
	public int getMcid() {
		return this.mcid;
	}

	/**
	 * @param mcid
	 *            指标配置ID
	 */
	public void setMcid(int mcid) {
		this.mcid = mcid;
	}

	/**
	 * @return 采集周期 单位秒
	 */
	public int getSamplingPeriod() {
		return this.samplingPeriod;
	}

	/**
	 * @param samplingPeriod
	 *            采集周期 单位秒
	 */
	public void setSamplingPeriod(int samplingPeriod) {
		this.samplingPeriod = samplingPeriod;
	}

	/**
	 * @return 可用: 1/0
	 */
	public Integer getEnabled() {
		return this.enabled;
	}

	/**
	 * @param enabled
	 *            可用: 1/0
	 */
	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
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
