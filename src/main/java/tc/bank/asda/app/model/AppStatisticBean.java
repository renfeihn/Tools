package tc.bank.asda.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "aiml_app_statistic")
public class AppStatisticBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9146494169144429781L;
	/**
	 * 主键ID
	 */
	@Column(name = "id")
	private long id;
	/**
	 * 作用类型
	 */
	@Column(name = "type")
	private int type;

	/**
	 * 对象名
	 */
	@Column(name = "obj_name")
	private String objName;
	/**
	 * 执行SQL
	 */
	@Column(name = "es_sql")
	private String esSql;
	/**
	 * 指标说明
	 */
	@Column(name = "ret_desc")
	private String retDesc;
	
	/**
	 * 图表类型 1 柱状图 2 折线图 3 饼状图
	 */
	@Column(name = "echars_type")
	private int echarsType;
	
	/**
	 * 用户
	 */
	@Column(name = "user_id")
	private Integer userId;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public String getEsSql() {
		return esSql;
	}

	public void setEsSql(String esSql) {
		this.esSql = esSql;
	}

	public String getRetDesc() {
		return retDesc;
	}

	public void setRetDesc(String retDesc) {
		this.retDesc = retDesc;
	}

	public int getEcharsType() {
		return echarsType;
	}

	public void setEcharsType(int echarsType) {
		this.echarsType = echarsType;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
}
