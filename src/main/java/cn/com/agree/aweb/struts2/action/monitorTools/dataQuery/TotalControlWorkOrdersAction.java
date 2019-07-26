package cn.com.agree.aweb.struts2.action.monitorTools.dataQuery;

import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.afa.util.Base64;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.struts2.action.support.AimReqAfaSdk;
import cn.com.agree.aweb.struts2.action.support.AimRespAfaSdk;
import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.util.SdkDataUtil;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * @author zhouyuehui@agree.com.cn 
 * @description 数据查询
 * 2016年12月8日 下午2:13:31  
 */
@Controller(value="TotalControlWorkOrdersActionBean")
@Scope("prototype")
public class TotalControlWorkOrdersAction extends AimStandardActionSupport {
	private static final long serialVersionUID = -1096784473984846443L;
	private String orderClass;//执行风险控制cfg_class
	private String orderClass2;
	private String orderType;//执行风险控制cfg_type
	private String groupName;
	private String urlParams;
	private String app_id;//仅仅供接口Dbcm_DbDeployinfo使用
	private String checkStatus;//列表状态值
	/*下面五个参数是供接口Dbcm_SourceQuy使用  点击查询按钮是通过下面的条件筛选出需要的数据*/
	private String paramKeyWords; //参数差错单列表  关键字(task_name)
	private String paramStartTime;//计划开始维护时间
	private String paramEndTime;//计划维护结束时间
	private String paramType;//参数类型
	private String paramStatus;//状态    
	
	private String c_name;
	/**
	 * @description 参数/差错单查询接口调用
	 */
	public String getWorkOders(){
		String totalrownum = null;
		JSONObject dataContain = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		SdkDataUtil.putData("task_name", paramKeyWords, private_req_map);
		SdkDataUtil.putData("dm_source",paramKeyWords,private_req_map);
		SdkDataUtil.putData("task_desc",paramKeyWords,private_req_map);
		SdkDataUtil.putData("plan_startTime", paramStartTime, private_req_map);
		SdkDataUtil.putData("plan_endTime", paramEndTime, private_req_map);
		SdkDataUtil.putData("wo_class", paramType, private_req_map);
		SdkDataUtil.putData("status", paramStatus, private_req_map);
		private_req_map.put("like_field_list", new String[]{"dm_source","wo_class","task_name","task_desc"});//对这几个字段进行模糊搜索
		JSONObject reqParamss = JSONObject.parseObject(urlParams);//前台传过来分页 后台分页需要的参数
		Integer iDisplayStart = reqParamss.getInteger("iDisplayStart");
    	Integer iDisplayLength = reqParamss.getInteger("iDisplayLength");
    	Integer currpage = (iDisplayStart/iDisplayLength)+1;
		//公共模块
		JSONObject publicdata=new JSONObject();
		publicdata.put("username",getUserName());
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_",currpage+"");
		publicdata.put("_pagenum_",iDisplayLength+"");
		
		dataContain.put("public_req", publicdata);
		dataContain.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_SourceQuy",dataContain);
			//将json转成数组对象 
			JSONArray sdkData = SdkDataUtil.transSdkData(dataBySdk);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					totalrownum = dataBySdk.getJSONObject("public_rsp").getString("totalrownum");
					strutsMessage.successMessage().addParameter("objInfo", sdkData).addParameter("totalrownum", totalrownum);
				}
			}else{
				strutsMessage.errorMessage("后台无返回数据无数据！");
			}
		}catch (Exception e) {
			strutsMessage.errorMessage("维护任务查询后台异常！");
		}
		return SUCCESS;
	}
	/**
	 * 执行风险控制  查询在数据库中查询组信息展示到页面的下拉框中
	 * @return
	 */
	public String querySupportGroup(){
//		String sql = "select distinct c_name from aim_department where dept_level=5";
//		try {
//			List<?> resultList = this.dbOperation.queryDataBySql(sql);
////			System.out.println(resultList);
//			strutsMessage.successMessage().addParameter("resultList", resultList);
//		} catch (DBSupportException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		return SUCCESS;
	}
	/**
	 * 执行风险控制  通过查询条件给后台接口返回详细table内容
	 * @return
	 */
	public String runRiskControl(){
		String totalrownum = null;
		JSONObject dataContain = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("supportgroup", groupName);
		private_req_map.put("cfg_class", "sql");
		private_req_map.put("cfg_class2", orderClass2);
		private_req_map.put("cfg_type", orderType);
		//公共模块
		JSONObject publicdata=new JSONObject();
		publicdata.put("username",getUserName());
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		dataContain.put("public_req", publicdata);
		dataContain.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_LimitConfig",dataContain);
			JSONArray sdkData = SdkDataUtil.transSdkData(dataBySdk);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					totalrownum = dataBySdk.getJSONObject("public_rsp").getString("totalrownum");
					strutsMessage.successMessage().addParameter("objInfo", sdkData).addParameter("totalrownum", totalrownum);
				}
			}else{
				strutsMessage.errorMessage("后台无返回数据无数据！");
			}
		}catch (Exception e) {
			strutsMessage.errorMessage("执行风险控制信息查询后台异常！");
		}
		return SUCCESS;
	}
	
	/**
	 * 查询人员具体信息，返回结果供填写工单用
	 * @return
	 */
	public String queryPersonInfo(){
		String createPersonNum =getUserName();
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Quy_PersonInfo",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("personObj", SdkDataUtil.transSdkData(dataBySdk)).addParameter("createPersonNum", createPersonNum);
				}else{
					strutsMessage.errorMessage("后台无返回数据无数据！");
				}
			}else{
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	/**
	 * 根据用户名查询应用系统，返回结果供填写工单用
	 * @return
	 */
	public String queryAppSysByName(){
		String maintain_user =getUserName();
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("username", maintain_user);
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Quy_CurUserApp",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("objInfo", SdkDataUtil.transSdkData(dataBySdk));
				}else{
					strutsMessage.errorMessage("后台无返回数据无数据！");
				}
			}else{
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	/**
	 *  查询应用下的数据库部署信息
	 * @return
	 */
	public String getDbInfo(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("app_id", Integer.parseInt(app_id));//实际上此处obj_id即app_id
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_Db_Info",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("objInfo", SdkDataUtil.transSdkData(dataBySdk));
				}else{
					strutsMessage.errorMessage("后台无返回数据无数据！");
				}
			}else{
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return SUCCESS;
	}
	/**
	 * @description 通过app_id获取应用下的数据源
	 */
	public String dbpoolByAppid(){
		AimReqAfaSdk req = new AimReqAfaSdk("VISUAL", "Quy_ByConfSql");
		req.addPrivate_req("cfg_name", "confsql_getPoolByAppid");
		req.addPrivate_req("app_id", app_id);
		req.addPublic_req("_opertype_","0");
		
		try {
			AimRespAfaSdk dataBySdk = (AimRespAfaSdk)aimServer.requestTimeOut(req, 3*1000*60);
			JSONObject publicResultData = dataBySdk.getPublic();
			JSONObject responseData = dataBySdk.getPrivate();
			if("000000".equals(publicResultData.getString("errorcode"))){
				JSONObject tmpJson = new JSONObject();
				JSONArray passJarr = responseData.getJSONArray("password");
				for(int i=0;i<passJarr.size();i++){
					passJarr.set(i,new String(Base64.decodeBase64(passJarr.getString(i).getBytes())));
				}
				responseData.put("password", passJarr);
				tmpJson.put("private_rsp", responseData);
				JSONArray jsonArrayData = SdkDataUtil.transSdkData(tmpJson);
				JSONArray objInfoArray = new JSONArray();
				for(int i = 0;i<jsonArrayData.size();i++){
					if("jzjkuser".equals(jsonArrayData.getJSONObject(i).getString("username"))||"jzjkusr".equals(jsonArrayData.getJSONObject(i).getString("username"))){
						objInfoArray.add(jsonArrayData.getJSONObject(i));
					}
				}
				strutsMessage.successMessage().addParameter("objInfo", objInfoArray/*SdkDataUtil.transSdkData(tmpJson)*/);
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
	 *  模糊查询所有数据库
	 * @return
	 */
	public String loadDbInfo(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("c_name", c_name);
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_Db_Info",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("objInfo", SdkDataUtil.transSdkData(dataBySdk));
				}else{
					strutsMessage.errorMessage("后台无返回数据无数据！");
				}
			}else{
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			strutsMessage.errorMessage("调用代理接口超时！");
		} 
		return SUCCESS;
	}
	/**
	 * 将sdkData转成数组对象
	 * @param sdkData
	 * @return
	 */
	public static JSONArray transDataDB(JSONObject sdkData){
		JSONArray results = new JSONArray();
		if(sdkData!=null && !sdkData.isEmpty()){
			/** 1. 获取private_rsp段的数据 */
			JSONObject privateRsp = (JSONObject) sdkData.get("private_rsp");
			JSONObject dbData = (JSONObject) privateRsp.get("DB");
			if(dbData!=null && !dbData.isEmpty()){
			/** 2. 获取所有key */
			Set<String> keys = dbData.keySet();
			/** 3. 根据key集合，遍历JSON对象，并转换成JSONArray */
			int valueLength = dbData.getJSONArray((String) keys.toArray()[0]).size();
			if(valueLength > 0){
				for(int x=0; x<valueLength; x++){
					JSONObject obj = new JSONObject();
					for(String key : keys){
						Object value = dbData.getJSONArray(key).get(x);
						obj.put(key, value);
					}
					results.add(obj);
				}
				return results;
			}
		}
	}
	return null;
}
	public String getOrderClass() {
		return orderClass;
	}
	public void setOrderClass(String orderClass) {
		this.orderClass = orderClass;
	}
	public String getOrderType() {
		return orderType;
	}
	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}
	public String getOrderClass2() {
		return orderClass2;
	}
	public void setOrderClass2(String orderClass2) {
		this.orderClass2 = orderClass2;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getUrlParams() {
		return urlParams;
	}
	public void setUrlParams(String urlParams) {
		this.urlParams = urlParams;
	}
	public String getApp_id() {
		return app_id;
	}
	public void setApp_id(String app_id) {
		this.app_id = app_id;
	}
	public String getCheckStatus() {
		return checkStatus;
	}
	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}
	public String getParamKeyWords() {
		return paramKeyWords;
	}
	public void setParamKeyWords(String paramKeyWords) {
		this.paramKeyWords = paramKeyWords;
	}
	public String getParamStartTime() {
		return paramStartTime;
	}
	public void setParamStartTime(String paramStartTime) {
		this.paramStartTime = paramStartTime;
	}
	public String getParamEndTime() {
		return paramEndTime;
	}
	public void setParamEndTime(String paramEndTime) {
		this.paramEndTime = paramEndTime;
	}
	public String getParamType() {
		return paramType;
	}
	public void setParamType(String paramType) {
		this.paramType = paramType;
	}
	public String getParamStatus() {
		return paramStatus;
	}
	public void setParamStatus(String paramStatus) {
		this.paramStatus = paramStatus;
	}
	public String getC_name() {
		return c_name;
	}
	public void setC_name(String c_name) {
		this.c_name = c_name;
	}
}
