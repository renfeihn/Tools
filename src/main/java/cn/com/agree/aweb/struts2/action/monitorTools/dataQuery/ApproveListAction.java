package cn.com.agree.aweb.struts2.action.monitorTools.dataQuery;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.util.SdkDataUtil;

@Controller(value="ApproveListActionBean")
@Scope("prototype")
public class ApproveListAction extends AimStandardActionSupport {
	private static final long serialVersionUID = -6262743209098654938L;
	private String groupName;
	private String paramName;
	private String urlParams;
	private String operate_type;
	private String app_id;
	private String checkaccess;// 通过其判断操作类型（审批/忽略）

	/**
	 * @description 获取审批列表
	 */
	public String getApproveList() {
		String totalrownum = null;
		JSONObject dataObject = new JSONObject();
		JSONObject private_req_map = new JSONObject();
		SdkDataUtil.putData("supportgroup", groupName, private_req_map);
		SdkDataUtil.putData("c_name", paramName, private_req_map);
		if (app_id != null) {
			private_req_map.put("app_id", Integer.parseInt(app_id));
		}
		private_req_map.put("operate_type", operate_type);
		private_req_map.put("like_field_list", new String[] { "c_name" });
		JSONObject reqParamss = JSONObject.parseObject(urlParams);// 前台传过来分页
																	// 后台分页需要的参数
		JSONArray order_params = reqParamss.getJSONArray("order_field_list");
		JSONArray order_field_list = new JSONArray();
		if (order_params != null && !order_params.isEmpty()) {
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
		Integer currpage = (iDisplayStart / iDisplayLength) + 1;
		JSONObject publicdata = new JSONObject();
		publicdata.put("username", getUserName());
		publicdata.put("_opertype_", "1");
		publicdata.put("_currpage_", currpage + "");
		publicdata.put("_pagenum_", iDisplayLength + "");

		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL","Dbcm_ConfigCheck", dataObject);
			if (dataBySdk != null) {
				if ("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))) {
					totalrownum = dataBySdk.getJSONObject("public_rsp").getString("totalrownum");
					strutsMessage.successMessage().addParameter("objInfo",SdkDataUtil.transSdkData(dataBySdk)).addParameter("totalrownum", totalrownum);
				} else {
					strutsMessage.errorMessage("后台无返回数据无数据！");
				}
			} else {
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;

	}

	/**
	 * @description 更新审批列表
	 */
	public String updateApproveList() {
		JSONObject dataObject = new JSONObject();
		JSONObject private_req_map = new JSONObject();
		private_req_map.put("app_id", Integer.parseInt(app_id));
		private_req_map.put("operate_type", operate_type);
		private_req_map.put("checkaccess", checkaccess);
		JSONObject publicdata = new JSONObject();
		publicdata.put("username", getUserName());
		publicdata.put("_opertype_", "1");

		dataObject.put("public_req", publicdata);
		dataObject.put("private_req", private_req_map);
		try {
			JSONObject dataBySdk = aimServer.request("VISUAL","Dbcm_ConfigCheck", dataObject);
			if (dataBySdk != null) {
				if ("000000".equals(dataBySdk.getJSONObject("public_rsp").getString("errorcode"))) {
					strutsMessage.successMessage().addParameter("msg","更新审批列表成功！");
				} else {
					strutsMessage.errorMessage("更新审批列表失败！");
				}
			} else {
				strutsMessage.errorMessage("人员信息查询后台异常！");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;

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

	public String getUrlParams() {
		return urlParams;
	}

	public void setUrlParams(String urlParams) {
		this.urlParams = urlParams;
	}

	public String getOperate_type() {
		return operate_type;
	}

	public void setOperate_type(String operate_type) {
		this.operate_type = operate_type;
	}

	public String getApp_id() {
		return app_id;
	}

	public void setApp_id(String app_id) {
		this.app_id = app_id;
	}

	public String getCheckaccess() {
		return checkaccess;
	}

	public void setCheckaccess(String checkaccess) {
		this.checkaccess = checkaccess;
	}
	
}
