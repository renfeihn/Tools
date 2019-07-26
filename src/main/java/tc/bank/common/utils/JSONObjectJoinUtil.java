package tc.bank.common.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import tc.bank.common.lang.StringUtils;

import com.aim.alibaba.fastjson.JSONObject;

public class JSONObjectJoinUtil {

	public static JSONObject join(String prefix1, JSONObject obj1,
			String prefix2, JSONObject obj2, JoinType joinType,
			List<JoinCriteria> joinCriterias) {
		return joinType.join(prefix1, obj1, prefix2, obj2, joinCriterias);
	}

	public static enum JoinType implements Strategy {
		JOIN {
			@Override
			public JSONObject join(String prefix1, JSONObject obj1,
					String prefix2, JSONObject obj2,
					List<JoinCriteria> joinCriterias) {

				// 前缀为a.b.c.的情况特殊处理
				if ((StringUtils.isNotEmpty(prefix1) && prefix1.indexOf(".") != -1)
						|| (StringUtils.isNotEmpty(prefix2) && prefix2
								.indexOf(".") != -1)) {
					return equalJoin(prefix1, obj1, prefix2, obj2,
							joinCriterias);
				}

				JSONObject retObj = new JSONObject();
				boolean criteriaMatched = isCriteriaMatched(obj1, obj2,
						joinCriterias);
				if (criteriaMatched) {
					for (Entry<String, Object> entry : obj1.entrySet()) {
						retObj.put(prefix1 + entry.getKey(), entry.getValue());
					}
					for (Entry<String, Object> entry : obj2.entrySet()) {
						retObj.put(prefix2 + entry.getKey(), entry.getValue());
					}
					return retObj;
				}
				return null;
			}
		},
		LEFT_JOIN {
			@Override
			public JSONObject join(String prefix1, JSONObject obj1,
					String prefix2, JSONObject obj2,
					List<JoinCriteria> joinCriterias) {

				// 前缀为a.b.c.的情况特殊处理
				if ((StringUtils.isNotEmpty(prefix1) && prefix1.indexOf(".") != -1)
						|| (StringUtils.isNotEmpty(prefix2) && prefix2
								.indexOf(".") != -1)) {
					return leftJoin(prefix1, obj1, prefix2, obj2, joinCriterias);
				}

				JSONObject retObj = new JSONObject();
				for (Entry<String, Object> entry : obj1.entrySet()) {
					retObj.put(prefix1 + entry.getKey(), entry.getValue());
				}
				boolean criteriaMatched = isCriteriaMatched(obj1, obj2,
						joinCriterias);
				if (criteriaMatched) {
					for (Entry<String, Object> entry : obj2.entrySet()) {
						retObj.put(prefix2 + entry.getKey(), entry.getValue());
					}
				}
				return retObj;
			}
		},
		RIGHT_JOIN {
			@Override
			public JSONObject join(String prefix1, JSONObject obj1,
					String prefix2, JSONObject obj2,
					List<JoinCriteria> joinCriterias) {

				// 前缀为a.b.c.的情况特殊处理
				if ((StringUtils.isNotEmpty(prefix1) && prefix1.indexOf(".") != -1)
						|| (StringUtils.isNotEmpty(prefix2) && prefix2
								.indexOf(".") != -1)) {
					return rightJoin(prefix1, obj1, prefix2, obj2,
							joinCriterias);
				}

				JSONObject retObj = new JSONObject();
				for (Entry<String, Object> entry : obj2.entrySet()) {
					retObj.put(prefix2 + entry.getKey(), entry.getValue());
				}
				boolean criteriaMatched = isCriteriaMatched(obj1, obj2,
						joinCriterias);
				if (criteriaMatched) {
					for (Entry<String, Object> entry : obj1.entrySet()) {
						retObj.put(prefix1 + entry.getKey(), entry.getValue());
					}
				}
				return retObj;
			}
		};

		/**
		 * 前缀为a.b.c.的情况等值连接处理
		 */
		private static JSONObject equalJoin(String prefix1, JSONObject obj1,
				String prefix2, JSONObject obj2,
				List<JoinCriteria> joinCriterias) {

			JSONObject retObj = new JSONObject();
			boolean criteriaMatched = isCriteriaMatched(obj1, obj2,
					joinCriterias);
			if (criteriaMatched) {
				// 左边对象处理
				JSONObject letObj = new JSONObject();
				if (StringUtils.isNotEmpty(prefix1)
						&& prefix1.indexOf(".") != -1) {
					for (Entry<String, Object> entry : obj1.entrySet()) {
						letObj.put(entry.getKey(), entry.getValue());
					}
					// 前缀为a.b.c.的情况特殊处理
					retObj.putAll(addPrefix(prefix1, letObj));
				} else {
					for (Entry<String, Object> entry : obj1.entrySet()) {
						letObj.put(prefix1 + entry.getKey(), entry.getValue());
					}
					retObj.putAll(letObj);
				}
				// 右边对象处理
				JSONObject ritObj = new JSONObject();
				if (StringUtils.isNotEmpty(prefix2)
						&& prefix2.indexOf(".") != -1) {
					for (Entry<String, Object> entry : obj2.entrySet()) {
						ritObj.put(entry.getKey(), entry.getValue());
					}
					// 前缀为a.b.c.的情况特殊处理
					retObj.putAll(addPrefix(prefix2, ritObj));
				} else {
					for (Entry<String, Object> entry : obj2.entrySet()) {
						ritObj.put(prefix2 + entry.getKey(), entry.getValue());
					}
					retObj.putAll(ritObj);
				}
				return retObj;
			}
			return null;
		}

		/**
		 * 前缀为a.b.c.的情况左连接处理
		 */
		private static JSONObject leftJoin(String prefix1, JSONObject obj1,
				String prefix2, JSONObject obj2,
				List<JoinCriteria> joinCriterias) {
			JSONObject retObj = new JSONObject();

			// 左边对象处理
			JSONObject letObj = new JSONObject();
			if (StringUtils.isNotEmpty(prefix1) && prefix1.indexOf(".") != -1) {
				for (Entry<String, Object> entry : obj1.entrySet()) {
					letObj.put(entry.getKey(), entry.getValue());
				}
				// 前缀为a.b.c.的情况特殊处理
				retObj.putAll(addPrefix(prefix1, letObj));
			} else {
				for (Entry<String, Object> entry : obj1.entrySet()) {
					letObj.put(prefix1 + entry.getKey(), entry.getValue());
				}
				retObj.putAll(letObj);
			}

			// 右边对象处理
			boolean criteriaMatched = isCriteriaMatched(obj1, obj2,
					joinCriterias);
			if (criteriaMatched) {
				JSONObject ritObj = new JSONObject();
				if (StringUtils.isNotEmpty(prefix2)
						&& prefix2.indexOf(".") != -1) {
					for (Entry<String, Object> entry : obj2.entrySet()) {
						ritObj.put(entry.getKey(), entry.getValue());
					}
					// 前缀为a.b.c.的情况特殊处理
					retObj.putAll(addPrefix(prefix2, ritObj));
				} else {
					for (Entry<String, Object> entry : obj2.entrySet()) {
						ritObj.put(prefix2 + entry.getKey(), entry.getValue());
					}
					retObj.putAll(ritObj);
				}

			}
			return retObj;
		}

		/**
		 * 前缀为a.b.c.的情况右连接处理
		 */
		private static JSONObject rightJoin(String prefix1, JSONObject obj1,
				String prefix2, JSONObject obj2,
				List<JoinCriteria> joinCriterias) {
			JSONObject retObj = new JSONObject();

			// 右边对象处理
			JSONObject ritObj = new JSONObject();
			if (StringUtils.isNotEmpty(prefix2) && prefix2.indexOf(".") != -1) {
				for (Entry<String, Object> entry : obj2.entrySet()) {
					ritObj.put(entry.getKey(), entry.getValue());
				}
				// 前缀为a.b.c.的情况特殊处理
				retObj.putAll(addPrefix(prefix2, ritObj));
			} else {
				for (Entry<String, Object> entry : obj2.entrySet()) {
					ritObj.put(prefix2 + entry.getKey(), entry.getValue());
				}
				retObj.putAll(ritObj);
			}

			// 左边对象处理
			boolean criteriaMatched = isCriteriaMatched(obj1, obj2,
					joinCriterias);
			if (criteriaMatched) {
				JSONObject lefObj = new JSONObject();
				if (StringUtils.isNotEmpty(prefix1)
						&& prefix1.indexOf(".") != -1) {
					for (Entry<String, Object> entry : obj1.entrySet()) {
						lefObj.put(entry.getKey(), entry.getValue());
					}
					// 前缀为a.b.c.的情况特殊处理
					retObj.putAll(addPrefix(prefix1, lefObj));
				} else {
					for (Entry<String, Object> entry : obj1.entrySet()) {
						lefObj.put(prefix1 + entry.getKey(), entry.getValue());
					}
					retObj.putAll(lefObj);
				}
			}
			return retObj;
		}

		/**
		 * 支持前缀为a.b.c.的情况
		 * 
		 * @param prefix
		 *            前缀a.b.c.
		 * @param object
		 *            {key1:value1,key2:value2...}
		 * @return {"a":{"b":{"c":{key1:value1,key2:value2...}}}}
		 */
		private static JSONObject addPrefix(String prefix, JSONObject object) {

			JSONObject result = new JSONObject();
			if (StringUtils.isNotEmpty(prefix) && prefix.indexOf(".") != -1) {
				String[] keys = prefix.split("\\.");
				for (int i = keys.length - 1; i >= 0; i--) {
					JSONObject obj = new JSONObject();
					if (i == keys.length - 1) {
						obj.put(keys[i], object);
					} else {
						obj.put(keys[i], result);
					}
					result = obj;
				}
			}
			return result;
		}

		public static boolean isCriteriaMatched(JSONObject obj1,
				JSONObject obj2, List<JoinCriteria> joinCriterias) {
			boolean criteriaMatched = false;
			for (JoinCriteria joinCriteria : joinCriterias) {
				String operant1 = joinCriteria.getOperant1();
				String operant2 = joinCriteria.getOperant2();
				if (operant2 == null) {
					if (obj1.get(operant1) != null
							&& obj1.get(operant1).equals(obj2.get(operant1))) {
						criteriaMatched = true;
					} else {
						return false;
					}
				} else {
					if (obj1.get(operant1) != null
							&& obj1.get(operant1).equals(operant2)) {
						criteriaMatched = true;
					} else {
						return false;
					}
				}
			}
			return criteriaMatched;
		}
	}

	public static class JoinCriteria {
		private String operant1;
		private String operator;
		private String operant2;

		public JoinCriteria(String operant1, String operator, String operant2) {
			this.operant1 = operant1;
			this.operator = operator;
			this.operant2 = operant2;
		}

		public String getOperant1() {
			return operant1;
		}

		public void setOperant1(String operant1) {
			this.operant1 = operant1;
		}

		public String getOperator() {
			return operator;
		}

		public void setOperator(String operator) {
			this.operator = operator;
		}

		public String getOperant2() {
			return operant2;
		}

		public void setOperant2(String operant2) {
			this.operant2 = operant2;
		}
	}

	public static interface Strategy {
		public JSONObject join(String prefix1, JSONObject obj1, String prefix2,
				JSONObject obj2, List<JoinCriteria> joinCriterias);
	}

	public static void main(String[] args) {
		// joinTest1();
		// joinTest2();
		// joinTest3();
		// leftJoinTest();
		// rightJoinTest();
		prefixJoinTest1(); // 特殊前缀a.b.c. 和 d.e.f. 连接测试
		prefixJoinTest2(); // 特殊前缀svr 和 d.e.f. 连接测试
	}

	/**
	 * 特殊前缀a.b.c.连接测试
	 */
	private static void prefixJoinTest1() {
		String prefix1 = "a.b.c.";
		JSONObject obj1 = new JSONObject(16, true);
		obj1.put("serverId", 1);
		obj1.put("serverName", "AOP");
		obj1.put("serverIp", "10.8.6.10");

		String prefix2 = "evt";
		JSONObject obj2 = new JSONObject(16, true);
		obj2.put("serverId", 1);
		obj2.put("eventNum", 100);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);

		// 等值连接测试
		JSONObject result = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.JOIN, joinCriterias);
		System.out.println("[Join]:" + result);

		// 左连接测试
		JSONObject result1 = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.LEFT_JOIN, joinCriterias);
		System.out.println("[leftJoin]:" + result1);

		// 右连接测试
		JSONObject result2 = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.RIGHT_JOIN, joinCriterias);
		System.out.println("[rightJoin]:" + result2);
	}

	/**
	 * 特殊前缀a.b.c.连接测试
	 */
	private static void prefixJoinTest2() {
		String prefix1 = "svr";
		JSONObject obj1 = new JSONObject(16, true);
		obj1.put("serverId", 1);
		obj1.put("serverName", "AOP");
		obj1.put("serverIp", "10.8.6.10");

		String prefix2 = "d.e.f.";
		JSONObject obj2 = new JSONObject(16, true);
		obj2.put("serverId", 1);
		obj2.put("eventNum", 100);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);

		// 等值连接测试
		JSONObject result = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.JOIN, joinCriterias);
		System.out.println("[Join]:" + result);

		// 左连接测试
		JSONObject result1 = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.LEFT_JOIN, joinCriterias);
		System.out.println("[leftJoin]:" + result1);

		// 右连接测试
		JSONObject result2 = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.RIGHT_JOIN, joinCriterias);
		System.out.println("[rightJoin]:" + result2);
	}

	private static void joinTest1() {
		String prefix1 = "svr";
		JSONObject obj1 = new JSONObject(16, true);
		obj1.put("serverId", 1);
		obj1.put("serverName", "AOP");
		obj1.put("serverIp", "10.8.6.10");

		String prefix2 = "evt";
		JSONObject obj2 = new JSONObject(16, true);
		obj2.put("serverId", 1);
		obj2.put("eventNum", 100);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);

		JSONObject result = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.JOIN, joinCriterias);
		System.out.println(result);
	}

	private static void joinTest2() {
		String prefix1 = "svr";
		JSONObject obj1 = new JSONObject(16, true);
		obj1.put("serverId", 1);
		obj1.put("serverName", "AOP");
		obj1.put("serverIp", "10.8.6.10");

		String prefix2 = "evt";
		JSONObject obj2 = new JSONObject(16, true);
		obj2.put("serverId", 1);
		obj2.put("eventNum", 100);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);
		JoinCriteria criteria2 = new JoinCriteria("serverName", "=", "AOP2");
		joinCriterias.add(criteria2);

		JSONObject result = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.JOIN, joinCriterias);
		System.out.println(result);
	}

	private static void joinTest3() {
		String prefix1 = "svr";
		JSONObject obj1 = new JSONObject(16, true);
		obj1.put("serverId", 1);
		obj1.put("serverName", "AOP");
		obj1.put("serverIp", "10.8.6.10");

		String prefix2 = "evt";
		JSONObject obj2 = new JSONObject(16, true);
		obj2.put("serverId", 2);
		obj2.put("eventNum", 100);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);

		JSONObject result = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.JOIN, joinCriterias);
		System.out.println(result);
	}

	private static void leftJoinTest() {
		String prefix1 = "svr";
		JSONObject obj1 = new JSONObject(16, true);
		obj1.put("serverId", 1);
		obj1.put("serverName", "AOP");
		obj1.put("serverIp", "10.8.6.10");

		String prefix2 = "evt";
		JSONObject obj2 = new JSONObject(16, true);
		obj2.put("serverId", 2);
		obj2.put("eventNum", 100);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);

		JSONObject result = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.LEFT_JOIN, joinCriterias);
		System.out.println(result);
	}

	private static void rightJoinTest() {
		String prefix1 = "svr";
		JSONObject obj1 = new JSONObject(16, true);
		obj1.put("serverId", 1);
		obj1.put("serverName", "AOP");
		obj1.put("serverIp", "10.8.6.10");

		String prefix2 = "evt";
		JSONObject obj2 = new JSONObject(16, true);
		obj2.put("serverId", 2);
		obj2.put("eventNum", 100);

		List<JoinCriteria> joinCriterias = new ArrayList<JoinCriteria>();
		JoinCriteria criteria1 = new JoinCriteria("serverId", "=", null);
		joinCriterias.add(criteria1);

		JSONObject result = JSONObjectJoinUtil.join(prefix1, obj1, prefix2,
				obj2, JoinType.RIGHT_JOIN, joinCriterias);
		System.out.println(result);
	}

}
