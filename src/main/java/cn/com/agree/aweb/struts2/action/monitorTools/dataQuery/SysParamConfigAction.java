package cn.com.agree.aweb.struts2.action.monitorTools.dataQuery;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.util.SdkDataUtil;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * @author zhouyuehui@agree.com.cn 
 * @description 系统参数配置(数据查询)
 * 2017年3月1日 下午6:20:20  
 */

@Controller(value="SysParamConfigActionBean")
@Scope("prototype")
public class SysParamConfigAction extends AimStandardActionSupport {
	private static final long serialVersionUID = 1325850068537497602L;
	private String sql_cfg_type;
	private String modiTimeOut;  //修改参数配置-超时时间
	private String modiMaxNumber; //修改参数配置-最大查询数
	private String supportgroup;
	private String app_id;
	private String urlParams;
	private String groupName;//查询条件组名
	private String paramName;//查询条件参数名
	
	
	private String rightGroupName;//右弹出框页面选择组
	/**
	 * @description 获取参数列表
	 */
	public String getParamList(){
		String totalrownum = null;
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		SdkDataUtil.putData("supportgroup", groupName, private_req_map);
		SdkDataUtil.putData("c_name", paramName, private_req_map);
		private_req_map.put("like_field_list", new String[]{"c_name"});
		JSONObject reqParamss = JSONObject.parseObject(urlParams);//前台传过来分页 后台分页需要的参数
		JSONArray order_params = reqParamss.getJSONArray("order_field_list");
		JSONArray order_field_list = new JSONArray();
		if(order_params!=null&&!order_params.isEmpty()){
			JSONArray temp = new JSONArray();
			for (int i = 0; i < order_params.size(); i++) {
				if(i%2 == 0){
					temp = new JSONArray();
					temp.add(order_params.get(i));
				}else{
					temp.add(order_params.get(i));
					order_field_list.add(temp);
				}
			}
		}
		private_req_map.put("order_field_list", order_field_list);
		Integer iDisplayStart = reqParamss.getInteger("iDisplayStart");
    	Integer iDisplayLength = reqParamss.getInteger("iDisplayLength");
    	Integer currpage = (iDisplayStart/iDisplayLength)+1;
    	JSONObject publicdata = new JSONObject();
    	publicdata.put("username",getUserName());
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_",currpage+"");
		publicdata.put("_pagenum_",iDisplayLength+"");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_ConfigSelQuy",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					totalrownum = dataBySdk.getJSONObject("public_rsp").getString("totalrownum");
					strutsMessage.successMessage().addParameter("objInfo", SdkDataUtil.transSdkData(dataBySdk)).addParameter("totalrownum", totalrownum);
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
	 * @description 新增sql配置
	 */
	public String configGroup(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("username", getUserName());
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
					JSONArray groupArray = dataBySdk.getJSONObject("private_rsp").getJSONArray("supportgroup");
					JSONArray grouptest = SdkDataUtil.transSdkData(dataBySdk);
					strutsMessage.successMessage().addParameter("groupInfo", getGroupNameArr(groupArray)).addParameter("appobjInfo", grouptest);
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
	public List<String> getGroupNameArr(JSONArray groupArray){
		List<String> list = new ArrayList<String>();
		for(int i=0;i<groupArray.size();i++){
			if(!list.contains(groupArray.getString(i))){
				list.add(groupArray.getString(i));
			}
		}
		return list;
	}
	/**
	 * @description 修改参数提交入库(update)
	 */
	public String dbConfigParam(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("app_id", Integer.parseInt(app_id));
		private_req_map.put("maxnum", Integer.parseInt(modiMaxNumber));
		private_req_map.put("time_out", Integer.parseInt(modiTimeOut)*1000);
		JSONObject publicdata = new JSONObject();
		publicdata.put("_opertype_","1");
		publicdata.put("_currpage_","1");
		publicdata.put("_pagenum_","10");
		
		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL", "Dbcm_ConfigUpdate",dataObject);
			if(dataBySdk!=null){
				if("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))){
					strutsMessage.successMessage().addParameter("msg", "true");
				}else{
					strutsMessage.successMessage().addParameter("msg", dataBySdk.getJSONObject("public_rsp").getString("errormsg"));
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
	 * @description 通过组名获取组下对应的系统
	 */
	public String groupToSystem(){
		JSONObject dataObject = new JSONObject();
		JSONObject  private_req_map=new JSONObject();
		private_req_map.put("supportgroup", rightGroupName);
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
					strutsMessage.successMessage().addParameter("objInfo",SdkDataUtil.transSdkData(dataBySdk));
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
	public String getSql_cfg_type() {
		return sql_cfg_type;
	}
	public void setSql_cfg_type(String sql_cfg_type) {
		this.sql_cfg_type = sql_cfg_type;
	}
	public String getUrlParams() {
		return urlParams;
	}
	public void setUrlParams(String urlParams) {
		this.urlParams = urlParams;
	}
	public String getRightGroupName() {
		return rightGroupName;
	}
	public void setRightGroupName(String rightGroupName) {
		this.rightGroupName = rightGroupName;
	}
	public String getSupportgroup() {
		return supportgroup;
	}
	public void setSupportgroup(String supportgroup) {
		this.supportgroup = supportgroup;
	}
	public String getApp_id() {
		return app_id;
	}
	public void setApp_id(String app_id) {
		this.app_id = app_id;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getParamName() {
		return paramName;
	}
	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	public String getModiTimeOut() {
		return modiTimeOut;
	}
	public void setModiTimeOut(String modiTimeOut) {
		this.modiTimeOut = modiTimeOut;
	}
	public String getModiMaxNumber() {
		return modiMaxNumber;
	}
	public void setModiMaxNumber(String modiMaxNumber) {
		this.modiMaxNumber = modiMaxNumber;
	}
	
}
