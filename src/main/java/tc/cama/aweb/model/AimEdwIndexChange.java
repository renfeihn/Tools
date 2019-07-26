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
@Table(name = "aim_edw_index_change")
public class AimEdwIndexChange implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7865037671381208073L;
	/**
	 * 记录ID
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "GLOBAL")
	@Column(name = "id")
	private Integer id;
	
	/**
	 * 指标日期
	 */
	@Column(name = "etl_dt")
	private String etlDt;
	public String getEtlDt() {
		return etlDt;
	}

	public void setEtlDt(String etlDt) {
		this.etlDt = etlDt;
	}

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
	 * 优先级
	 */
	@Column(name = "priority")
	private Double priority;
	/**
	 * 指标值刷新日期yyyy-mm-dd HH:mm:ss.SSS
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "refresh_date")
	private Date refreshDate;
	
	@Column(name = "serialno")
	private String serialno;
	
	public String getSerialno() {
		return serialno;
	}

	public void setSerialno(String serialno) {
		this.serialno = serialno;
	}

	/**
	 * 上次指标值
	 */
	@Column(name = "prev_val")
	private Double prevVal;
	/**
	 * 当前指标值
	 */
	@Column(name = "curr_val")
	private Double currVal;
	/**
	 * 当前与上次指标差值
	 */
	@Column(name = "diff_val")
	private Double diffVal;
	
	/**
	 * 指标变化百分比
	 */
	@Column(name = "diff_percent")
	private Double diffPercent;

	public Double getDiffPercent() {
		return diffPercent;
	}

	public void setDiffPercent(Double diffPercent) {
		this.diffPercent = diffPercent;
	}

	/**
	 * normal-正常,lower-下浮预警,upper-上浮预警
	 */
	@Column(name = "status")
	private String status;

	/**
	 * @return 记录ID
	 */
	public Integer getId() {
		return this.id;
	}

	/**
	 * @param id
	 *            记录ID
	 */
	@Column(name = "id")
	public void setId(Integer id) {
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

	/**
	 * @return 指标值刷新日期yyyy-mm-dd HH:mm:ss.SSS
	 */
	public Date getRefreshDate() {
		return this.refreshDate;
	}

	/**
	 * @param refreshDate
	 *            指标值刷新日期yyyy-mm-dd HH:mm:ss.SSS
	 */
	@Column(name = "refresh_date")
	public void setRefreshDate(Date refreshDate) {
		this.refreshDate = refreshDate;
	}

	/**
	 * @return 上次指标值
	 */
	public Double getPrevVal() {
		return this.prevVal;
	}

	/**
	 * @param prevVal
	 *            上次指标值
	 */
	@Column(name = "prev_val")
	public void setPrevVal(Double prevVal) {
		this.prevVal = prevVal;
	}

	/**
	 * @return 当前指标值
	 */
	public Double getCurrVal() {
		return this.currVal;
	}

	/**
	 * @param currVal
	 *            当前指标值
	 */
	@Column(name = "curr_val")
	public void setCurrVal(Double currVal) {
		this.currVal = currVal;
	}

	/**
	 * @return 当前与上次指标差值
	 */
	public Double getDiffVal() {
		return this.diffVal;
	}

	/**
	 * @param diffVal
	 *            当前与上次指标差值
	 */
	@Column(name = "diff_val")
	public void setDiffVal(Double diffVal) {
		this.diffVal = diffVal;
	}

	/**
	 * @return normal-正常,lower-下浮预警,upper-上浮预警
	 */
	public String getStatus() {
		return this.status;
	}

	/**
	 * @param status
	 *            normal-正常,lower-下浮预警,upper-上浮预警
	 */
	@Column(name = "status")
	public void setStatus(String status) {
		this.status = status;
	}

}