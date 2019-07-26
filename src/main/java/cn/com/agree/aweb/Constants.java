package cn.com.agree.aweb;

import java.util.HashMap;
import java.util.Map;

/**
 * 静态变量
 *
 * @author lihao lihao01@cfischina.com
 * Apr 24, 2015
 */
public class Constants {
	
	/**
	 * 全局参数
	 */
	private static HashMap<String, Object> globalParam = new HashMap<String, Object>();
	public static void setGlobalParam(String name, Object value) {
		globalParam.put(name, value);
	}
	public static Object getGlobalParam(String name) {
		return globalParam.get(name);
	}
	
	/**
	 * registry相关标签
	 */
	public static final String REGISTRY = "registry";
	public static final String REGISTRY_STARTUP = "startup";
	public static final String REGISTRY_CLASS = "class";
	public static final String REGISTRY_NAME = "name";
	public static final String REGISTRY_GLOBAL = "global";
	public static final String REGISTRY_INIT_PARAM = "init-param";
	public static final String REGISTRY_PARAM_NAME = "param-name";
	public static final String REGISTRY_PARAM_VALUE = "param-value";
	

	/**
	 * 时间格式
	 */
	public static final String FORMAT_TIME = "yyyy-MM-dd HH:mm:ss";
	/**
	 * 集群中签退时sessionid字段名
	 */
	public static final String AWEB_SESSIONID = "sid";
	
	/**
	 * 当前服务器监听端口
	 */
	public static final String SERVER_PORT = "8080";
	
	
	/**
	 * 用户初始密码
	 */
	public static final String USER_INIT_PASSWORD = "111111";
	
	/**
	 * 用户锁定间隔时间：12小时
	 * 单位:秒
	 */
	public static final int USER_LOCT_TIME = 43200;
	
	/**
	 * 用户登录错误次数上线：3次
	 */
	public static final int USER_LOGIN_ERROR_MAX = 5;
	
	
	
	/**
	 * 数据库-agree_user表-usertype字段   0：管理员
	 */
	public static final int DB_AGREEUSER_TYPE_0 = 0;
	/**
	 * 数据库-agree_user表-usertype字段   1：普通用户
	 */
	public static final int DB_AGREEUSER_TYPE_1 = 1;
	/**
	 * 数据库-agree_user表-usertype字段   2：IDE用户
	 */
	public static final int DB_AGREEUSER_TYEP_2 = 2;
	/**
	 * 数据库-agree_user表-state字段   0：未启用
	 */
	public static final int DB_AGREEUSER_STATE_0 = 0;
	/**
	 * 数据库-agree_user表-state字段   1：启用
	 */
	public static final int DB_AGREEUSER_STATE_1 = 1;
	/**
	 * 数据库-agree_user表-state字段   2：锁定
	 */
	public static final int DB_AGREEUSER_STATE_2 = 2;
	/**
	 * 数据库-agree_user表-continuouserrornum字段   初始值：0次
	 */
	public static final int DB_AGREEUSER_CONTINUOUSERRORNUM_MIX = 0;
	/**
	 * 数据库-agree_access表-权限状态：生效
	 */
	public static final int DB_ACCESS_STATE_TRUE = 1;
	
	
	/**
	 * session-->用户
	 */
	public static final String SESSION_USERVO = "userVO";
	/**
	 * session-->用户名
	 */
	public static final String SESSION_USERNAME = "username";
	
	
	/**
	 * session-->用户所有权限集合：菜单、控制、显示
	 */
	public static final String SESSION_USER_ACCESS_LIST = "userAccessList";
	/**
	 * session-->用户权限LIST-菜单
	 */
	public static final String SESSION_USER_ACCESS_LIST_MENU = "userMenuAccessList";
	/**
	 * session-->用户权限LIST-控制
	 */
	public static final String SESSION_USER_ACCESS_LIST_CONTROL = "userControlAccessList";
	/**
	 * session-->用户权限LIST-显示
	 */
	public static final String SESSION_USER_ACCESS_LIST_SHOW = "userShowAccessList";
	
	/**
	 * session-->用户实例权限LIST
	 */
	public static final String SESSION_USER_INSTANCE_LIST = "userInstanceList";
	
	/**
	 * session-->用户实例权限-IDS
	 */
	public static final String SESSION_USER_INSTANCE_IDS = "userInstanceIDS";
	

	/**
	 * session-->用户权限LIST-动态域树菜单IDS
	 */
	public static final String SESSION_USER_ACCESS_IDS_TREE_MENU = "userMenuAccessTreeIDS";
	/**
	 * session-->用户权限LIST-动态域树菜单
	 */
	public static final String SESSION_USER_ACCESS_LIST_TREE_MENU = "userMenuAccessTreeList";

	/**
	 * session-->用户所有权限集合：菜单、控制、显示
	 */
	public static final String SESSION_USER_MENUACCESS_VOS_SET = "userMenuAccessSet";
	
	/**
	 * session-->用户的最小父路径
	 */
	public static final String SESSION_USER_PATH = "userpath";
	
	
	/**
	 * 编码：UTF-8
	 */
	public static final String ENCODING_UTF8 = "UTF-8";
	
	
	public static final String DEPLOY_APPS = "apps";
	public static final String DEPLOY_SHARE = "share";
	public static final String DEPLOY_APPNAME = "appName";
	public static final String DEPLOY_RESOURCE = "resource";
	public static final String DEPLOY_UPLOAD_USER = "upload_user";
	public static final String DEPLOY_DESP = "desp";
	public static final String DEPLOY_SIZE = "appSize";
	public static final String DEPLOY_TYPE = "type";
	public static final String DEPLOY_VERSION = "version";
	public static final String DEPLOY_TRUE = "1";
	public static final String DEPLOY_FALSE = "0";
	public static final String DEPLOY_PATH = "path";
	public static final String DEPLOY_PATCH = "patch";
	public static final String DEPLOY_UPLOADSTATE = "uploadState";
	public static final String DEPLOY_PROJECTNAME = "projectName";
	
	public static final Map<String,String> DEVTYPE_PAGEFLAG_MAP = new HashMap<String,String>();
	static{
		/**
		 * type:
		 * 0- 应用系统(APPLICATION) 1-服务器(SERVER) 2-交易监控 3-应用启停 4-操作系统 5 -中间件(MW)
		 * 7-数据库(DB) 8-应用程序(PROGRAM) 9-机房(ROOM) 10-机柜(CABINET) 11-网络设备(NETWORK)
		 * 12-安全设备(SAFETY)
		 * 
		 * pageflag:
		 * 1-一线监控-应用 2-一线监控-操作 3-一线监控-系统 4-应用总览 5-交易监控 6-应用启停  7-服务器 8-中间件 9-应用
		 * 10-操作系统 11-数据库 801-中间件（MQ）802-中间件（tomcat）… 1101-数据库(ORACLE)
		 * 1102-数据库（DB2）…  12 应用系统
		 */
		DEVTYPE_PAGEFLAG_MAP.put("0", "12");
		DEVTYPE_PAGEFLAG_MAP.put("1", "7");
		DEVTYPE_PAGEFLAG_MAP.put("2", "5");
		DEVTYPE_PAGEFLAG_MAP.put("3", "6");
		DEVTYPE_PAGEFLAG_MAP.put("4", "10");
		DEVTYPE_PAGEFLAG_MAP.put("5", "8");
//		DEVTYPE_PAGEFLAG_MAP.put("6", "8");
		DEVTYPE_PAGEFLAG_MAP.put("7", "11");
		DEVTYPE_PAGEFLAG_MAP.put("8", "9");
		DEVTYPE_PAGEFLAG_MAP.put("9", "");
		DEVTYPE_PAGEFLAG_MAP.put("10", "");
		DEVTYPE_PAGEFLAG_MAP.put("11", "");
		DEVTYPE_PAGEFLAG_MAP.put("12", "");
	}
	
	public static final Map<String,String> ATTR1_PAGEFLAG_MAP = new HashMap<String,String>();
	static{
		/**
		 * 对象类型obj_type为 1-服务器节点 时，表示操作系统类型 AIX\Linux\Windows\CentOS\Mac\Cisco\......
			对象类型obj_type为 5-中间件 时，表示中间件类型 CD\CiCs\Exchange\IHS\WAS\其它软件
			对象类型obj_type为 7-数据库 时，表示数据库类型 DB2\MYSQL\ORACLE\SQLSERVER\SYBASE
		 * */
		//中间件
		ATTR1_PAGEFLAG_MAP.put("MQ", "801");
		ATTR1_PAGEFLAG_MAP.put("tomcat", "802");
		ATTR1_PAGEFLAG_MAP.put("CD", "803");
		ATTR1_PAGEFLAG_MAP.put("CiCs", "804");
		ATTR1_PAGEFLAG_MAP.put("Exchange", "805");
		ATTR1_PAGEFLAG_MAP.put("IHS", "806");
		ATTR1_PAGEFLAG_MAP.put("WAS", "807");
		ATTR1_PAGEFLAG_MAP.put("其它软件", "808");
		//数据库
		ATTR1_PAGEFLAG_MAP.put("ORACLE", "1101");
		ATTR1_PAGEFLAG_MAP.put("DB2", "1102");
		ATTR1_PAGEFLAG_MAP.put("MYSQL", "1103");
		ATTR1_PAGEFLAG_MAP.put("SQLSERVER", "1104");
		ATTR1_PAGEFLAG_MAP.put("SYBASE", "1105");
	}
}
