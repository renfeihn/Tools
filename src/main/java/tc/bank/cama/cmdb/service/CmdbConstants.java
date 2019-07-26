package tc.bank.cama.cmdb.service;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * cmdb常量定义
 * 
 * @author Win7-user
 * 
 */
public class CmdbConstants {
	public static Map<Integer, Set<Integer>> CMDB_IDS = new HashMap<Integer, Set<Integer>>();

	public static class Category {
		private int id;
		private int level;
		private String name;

		public Category() {
		}

		public Category(int id, String name) {
			this.id = id;
			this.level = getLevel(id);
			this.name = name;
		}

		/**
		 * 内部编号，随时会更改，使用时请注意
		 * 
		 * @return
		 */
		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
			this.level = getLevel(id);
		}

		public int getLevel() {
			return level;
		}

		public void setLevel(int level) {
			this.level = level;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Category copy() {
			return new Category(id, name);
		}

		public static int getLevel(Category category) {
			return getLevel(category.getId());
		}

		public static int getLevel(int categoryId) {
			int id = categoryId;
			int level = 0;
			while (id != 0) {
				level += ((id & 0xFF) == 0 ? 0 : 1);
				id >>= 8;
			}
			return level;
		}

		public static int getIdByCmdbCateIdAndLevel(int cmdbCateId, int level) {
			for (Map.Entry<Integer, Set<Integer>> entry : CMDB_IDS.entrySet()) {
				int id = (int) entry.getKey();
				Set<Integer> cmdbIds = entry.getValue();
				if (getLevel(id) == level
						&& cmdbIds.contains((Integer) cmdbCateId)) {
					return id;
				}
			}
			return 0;
		}

		public static int[] getCmdbIds(Category category) {
			if (category == null) {
				return new int[0];
			}
			return getCmdbIds(category.getId());
		}

		public static int[] getCmdbIds(int categoryId) {
			Set<Integer> ids = CMDB_IDS.get((Integer) categoryId);
			if (ids == null) {
				return new int[0];
			}
			int[] cmdbIds = new int[ids.size()];
			int i = 0;
			for (Iterator<Integer> iter = ids.iterator(); iter.hasNext();) {
				cmdbIds[i++] = (int) iter.next();
			}
			Arrays.sort(cmdbIds);
			return cmdbIds;
		}

		public static Category[] getByIds(int... ids) {
			Category[] cates = new Category[ids.length];
			Field[] fields = CmdbConstants.class.getFields();
			for (Field field : fields) {
				if (field.getType() != Category.class) {
					continue;
				}
				if (!Modifier.isStatic(field.getModifiers())) {
					continue;
				}
				try {
					Category cate = (Category) field.get(null);
					for (int i = 0; i < ids.length; i++) {
						if (cate.getId() == ids[i]) {
							cates[i] = cate;
						}
					}
				} catch (Exception e) {
				}
			}
			return cates;
		}

		public static Category getById(int categoryId) {
			return getByIds(categoryId)[0];
		}

		@Override
		public String toString() {
			return "Category [id=" + id + ", level=" + level + ", name=" + name
					+ "]";
		}

	}

	private static Category newCategory(int id, String name, int[] cmdbIds) {
		Category category = new Category(id, name);
		if (cmdbIds != null) {
			for (int cmdbId : cmdbIds) {
				// 一级分类
				putCmdbIds(id & 0xFF0000, cmdbId);
				// 二级分类
				putCmdbIds(id & 0xFFFF00, cmdbId);
				// 三级分类
				putCmdbIds(id & 0xFFFFFF, cmdbId);
			}
		}
		return category;
	}

	private static void putCmdbIds(int id, int cmdbId) {
		if (id == 0 || cmdbId == 0) {
			return;
		}
		Set<Integer> ids = CMDB_IDS.get(id);
		if (ids == null) {
			ids = new HashSet<Integer>();
			CMDB_IDS.put(id, ids);
		}
		ids.add(cmdbId);
	}

	public static Category UNKNOW = newCategory(0xFFFFFF, "未知", new int[0]);
	public static Category OTHER = newCategory(0xFFFFFE, "其他", new int[0]);

	// 应用系统
	public static Category APP = newCategory(0x010000, "应用系统", null);
	public static Category APP_PRO = newCategory(0x010100, "生产系统", new int[] {
			1001001, 1001002, 1001003, 1001004, 1001005 });
	public static Category APP_DEV = newCategory(0x010200, "非生产系统", new int[] {
			1002001, 1002002 });
	// 软件
	public static Category SW = newCategory(0x020000, "软件", null);
	public static Category SW_MW = newCategory(0x020100, "中间件", null);
	public static Category SW_WAS = newCategory(0x020101, "WAS",
			new int[] { 2001003 });
	public static Category SW_TOMCAT = newCategory(0x020102, "Tomcat",
			new int[] { 2001002 });
	public static Category SW_WEBSERVER = newCategory(0x020103, "Webserver",
			new int[] { 2001004 });
	public static Category SW_MQ = newCategory(0x020104, "MQ",
			new int[] { 2001001 });
	public static Category SW_DB = newCategory(0x020200, "数据库", null);
	public static Category SW_DB2 = newCategory(0x020201, "DB2",
			new int[] { 2002001 });
	public static Category SW_ORACLE = newCategory(0x020202, "Oracle",
			new int[] { 2002003 });
	public static Category SW_SQLSERVER = newCategory(0x020203, "SQLServer",
			new int[] { 2002004 });
	public static Category SW_MYSQL = newCategory(0x020204, "MySQL",
			new int[] { 2002002 });
	public static Category SW_SYBASE = newCategory(0x020205, "Sybase",
			new int[] { 2002005 });
	public static Category SW_INFORMIX = newCategory(0x020205, "Informix",
			new int[] {});
	public static Category SW_PG = newCategory(0x020300, "应用程序", null);
	public static Category SW_PG_ESB = newCategory(0x020301, "ESB",
			new int[] { 2003001 });
	public static Category SW_PG_ABS = newCategory(0x020302, "ABS",
			new int[] { 2003002 });
	public static Category SW_OTH = newCategory(0x020400, "其他软件",
			new int[] { 2004001 });

	// 服务器
	public static Category SER = newCategory(0x030000, "服务器", null);
	public static Category SER_HW = newCategory(0x030100, "物理服务器", new int[] {
			3001001, 3001002, 3001003, 3001004 });
	public static Category SER_OS = newCategory(0x030200, "逻辑服务器", new int[] {
			3002001, 3002002, 3002003, 3002004, 3002005, 3002006, 3002007 });

	// 存储
	public static Category DA = newCategory(0x040000, "存储", new int[] {
			5001001, 5001002, 5001003, 5002001, 5003001, 5003002 });

	// 网络
	public static Category NET = newCategory(0x050000, "网络", new int[] {
			4001001, 4001002, 4001003, 4002001, 4002002, 4002003, 4002004,
			4002005, 4002006, 4002007, 4003001, 4004001, 4004002 });

	// 安全
	public static Category SAFE = newCategory(0x060000, "安全", new int[] {
			7001001, 7001002, 7002001, 7003001 });

	// 环境动力
	public static Category SF = newCategory(0x070000, "环境动力", new int[] {
			6001001, 6002001, 6002002, 6003001, 6004001, 6004002, 6005001 });

	public static void main(String[] args) {
		System.out.println(Arrays.toString(Category.getCmdbIds(SW_DB2)));
		System.out.println(Arrays.toString(Category.getCmdbIds(APP)));
		System.out.println(SW_DB2.getLevel());
		System.out.println(APP.getLevel());

		System.out.println(Category.getById(DA.id).name);
	}
}
