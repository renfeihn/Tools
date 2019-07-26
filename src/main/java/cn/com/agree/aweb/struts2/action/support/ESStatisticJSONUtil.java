package cn.com.agree.aweb.struts2.action.support;

import java.util.ArrayList;
import java.util.List;

import com.aim.alibaba.fastjson.JSONObject;

public class ESStatisticJSONUtil {

	private static ESStatisticJSONUtil util;
	private static int randomCount = 0;
	private static final List<String> aggTypes = new ArrayList<String>();
	
	private ESStatisticJSONUtil(){}
	
	public static ESStatisticJSONUtil getInstance(){
		if(util==null){
			//filter range missing terms date_range histogram date_histogram 
			aggTypes.add("filter");
			aggTypes.add("range");
			aggTypes.add("missing");
			aggTypes.add("terms");
			aggTypes.add("date_range");
			aggTypes.add("histogram");
			aggTypes.add("date_histogram");
			//avg  cardinality  stats  extended_stats  percentiles  percentile_ranks  
			aggTypes.add("avg");
			aggTypes.add("cardinality");
			aggTypes.add("stats");
			aggTypes.add("extended_stats");
			aggTypes.add("percentiles");
			aggTypes.add("percentile_ranks");
			util = new ESStatisticJSONUtil();
		}
		return util;
	}
	
	public JSONObject getAggregationJson(String aggType,JSONObject body){
		JSONObject json = new JSONObject();
		JSONObject bucket = new JSONObject();
		JSONObject bodyJson = new JSONObject();
		if(aggTypes.contains(aggType)){
			bodyJson.put(aggType, body);
		}else{
			throw new IllegalArgumentException("未知聚合类型["+aggType+"]");
		}
		bucket.put("bucket"+(++randomCount), bodyJson);
		json.put("aggs", bucket);
		return json;
	}
}
