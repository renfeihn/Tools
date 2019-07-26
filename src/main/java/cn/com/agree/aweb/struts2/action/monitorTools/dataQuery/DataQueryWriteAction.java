package cn.com.agree.aweb.struts2.action.monitorTools.dataQuery;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.AimReqAfaSdk;
import cn.com.agree.aweb.struts2.action.support.AimRespAfaSdk;
import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.util.SdkDataUtil;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * @author zhouyuehui@agree.com.cn 
 * @description 数据查询执行
 * 2017年2月22日 下午3:40:46  
 */
@Controller(value="DataQueryWriteActionBean")
@Scope("prototype")
public class DataQueryWriteAction extends AimStandardActionSupport {
	private static final long serialVersionUID = -7867948920145098679L;
	private String db_type;//数据库类型
	private String url;
	private String username;
	private String password;//密码
	private String operator_type;//操作类型
	private String sqlObj;//sql对象
	private String supportgroup;//用户所在组
	private String db_name;//数据库名称
	private String sysName;//应用名称(系统名称) 
	private String sqlContent;//后台穿过来的sql字符串
	private String app_id;
	private String db_id;
	private String sql_editor;//关闭页面记录sql语句
	private String operat_id;//进程号
	private String sql_id;
	
	private String dbpool_id; //数据源id
	private String agentType; //代理类型
	
	StringBuffer sb = null;
	List<String> sqlList = new ArrayList<String>();
	List<String> commentList = new ArrayList<String>();
	/**
	 * @return 执行sql查询，返回查询结果
	 */
	public String excuteQuery(){
		sqlParse(sqlContent.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&"));
		int number = 0;
		String[] sql_no = new String[sqlList.size()];
		String[] sql = new String[sqlList.size()];
		String[] sql_remark = new String[sqlList.size()];
		
		for(int i=0;i<sqlList.size();i++){
			number++;
			sql_no[i] = new Integer(number).toString();
			sql[i] = sqlList.get(i);
			sql_remark[i] = commentList.get(i);
		}
		AimReqAfaSdk req = new AimReqAfaSdk("VISUAL", "Dbcm_OperatorSel");
		req.addPrivate_req("dbtype", db_type);
		req.addPrivate_req("username", username);
		req.addPrivate_req("crt_user_no", getUserName());
		req.addPrivate_req("operator_type", operator_type);
		req.addPrivate_req("sql_no", sql_no);
		req.addPrivate_req("sql", sql);
		req.addPrivate_req("sql_remark", sql_remark);
		req.addPrivate_req("url", url);
		req.addPrivate_req("supportgroup", supportgroup);
		req.addPrivate_req("app_name", sysName);
		req.addPrivate_req("db_name", db_name);
		req.addPrivate_req("password", password);
		req.addPrivate_req("app_id", Integer.parseInt(app_id));
		req.addPrivate_req("db_id", Integer.parseInt(db_id));
		req.addPrivate_req("dbpool_id", dbpool_id);
		req.addPrivate_req("agentType", agentType);
		req.addPrivate_req("operat_id", operat_id);
		req.addPublic_req("_opertype_", "1");
		req.addPublic_req("_currpage_", "1");
		req.addPublic_req("_pagenum_", "10");
		
		try {
			AimRespAfaSdk dsBySdk = (AimRespAfaSdk) aimServer.requestTimeOut(req,5*60*1000);
			if("000000".equals(dsBySdk.getPublic().getString("errorcode"))){
				JSONArray resultJArray=dsBySdk.getPrivate().getJSONArray("sql_list");
				if("0000".equals(resultJArray.getJSONObject(0).getString("sql_code"))){
					String result = resultJArray.getJSONObject(0).getString("result");
					try {
						JSONArray arrData =JSON.parseArray(result);
						String preCode = dsBySdk.getPrivate().getString("code");
						strutsMessage.successMessage().addParameter("resultArr", resultJArray).addParameter("preCode", preCode).addParameter("tdresult", arrData);
					} catch (Exception e) {
						// TODO: handle exception
						strutsMessage.errorMessage("数据转换错误！");
					}
				}else{
					String preCode = dsBySdk.getPrivate().getString("code");
					strutsMessage.successMessage().addParameter("resultArr", resultJArray).addParameter("preCode", preCode);
				}
			}else{
				strutsMessage.errorMessage("后台无返回数据！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			strutsMessage.errorMessage("调用代理接口超时！");
		} 
		return SUCCESS;
	}
	/**
	 * @description 
	 */
	/*public String queryBySql(){
		AimReqAfaSdk req = new AimReqAfaSdk("APPCONF","QryBySQL");
		req.addPrivate_req("dbpool_id",Integer.parseInt(dbpool_id));
		req.addPrivate_req("runsql", runsql.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&"));
		req.addPrivate_req("rownum", 5);
		req.addPrivate_req("agentType",Integer.parseInt(agentType));
		req.addPublic_req("_opertype_","0");
		try {
			AimRespAfaSdk dataBySdk = (AimRespAfaSdk)aimServer.requestTimeOut(req, 3*1000*60);
			JSONObject publicResultData = dataBySdk.getPublic();
			JSONObject responseData = dataBySdk.getPrivate();
			if("000000".equals(publicResultData.getString("errorcode"))){
				JSONObject agenData = responseData.getJSONObject("agent_rsp");
				JSONObject sqlQryData = agenData.getJSONObject("private_rsp");
				strutsMessage.successMessage().addParameter("sqlQryData", sqlQryData);
			}else{
				strutsMessage.errorMessage(publicResultData.getString("errormsg"));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;
	}*/
	
	/*public String dbConnection(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("dbtype", db_type);
		private_req_map.put("username", username);
		private_req_map.put("operator_type", "0");
		private_req_map.put("url", url);
		if(password.equals(("********"))){
			SdkDataUtil.putData("password", "", private_req_map);
		}else{
			SdkDataUtil.putData("password", password, private_req_map);
		}
		private_req_map.put("db_id", Integer.parseInt(db_id));
		private_req_map.put("app_id", Integer.parseInt(app_id));
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_OperatorSel",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("objInfo", dataBySdk.getJSONObject("private_rsp"));
				}else{
					strutsMessage.errorMessage(dataBySdk.getJSONObject("public_rsp").getString("errormsg"));
				}
			}else{
				strutsMessage.errorMessage("后台无返回数据！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}*/
	/**
	 * @description 通过数据源id测试数据库连通性
	 */
	public String dbConBypoolid(){
		AimReqAfaSdk req = new AimReqAfaSdk("APPCONF","CheckConn");
		req.addPrivate_req("dbpool_id", Integer.parseInt(dbpool_id));
		req.addPrivate_req("agentType", Integer.parseInt(agentType));
		req.addPrivate_req("dbtype", db_type);
		req.addPrivate_req("username", username);
		req.addPrivate_req("operator_type", "0");
		req.addPrivate_req("url", url);
		if(password.equals(("********"))){
//			SdkDataUtil.putData("password", "", private_req_map);
			req.addPrivate_req("password", "");
		}else{
//			SdkDataUtil.putData("password", password, private_req_map);
			req.addPrivate_req("password", password);
		}
//		private_req_map.put("dbtype", db_type);
//		private_req_map.put("username", username);
//		private_req_map.put("operator_type", "0");
//		private_req_map.put("url", url);
		/*if(!"".equals(higher_id)&&higher_id!=null){
			req.addPrivate_req("higher_id", Integer.parseInt(higher_id));
		}*/
		req.addPublic_req("_opertype_","0");
		try {
			AimRespAfaSdk dataBySdk = (AimRespAfaSdk)aimServer.requestTimeOut(req, 3*1000*60);
			JSONObject publicResultData = dataBySdk.getPublic();
			JSONObject responseData = dataBySdk.getPrivate();
			if("000000".equals(publicResultData.getString("errorcode"))){
				JSONObject agentData = responseData.getJSONObject("agent_rsp").getJSONObject("public_rsp");
				if("000000".equals(agentData.getString("errorcode"))){
					strutsMessage.successMessage().addParameter("result","success");
				}else{
					strutsMessage.successMessage().addParameter("result",agentData.getString("errormsg"));
				}
			}else{
				strutsMessage.errorMessage("后台无返回数据！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/**
	 * @description 关闭页面时语句入库
	 */
	public String closeSqlToDB(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("type", "1");
		private_req_map.put("sql_editor", sql_editor.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&"));
		private_req_map.put("username", getUserName());
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_HisSqlRecord",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("objInfo", dataBySdk.getJSONObject("public_rsp"));
				}else{
					strutsMessage.errorMessage("无法连接此数据库！");
				}
			}else{
				strutsMessage.errorMessage(dataBySdk.getJSONObject("public_rsp").getString("errorcode"));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	/**
	 * @description 手动终止查询进程
	 */
	public String killQuery(){
		String sql = null;
		AimReqAfaSdk req = new AimReqAfaSdk("VISUAL", "Dbcm_KillCoon");
		req.addPrivate_req("app_id", Integer.parseInt(app_id));
		req.addPrivate_req("db_id", Integer.parseInt(db_id));
		req.addPrivate_req("dbtype", db_type);
		req.addPrivate_req("url", url);
		req.addPrivate_req("username", username);
		req.addPrivate_req("operat_id", operat_id);
		req.addPublic_req("_opertype_","1");
		req.addPublic_req("_currpage_","1");
		req.addPublic_req("_pagenum_","10");
		try {
			AimRespAfaSdk dataBySdk = (AimRespAfaSdk) aimServer.requestTimeOut(req, 2*60*1000);
			JSONObject publicResultData = dataBySdk.getPublic();
			JSONObject responseData = dataBySdk.getPrivate();
			if(responseData.getString("sql")!=null){
				/*if("000000".equals(publicResultData.getString("errorcode"))){
				}*/
				sql = responseData.getString("sql");
				strutsMessage.addParameter("errorcode", "000000").addParameter("sql", sql).addParameter("operMsg", responseData.getString("operateret"));
			}else{
				strutsMessage.addParameter("errorcode", "111111").addParameter("sql", "").addParameter("operMsg", responseData.getString("operateret"));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	/**
	 * @description 通过组名获取组下面对应的系统
	 */
	public String groupToApp(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("supportgroup", supportgroup);
		private_req_map.put("username", getUserName());
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_AppByGroup",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("objInfo", SdkDataUtil.transSdkData(dataBySdk));
				}else{
					strutsMessage.errorMessage(dataBySdk.getJSONObject("public_rsp").getString("errormsg"));
				}
			}else{
				strutsMessage.errorMessage(dataBySdk.getJSONObject("public_rsp").getString("errormsg"));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	/**
	 * @description 打开页面时从库里获取语句
	 */
	public String openSqlFromDB(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("type", "0");
		private_req_map.put("username", getUserName());
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			System.out.println("xxxxxxxxxxxxxxxxaimServer"+aimServer);
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_HisSqlRecord",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("objInfo", dataBySdk.getString("private_rsp"));
				}else{
					strutsMessage.errorMessage("后台无返回SQL！");
				}
			}else{
				strutsMessage.errorMessage(dataBySdk.getJSONObject("public_rsp").getString("errorcode"));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	//将字符串转成整型数组方法
	public int[] stringToIntArr(String str){
		String strArr[] = str.split(",");
		int outInArr[] = new int[strArr.length]; 
		for(int i =0;i<strArr.length;i++){
			outInArr[i]= Integer.parseInt(strArr[i]);
		}
		return outInArr;
	}
	//将sql字符串转成sql数组和注释数组
		private void sqlParse(String sqls){
			String splits[] = sqls.split("\n");
			for(int i=0;i<splits.length;i++){
				if(sb == null){
					sb = new StringBuffer();
				}
				if(splits[i]!=null&&!splits[i].equals("")){
					if(!splits[i].contains(";")){
						sb.append(splits[i]);
						if(sb.charAt(sb.length()-1)!=' '){
							sb.append(" ");
						}
					}else{
						String arr1[] = splits[i].split(";");
						String arr[] = new String[arr1.length];
						//去掉原有数组中首尾空格，然后赋值给新的数组
						for(int j=0;j<arr1.length;j++){
							arr[j] = arr1[j].trim();
						}
						sb.append(arr[0]);
						sqlList.add(replaceSpace(sb.toString()));
						sb = null;
						if(arr.length>1){
							if(arr[1].startsWith("--")){
								commentList.add(arr[1].substring(2));
							}else if(arr[1].startsWith("/*")&&arr[1].endsWith("*/")){
								commentList.add(arr[1].substring(2,arr[1].length() - 2));
							}else{
								commentList.add("");
							}
						}else{
							commentList.add("");
						}
					}
				}
			}
		}
		//将字符串中多个空格用一个空格替代
		private String replaceSpace(String str){
			String result = str.replaceAll("\\s{1,}", " ");
			return result;
		}
		//查询结果导出发送短信
		public String sendMessage(){
			AimReqAfaSdk req = new AimReqAfaSdk("VISUAL", "Dbcm_SendMessage");
			req.addPrivate_req("sql_id", Integer.parseInt(sql_id));
			req.addPublic_req("_opertype_", "1");
			req.addPublic_req("_currpage_", "1");
			req.addPublic_req("_pagenum_", "10");
			try {
				AimRespAfaSdk dataBySdk = (AimRespAfaSdk)aimServer.requestTimeOut(req, 2*60*1000);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
			return SUCCESS;
		}
	public String getDb_type() {
		return db_type;
	}
	public void setDb_type(String db_type) {
		this.db_type = db_type;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getOperator_type() {
		return operator_type;
	}
	public void setOperator_type(String operator_type) {
		this.operator_type = operator_type;
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
	public String getSqlObj() {
		return sqlObj;
	}
	public void setSqlObj(String sqlObj) {
		this.sqlObj = sqlObj;
	}
	public String getSupportgroup() {
		return supportgroup;
	}
	public void setSupportgroup(String supportgroup) {
		this.supportgroup = supportgroup;
	}
	public String getSqlContent() {
		return sqlContent;
	}
	public void setSqlContent(String sqlContent) {
		this.sqlContent = sqlContent;
	}
	public String getDb_name() {
		return db_name;
	}
	public void setDb_name(String db_name) {
		this.db_name = db_name;
	}
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
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
	public String getSql_editor() {
		return sql_editor;
	}
	public void setSql_editor(String sql_editor) {
		this.sql_editor = sql_editor;
	}
	public String getOperat_id() {
		return operat_id;
	}
	public void setOperat_id(String operat_id) {
		this.operat_id = operat_id;
	}
	public String getSql_id() {
		return sql_id;
	}
	public void setSql_id(String sql_id) {
		this.sql_id = sql_id;
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
