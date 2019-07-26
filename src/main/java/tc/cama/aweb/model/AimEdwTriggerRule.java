package tc.cama.aweb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "aim_edw_trigger_rule")
public class AimEdwTriggerRule implements Serializable {

	private static final long serialVersionUID = -1488899328309880566L;
	/**
	 *规则ID
	*/
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	/**
	 * 数据分类
	 */
	@Column(name = "etl_tp")
	private String etlTp;
	/**
	 * 指标编号
	 */
	@Column(name = "index_no")
	private String indexNo;
	/**
	 * 指标名称
	 */
	@Column(name = "index_nm")
	private String indexNm;
	/**
	 * 指标分类
	 */
	@Column(name = "index_cly")
	private String indexCly;
	/**
	 * 机构号
	 */
	@Column(name = "org_cd")
	private String orgCd;
	/**
	 * 频度
	 */
	@Column(name = "freq")
	private String freq;
	/**
	 * 指标下浮的百分比
	 */
	@Column(name = "lower_limit")
	private Double lowerLimit;
	/**
	 * 指标上浮的百分比
	 */
	@Column(name = "upper_limit")
	private Double upperLimit;
	/**
	 * 优先级
	 */
	@Column(name = "priority")
	private Double priority;

	/**
	 * @return 规则ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            规则ID
	 */
	@Column(name = "id")
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return 数据分类
	 */
	public String getEtlTp() {
		return this.etlTp;
	}

	/**
	 * @param etlTp
	 *            数据分类
	 */
	@Column(name = "etl_tp")
	public void setEtlTp(String etlTp) {
		this.etlTp = etlTp;
	}

	/**
	 * @return 指标编号
	 */
	public String getIndexNo() {
		return this.indexNo;
	}

	/**
	 * @param indexNo
	 *            指标编号
	 */
	@Column(name = "index_no")
	public void setIndexNo(String indexNo) {
		this.indexNo = indexNo;
	}

	/**
	 * @return 指标名称
	 */
	public String getIndexNm() {
		return this.indexNm;
	}

	/**
	 * @param indexNm
	 *            指标名称
	 */
	@Column(name = "index_nm")
	public void setIndexNm(String indexNm) {
		this.indexNm = indexNm;
	}

	/**
	 * @return 指标分类
	 */
	public String getIndexCly() {
		return this.indexCly;
	}

	/**
	 * @param indexCly
	 *            指标分类
	 */
	@Column(name = "index_cly")
	public void setIndexCly(String indexCly) {
		this.indexCly = indexCly;
	}

	/**
	 * @return 机构号
	 */
	public String getOrgCd() {
		return this.orgCd;
	}

	/**
	 * @param orgCd
	 *            机构号
	 */
	@Column(name = "org_cd")
	public void setOrgCd(String orgCd) {
		this.orgCd = orgCd;
	}

	/**
	 * @return 频度
	 */
	public String getFreq() {
		return this.freq;
	}

	/**
	 * @param freq
	 *            频度
	 */
	@Column(name = "freq")
	public void setFreq(String freq) {
		this.freq = freq;
	}

	/**
	 * @return 指标下浮的百分比
	 */
	public Double getLowerLimit() {
		return this.lowerLimit;
	}

	/**
	 * @param lowerLimit
	 *            指标下浮的百分比
	 */
	@Column(name = "lower_limit")
	public void setLowerLimit(Double lowerLimit) {
		this.lowerLimit = lowerLimit;
	}

	/**
	 * @return 指标上浮的百分比
	 */
	public Double getUpperLimit() {
		return this.upperLimit;
	}

	/**
	 * @param upperLimit
	 *            指标上浮的百分比
	 */
	@Column(name = "upper_limit")
	public void setUpperLimit(Double upperLimit) {
		this.upperLimit = upperLimit;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return 优先级
	 */
	public Double getPriority() {
		return this.priority;
	}

	/**
	 * @param priority
	 *            优先级
	 */
	@Column(name = "priority")
	public void setPriority(Double priority) {
		this.priority = priority;
	}

	public String getKey() {
		String key = this.getEtlTp();
		key += "_" + this.getIndexNo();
		key += "_" + this.getIndexCly();
		key += "_" + this.getOrgCd();
		key += "_" + this.getFreq();
		return key;
	}
}