package cn.com.agree.aweb.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.service.IRemoteService;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.bank.common.db.IDbService;
import tc.bank.common.db.Sort;

public class DbServiceImpl implements IDbService {

	private IRemoteService remoteService;

	@Override
	public void commit() {
		// do nothing
	}

	@Override
	public <T> int count(Class<T> entityClass, JSONObject whereEx) {
		return queryAsDictList(entityClass, whereEx).size();
	}

	@Override
	public <T> int deleteWithDict(Class<T> entityClass, JSONObject whereEx) {
		JSONObject reqData = new JSONObject();
		reqData.put("entityClassName", entityClass.getName());
		reqData.put("whereEx", whereEx);
		JSONObject data = remoteService.exchange("aweb", "C014", reqData);
		if (data.containsKey("dbResult")) {
			return data.getIntValue("dbResult");
		}
		return 0;
	}

	public IRemoteService getRemoteService() {
		return remoteService;
	}

	@Override
	public <T> int insertWithDict(Class<T> entityClass, JSONObject insertData) {
		JSONObject reqData = new JSONObject();
		reqData.put("entityClassName", entityClass.getName());
		reqData.put("insertData", insertData);
		JSONObject data = remoteService.exchange("aweb", "C015", reqData);
		if (data.containsKey("dbResult")) {
			return data.getIntValue("dbResult");
		}
		return 0;
	}

	@Override
	public <T> Page<T> pageQuery(Class<T> entityClass, JSONObject whereEx, Pageable pageable) {
		if (pageable == null) {
			pageable = new Pageable(0, 10);
		}
		// TODO
		List<T> content = queryAsBeanList(entityClass, whereEx);
		return new Page<T>(content, pageable, content.size());
	}

	@Override
	public <T> Page<T> pageQuery(Class<T> entityClass, JSONObject whereEx, Pageable pageable, Sort sort) {
		if (pageable == null) {
			pageable = new Pageable(0, 10);
		}
		// TODO
		List<T> content = queryAsBeanList(entityClass, whereEx);
		return new Page<T>(content, pageable, content.size());
	}

	@Override
	public <T> T queryAsBean(Class<T> entityClass, JSONObject whereEx) {
		JSONObject json = queryAsDict(entityClass, whereEx);
		return ConvertUtils.convert(json, entityClass);
	}

	@Override
	public <T> List<T> queryAsBeanList(Class<T> entityClass, JSONObject whereEx) {
		JSONArray dictList = queryAsDictList(entityClass, whereEx);
		if (null == dictList) {
			return null;
		}
		List<T> list = new ArrayList<T>();
		for (int i = 0; i < dictList.size(); i++) {
			T t = ConvertUtils.convert(dictList.get(i), entityClass);
			list.add(t);
		}
		return list;
	}

	@Override
	public <T> List<T> queryAsBeanList(Class<T> entityClass, JSONObject whereEx, Sort sort) {
		// TODO
		return queryAsBeanList(entityClass, whereEx);
	}

	@Override
	public <T> JSONObject queryAsDict(Class<T> entityClass, JSONObject whereEx) {
		JSONObject reqData = new JSONObject();
		reqData.put("entityClassName", entityClass.getName());
		reqData.put("whereEx", whereEx);
		JSONObject data = remoteService.exchange("aweb", "C011", reqData);
		return data.getJSONObject("dbResult");
	}

	@Override
	public <T> JSONArray queryAsDictList(Class<T> entityClass, JSONObject whereEx) {
		JSONObject reqData = new JSONObject();
		reqData.put("entityClassName", entityClass.getName());
		reqData.put("whereEx", whereEx);
		JSONObject data = remoteService.exchange("aweb", "C012", reqData);
		JSONArray array = data.getJSONArray("dbResult");
		if (array == null) {
			return new JSONArray();
		}
		return array;
	}

	@Override
	public <T> JSONArray queryAsDictList(Class<T> entityClass, JSONObject whereEx, Sort sort) {
		// TODO
		return queryAsDictList(entityClass, whereEx);
	}

	@Override
	public <T> int save(List<T> entities) {
		int rows = 0;
		if (entities == null || entities.isEmpty()) {
			return rows;
		}
		for (T entity : entities) {
			rows += save(entity);
		}
		return rows;
	}

	@Override
	public <T> int save(T entity) {
		JSONObject insertData = ConvertUtils.convert(entity, JSONObject.class);
		return insertWithDict(entity.getClass(), insertData);
	}

	public void setRemoteService(IRemoteService remoteService) {
		this.remoteService = remoteService;
	}

	@Override
	public <T> int updateWithDict(Class<T> entityClass, JSONObject updateData, JSONObject whereEx) {
		JSONObject reqData = new JSONObject();
		reqData.put("entityClassName", entityClass.getName());
		reqData.put("updateData", updateData);
		reqData.put("whereEx", whereEx);
		JSONObject data = remoteService.exchange("aweb", "C013", reqData);
		if (data.containsKey("dbResult")) {
			return data.getIntValue("dbResult");
		}
		return 0;
	}

	@Override
	public int executeSql(String sql, Object... params) {
		throw new UnsupportedOperationException();
	}

	@Override
	public List<Map<String, Object>> queryAsMapListBySQL(String sql, Object... params) {
		JSONObject reqData = new JSONObject();
		reqData.put("sql", sql);
		reqData.put("params", params);
		JSONObject data = remoteService.exchange("aweb", "C0121", reqData);
		JSONArray array = data.getJSONArray("dbResult");
		if (array == null) {
			return Collections.emptyList();
		}
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < array.size(); i++) {
			result.add(array.getJSONObject(i));
		}
		return result;
	}
}
