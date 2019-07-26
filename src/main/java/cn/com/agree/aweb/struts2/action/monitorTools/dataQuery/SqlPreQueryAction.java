package cn.com.agree.aweb.struts2.action.monitorTools.dataQuery;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.util.SdkDataUtil;

import com.aim.alibaba.fastjson.JSONObject;

/**
 * @author zhouyuehui@agree.com.cn 
 * @description 数据查询预执行
 * 2017年2月23日 下午8:08:14  
 */
@Controller(value="SqlPreQueryActionBean")
@Scope("prototype")
public class SqlPreQueryAction extends AimStandardActionSupport {
	private static final long serialVersionUID = -7867948920145098679L;
	private String db_type;//数据库类型
	private String url;
	private String username;
	private String password;//密码
	private String operator_type;//操作类型
	private String sqlObj;//sql对象
	private String supportgroup;//用户所在组
	private String editContent;
	private String app_name;//应用名称
	private String app_id;
	private String db_id;
	
	private String dbpool_id; //数据源id
	private String agentType; //代理类型
	StringBuffer sb = null;
	List<String> sqlList = new ArrayList<String>();
	List<String> commentList = new ArrayList<String>();
	public String preExcute(){
		sqlParse(editContent.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&"));
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
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("dbtype", db_type);
		private_req_map.put("username", username);
		SdkDataUtil.putData("password", password,private_req_map);
		private_req_map.put("operator_type", operator_type);
		private_req_map.put("sql_no", sql_no);
		private_req_map.put("sql", sql);
		private_req_map.put("sql_remark", sql_remark);
		private_req_map.put("supportgroup", supportgroup);
		private_req_map.put("url", url);
		private_req_map.put("db_id", Integer.parseInt(db_id));
		private_req_map.put("app_id", Integer.parseInt(app_id));
		private_req_map.put("dbpool_id", dbpool_id);
		private_req_map.put("agentType", agentType);
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
//					String preCode = dataBySdk.getJSONObject("private_rsp").getString("sql_code"); 
					strutsMessage.successMessage().addParameter("objInfo", SdkDataUtil.transSdkData(dataBySdk));
				}else{
					strutsMessage.errorMessage(dataBySdk.getJSONObject("public_rsp").getString("errormsg"));
				}
			}else{
				strutsMessage.errorMessage("预执行后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
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
	//将字符串转成正型数组方法
	public int[] stringToIntArr(String str){
		String strArr[] = str.split(",");
		int outInArr[] = new int[strArr.length]; 
		for(int i =0;i<strArr.length;i++){
			outInArr[i]= Integer.parseInt(strArr[i]);
		}
		return outInArr;
	}
	//将字符串中多个空格用一个空格替代
	private String replaceSpace(String str){
		String result = str.replaceAll("\\s{1,}", " ");
		return result;
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
	public String getEditContent() {
		return editContent;
	}
	public void setEditContent(String editContent) {
		this.editContent = editContent;
	}
	public String getApp_name() {
		return app_name;
	}
	public void setApp_name(String app_name) {
		this.app_name = app_name;
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
