package tc.cama.aweb.echarts.model;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
@Entity
@Table(name = "aim_config_echarts_page")
public class AimConfigEchartsPage implements Serializable {
	
	private static final long serialVersionUID = 1L;
	/**
	 *序号 由系统自动生成 
	 */
	@Id
	@SequenceGenerator(name = "", sequenceName = "AIMCONFIG")
	@Column(name = "id")
	private Integer id;
	/**
	 *名称
	 */
	@Column(name = "name")
	private String name;
	/**
	 *页面path
	 */
	@Column(name = "path")
	private String path;
	/**
	 *每个交易递增序号
	 */
	@Column(name = "seqno")
	private String seqno;
	/**
	 *Echart实例化配置表的ID
	 */
	@Column(name = "eid")
	private Integer eid;
	/**
	 *Echart实例化名称
	 */
	@Column(name = "ename")
	private String ename;
	/**
	 *Echart样式ID
	 */
	@Column(name = "etype_id")
	private Integer etypeId;
	/**
	 *@return 序号 由系统自动生成 
	 */
	public Integer getId(){return this.id;}
	/**
	 *@param id 序号 由系统自动生成 
	 */
	@Column(name = "id")
	public void setId(Integer id) {this.id = id;}
	/**
	 *@return 名称
	 */
	public String getName(){return this.name;}
	/**
	 *@param name 名称
	 */
	@Column(name = "name")
	public void setName(String name) {this.name = name;}
	/**
	 *@return 页面path
	 */
	public String getPath(){return this.path;}
	/**
	 *@param path 页面path
	 */
	@Column(name = "path")
	public void setPath(String path) {this.path = path;}
	/**
	 *@return 每个交易递增序号
	 */
	public String getSeqno(){return this.seqno;}
	/**
	 *@param seqno 每个交易递增序号
	 */
	@Column(name = "seqno")
	public void setSeqno(String seqno) {this.seqno = seqno;}
	/**
	 *@return Echart实例化配置表的ID
	 */
	public Integer getEid(){return this.eid;}
	/**
	 *@param eid Echart实例化配置表的ID
	 */
	@Column(name = "eid")
	public void setEid(Integer eid) {this.eid = eid;}
	/**
	 *@return Echart实例化名称
	 */
	public String getEname(){return this.ename;}
	/**
	 *@param ename Echart实例化名称
	 */
	@Column(name = "ename")
	public void setEname(String ename) {this.ename = ename;}
	/**
	 *@return Echart样式ID
	 */
	public Integer getEtypeId(){return this.etypeId;}
	/**
	 *@param etypeId Echart样式ID
	 */
	@Column(name = "etype_id")
	public void setEtypeId(Integer etypeId) {this.etypeId = etypeId;}

}