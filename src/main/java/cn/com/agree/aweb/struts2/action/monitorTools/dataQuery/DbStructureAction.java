package cn.com.agree.aweb.struts2.action.monitorTools.dataQuery;

import cn.com.agree.aweb.struts2.action.support.AimReqAfaSdk;
import cn.com.agree.aweb.struts2.action.support.AimRespAfaSdk;
import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

/**
 * @author zhouyuehui@agree.com.cn 
 * @description 数据查询-数据库表结构Action
 * 2017年4月20日 上午10:54:55  
 */
@Controller(value="DbStructureActionBean")
@Scope("prototype")
public class DbStructureAction extends AimStandardActionSupport {
	private static final long serialVersionUID = 7437191518693949473L;
	private String app_id;
	private String db_id;
	private String dbtype;
	private String url;
	private String username;
	private String password;
	private String objtype;
	private String database;
	private String table;
	private String dbpool_id; //数据源id
	private String agentType; //代理类型
	public String loadTreeData(){
		AimReqAfaSdk req = new AimReqAfaSdk("VISUAL", "Dbcm_NodeDate");
		req.addPrivate_req("app_id", Integer.parseInt(app_id));
		req.addPrivate_req("db_id", Integer.parseInt(db_id));
		req.addPrivate_req("dbtype", dbtype);
		req.addPrivate_req("url", url);
		req.addPrivate_req("username", username);
		req.addPrivate_req("objtype", objtype);
		req.addPrivate_req("database", database);
		req.addPrivate_req("table", table);
		req.addPrivate_req("dbpool_id", dbpool_id);
		req.addPrivate_req("agentType", agentType);
		req.addPublic_req("_opertype_", "1");
		req.addPublic_req("_currpage_", "1");
		req.addPublic_req("_pagenum_", "10");
		
		try {
			AimRespAfaSdk dsBySdk = (AimRespAfaSdk) aimServer.requestTimeOut(req,5*60*1000);
			JSONObject priData = dsBySdk.getPrivate();
			JSONObject pubData = dsBySdk.getPublic();
			if("000000".equals(pubData.getString("errorcode"))){
				strutsMessage.successMessage().addParameter("dbData", priData.getString("data"));
			}
			System.out.println(pubData);
			System.out.println(priData);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			strutsMessage.errorMessage("通过代理获取数据库结构接口超时！");
		}
		return SUCCESS;
	}
	public String getDbtype() {
		return dbtype;
	}
	public void setDbtype(String dbtype) {
		this.dbtype = dbtype;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getObjtype() {
		return objtype;
	}
	public void setObjtype(String objtype) {
		this.objtype = objtype;
	}
	public String getDatabase() {
		return database;
	}
	public void setDatabase(String database) {
		this.database = database;
	}
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	public String getApp_id() {
		return app_id;
	}
	public void setApp_id(String app_id) {
		this.app_id = app_id;
	}
	public String getDb_id() {
		return db_id;
	}
	public void setDb_id(String db_id) {
		this.db_id = db_id;
	}
	public String getDbpool_id() {
		return dbpool_id;
	}
	public void setDbpool_id(String dbpool_id) {
		this.dbpool_id = dbpool_id;
	}
	public String getAgentType() {
		return agentType;
	}
	public void setAgentType(String agentType) {
		this.agentType = agentType;
	}
}
