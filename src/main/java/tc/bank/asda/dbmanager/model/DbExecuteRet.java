package tc.bank.asda.dbmanager.model;

import java.util.LinkedHashMap;
import java.util.List;

public class DbExecuteRet {

	/**
	 * 查询耗时
	 */
	private long duration;
	/**
	 * 查询列表
	 */
	private List<LinkedHashMap<String, Object>> queryResult;
	/**
	 * 查询结果总条目数
	 */
	private int total;
	/**
	 * 查询SQL
	 */
	private String sql;
	/**
	 * 表头数组
	 */
	private String[] columes;

	public long getDuration() {
		return duration;
	}

	public void setDuration(long duration) {
		this.duration = duration;
	}

	public List<LinkedHashMap<String, Object>> getQueryResult() {
		return queryResult;
	}

	public void setQueryResult(List<LinkedHashMap<String, Object>> queryResult) {
		this.queryResult = queryResult;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String[] getColumes() {
		return columes;
	}

	public void setColumes(String[] columes) {
		this.columes = columes;
	}

	public DbExecuteRet() {
		super();
	}
}
