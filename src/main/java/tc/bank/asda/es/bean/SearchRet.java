package tc.bank.asda.es.bean;

import java.io.Serializable;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

public class SearchRet implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6321543419768635379L;

	private JSONArray result;
	
	private long total;

	private JSONObject trees;
	
	public JSONArray getResult() {
		return result;
	}

	public void setResult(JSONArray result) {
		this.result = result;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public JSONObject getTrees() {
		return trees;
	}

	public void setTrees(JSONObject trees) {
		this.trees = trees;
	}

	public SearchRet(JSONArray result, int total, JSONObject trees) {
		super();
		this.result = result;
		this.total = total;
		this.trees = trees;
	}

	public SearchRet() {
		super();
	}
}
