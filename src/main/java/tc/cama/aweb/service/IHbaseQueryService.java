package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

public interface IHbaseQueryService {

	JSONObject queryTable(String tableName) throws Exception;

	JSONObject queryTable(String tableName, String app, String date,
			String flowNo) throws Exception;

	JSONObject queryTableWithColumn(String tableName, String column,
			String app, String date, String flowNo) throws Exception;

	JSONObject queryTableOffset(String tableName, String app, String date)
			throws Exception;

	void synHBaseData(String tableName, String aimTableName,
			List<String> rowKeys) throws Exception;

	JSONObject queryList(String tableName, Map<String, Object> whereEx)
			throws Exception;
}
