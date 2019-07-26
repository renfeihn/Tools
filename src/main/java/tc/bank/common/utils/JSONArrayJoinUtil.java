package tc.bank.common.utils;

import java.util.ArrayList;
import java.util.List;

import tc.bank.common.utils.JSONObjectJoinUtil.JoinCriteria;
import tc.bank.common.utils.JSONObjectJoinUtil.JoinType;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

public class JSONArrayJoinUtil {

	/**
	 * JSONArray拼JSONArray
	 * 
	 * @param prefix1
	 *            左对象前缀
	 * @param array1
	 *            左对象array
	 * @param prefix2
	 *            右对象前缀
	 * @param array2
	 *            右对象array
	 * @param joinType
	 *            连接类型
	 * @param joinCriterias
	 *            连接条件
	 * @return
	 */
	public static JSONArray arrayJoin(String prefix1, JSONArray array1,
			String prefix2, JSONArray array2, JoinType joinType,
			List<JoinCriteria> joinCriterias) {

		JSONArray array = new JSONArray();

		if (joinType.equals(JoinType.RIGHT_JOIN)) {

			// 若为右连接
			for (int i = 0; i < array2.size(); i++) {
				// flag 标志是否存在等值连接
				boolean flag = false;
				for (int j = 0; j < array1.size(); j++) {
					JSONObject result = JSONObjectJoinUtil.join(prefix1,
							array1.getJSONObject(j), prefix2,
							array2.getJSONObject(i), joinType, joinCriterias);
					// 使用result长度和右连接对象长度判断是否是等值连接
					if (null != result
							&& result.size() != array2.getJSONObject(i).size()) {
						array.add(result);
						flag = true;
					}
				}

				// 若不存在等值情况，添加右连接对象
				if (false == flag) {
					array.add(array2.getJSONObject(i));
				}

			}
		} else {

			// 若为左连接和等值连接
			for (int i = 0; i < array1.size(); i++) {
				// flag 标志是否存在等值连接
				boolean flag = false;
				for (int j = 0; j < array2.size(); j++) {
					JSONObject result = JSONObjectJoinUtil.join(prefix1,
							array1.getJSONObject(i), prefix2,
							array2.getJSONObject(j), joinType, joinCriterias);
					// 使用result长度和左连接对象长度判断是否是等值连接
					if (null != result
							&& result.size() != array1.getJSONObject(i).size()) {
						array.add(result);
						flag = true;
					}
				}

				// 若为左连接且不存在等值情况，添加左连接对象
				if (joinType == JoinType.LEFT_JOIN && false == flag) {
					array.add(array1.getJSONObject(i));
				}

			}
		}

		return array;
	}

	/**
	 * 等值连接测试
	 */
	private static void joinTest1() {

		JSONArray array1 = new JSONArray();

		String prefix1 = "svr";
		JSONObject lobj1 = new JSONObject(16, true);
		lobj1.put("serverId", 1);
		lobj1.put("serverName", "AOP1");
		lobj1.put("serverIp", "10.8.6.10");
		JSONObject lobj2 = new JSONObject(16, true);
		lobj2.put("serverId", 2);
		lobj2.put("serverName", "AOP2");
		lobj2.put("serverIp", "10.8.6.10");
		JSONObject lobj3 = new JSONObject(16, true);
		lobj3.put("serverId", 3);
		lobj3.put("serverName", "AOP3");
		lobj3.put("serverIp", "10.8.6.10");
		JSONObject lobj4 = new JSONObject(16, true);
		lobj4.put("serverId", 4);
		lobj4.put("serverName", "AOP4");
		lobj4.put("serverIp", "10.8.6.10");
		array1.add(lobj1);
		array1.add(lobj2);
		array1.add(lobj3);
		array1.add(lobj4);

		JSONArray array2 = new JSONArray();

		String prefix2 = "evt";
		JSONObject robj1 = new JSONObject(16, true);
		robj1.put("serverId", 1);
		robj1.put("eventNum", 100);
		JSONObject robj2 = new JSONObject(16, true);
		robj2.put("serverId", 2);
		robj2.put("eventNum", 200);
		JSONObject robj3 = new JSONObject(16, true);
		robj3.put("serverId", 5);
		robj3.put("eventNum", 500);
		array2.add(robj1);
		array2.add(robj2);
		array2.add(robj3);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);
		JSONArray result = JSONArrayJoinUtil.arrayJoin(prefix1, array1,
				prefix2, array2, JoinType.JOIN, joinCriterias);
		System.out.println(result);
	}

	/**
	 * 左连接测试
	 */
	private static void joinTest2() {

		JSONArray array1 = new JSONArray();

		String prefix1 = "svr";
		JSONObject lobj1 = new JSONObject(16, true);
		lobj1.put("serverId", 1);
		lobj1.put("serverName", "AOP1");
		lobj1.put("serverIp", "10.8.6.10");
		JSONObject lobj2 = new JSONObject(16, true);
		lobj2.put("serverId", 2);
		lobj2.put("serverName", "AOP2");
		lobj2.put("serverIp", "10.8.6.10");
		JSONObject lobj3 = new JSONObject(16, true);
		lobj3.put("serverId", 3);
		lobj3.put("serverName", "AOP3");
		lobj3.put("serverIp", "10.8.6.10");
		JSONObject lobj4 = new JSONObject(16, true);
		lobj4.put("serverId", 4);
		lobj4.put("serverName", "AOP4");
		lobj4.put("serverIp", "10.8.6.10");
		array1.add(lobj1);
		array1.add(lobj2);
		array1.add(lobj3);
		array1.add(lobj4);

		JSONArray array2 = new JSONArray();

		String prefix2 = "evt";
		JSONObject robj1 = new JSONObject(16, true);
		robj1.put("serverId", 1);
		robj1.put("eventNum", 100);
		JSONObject robj2 = new JSONObject(16, true);
		robj2.put("serverId", 2);
		robj2.put("eventNum", 200);
		JSONObject robj3 = new JSONObject(16, true);
		robj3.put("serverId", 5);
		robj3.put("eventNum", 200);
		array2.add(robj1);
		array2.add(robj2);
		array2.add(robj3);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);
		JSONArray result = JSONArrayJoinUtil.arrayJoin(prefix1, array1,
				prefix2, array2, JoinType.LEFT_JOIN, joinCriterias);
		System.out.println(result);
	}

	/**
	 * 右连接测试
	 */
	private static void joinTest3() {

		JSONArray array1 = new JSONArray();

		String prefix1 = "svr";
		JSONObject lobj1 = new JSONObject(16, true);
		lobj1.put("serverId", 1);
		lobj1.put("serverName", "AOP1");
		lobj1.put("serverIp", "10.8.6.10");
		JSONObject lobj2 = new JSONObject(16, true);
		lobj2.put("serverId", 2);
		lobj2.put("serverName", "AOP2");
		lobj2.put("serverIp", "10.8.6.10");
		JSONObject lobj3 = new JSONObject(16, true);
		lobj3.put("serverId", 3);
		lobj3.put("serverName", "AOP3");
		lobj3.put("serverIp", "10.8.6.10");
		JSONObject lobj4 = new JSONObject(16, true);
		lobj4.put("serverId", 4);
		lobj4.put("serverName", "AOP4");
		lobj4.put("serverIp", "10.8.6.10");
		array1.add(lobj1);
		array1.add(lobj2);
		array1.add(lobj3);
		array1.add(lobj4);

		JSONArray array2 = new JSONArray();

		String prefix2 = "evt";
		JSONObject robj1 = new JSONObject(16, true);
		robj1.put("serverId", 1);
		robj1.put("eventNum", 100);
		JSONObject robj2 = new JSONObject(16, true);
		robj2.put("serverId", 2);
		robj2.put("eventNum", 200);
		JSONObject robj3 = new JSONObject(16, true);
		robj3.put("serverId", 5);
		robj3.put("eventNum", 200);
		array2.add(robj1);
		array2.add(robj2);
		array2.add(robj3);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);
		JSONArray result = JSONArrayJoinUtil.arrayJoin(prefix1, array1,
				prefix2, array2, JoinType.RIGHT_JOIN, joinCriterias);
		System.out.println(result);
	}

	public static void main(String[] args) {
		joinTest1(); // 等值连接测试
		joinTest2(); // 左连接测试
		joinTest3(); // 右连接测试
	}

}
