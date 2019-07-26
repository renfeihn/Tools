package cn.com.agree.aweb.struts2.action.asda;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.app.model.AppStatisticBean;
import tc.bank.asda.app.service.IAppStatisticService;
import tc.bank.asda.es.bean.Param;
import tc.bank.common.date.DateUtils;
import tc.bank.common.lang.StringUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("AppStatisticActionBean")
@Scope("prototype")
public class AppStatisticAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3094090846705374552L;

	@Autowired
	private IAppStatisticService appStatisticService;
	/**
	 * 主键ID
	 */
	private long id;
	/**
	 * 作用类型 1：应用 2: 主机：3:日志源
	 */
	private int type;

	/**
	 * 图表类型 1 柱状图 2 折线图 3 饼状图
	 */
	private int echarsType;

	/**
	 * 对象名
	 */
	private String objName;
	/**
	 * 执行SQL
	 */
	private String esSql;
	/**
	 * 指标说明
	 */
	private String retDesc;
	/**
	 * 应用系统以及资产对象
	 */
	private String cate;
	/**
	 * 开始时间
	 */
	private String startTime;
	/**
	 * 结束时间
	 */
	private String endTime;
	/**
	 * 统计字段名
	 */
	private String field;
	/**
	 * 排序方式 desc/asc
	 */
	private String orderType;
	/**
	 * top 值
	 */
	private int top;
	/**
	 * 应用系统id
	 */
	long appId;
	/**
	 * 配置json项
	 */
	String jsonCfg;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}

	public String getEsSql() {
		return esSql;
	}

	public void setEsSql(String esSql) {
		this.esSql = esSql;
	}

	public String getRetDesc() {
		return retDesc;
	}

	public void setRetDesc(String retDesc) {
		this.retDesc = retDesc;
	}

	public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public int getEcharsType() {
		return echarsType;
	}

	public void setEcharsType(int echarsType) {
		this.echarsType = echarsType;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public int getTop() {
		return top;
	}

	public void setTop(int top) {
		this.top = top;
	}

	/**
	 * 添加配置
	 * 
	 * @return
	 */
	public String add() {
		if (StringUtils.isAnyEmpty(esSql, objName, retDesc) || type <= 0 || echarsType <= 0) {
			setStrutsMessage(StrutsMessage.errorMessage("请求参数不足"));
			return ERROR;
		}
		try {
			AppStatisticBean bean = new AppStatisticBean();
			bean.setEsSql(esSql);
			bean.setType(type);
			bean.setObjName(objName);
			bean.setRetDesc(retDesc);
			bean.setEcharsType(echarsType);
			bean.setUserId(this.getUserVO().getId());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appStatisticService.add(bean)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 删除配置
	 * 
	 * @return
	 */
	public String del() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.del(id, getUserVO().getId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改配置
	 * 
	 * @return
	 */
	public String update() {
		try {
			AppStatisticBean bean = new AppStatisticBean();
			bean.setEsSql(esSql);
			bean.setRetDesc(retDesc);
			bean.setId(id);
			bean.setEcharsType(echarsType);
			bean.setUserId(this.getUserVO().getId());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", appStatisticService.update(bean)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据类型查询
	 * 
	 * @return
	 */
	public String getByObjName() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.getByObjName(type, getUserVO().getId(), objName)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据类型统计 交易耗时、最大交易耗时、最小交易耗时、平均交易耗时、交易数
	 * 
	 * @return
	 */
	public String statisBasic() {
		try {
			Param param = makeSearchParam();
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.statisBasic(Integer.valueOf(type), param)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 当日交易统计
	 * 
	 * @return
	 */
	public String statisDayCount() {
		try {
			Param param = makeSearchParam();
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", appStatisticService.statisDayCount(param)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 1分钟的日志量
	 * 
	 * @return
	 */
	public String statisTips() {
		try {
			Param param = makeSearchParam();
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.statisTips(Integer.valueOf(type), param)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 指标Echars
	 * 
	 * @return
	 */
	public String statisEchars() {
		try {
			Param param = makeSearchParam();
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.statisEchars(field, param)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 指标top接口
	 * 
	 * @return
	 */
	public String statisTops() {
		try {
			Param param = makeSearchParam();
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.statisTops(field, orderType, top, param)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * sql  带聚合解析 用户与应用系统配置，如果存在则更新
	 * 
	 * @return
	 */
	public String setDealAnalysisCfg() {
		try {
			AwebUser userVO = this.getUserVO();
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.setDealAnalysisCfg(userVO.getId(), appId, jsonCfg)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * sql  带聚合解析 用户与应用系统配置的获取
	 * 
	 * @return
	 */
	public String getDealAnalysisCfg() {
		try {
			AwebUser userVO = this.getUserVO();
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					appStatisticService.getDealAnalysisCfg(appId, userVO.getId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 组装请求参数
	 * 
	 * @return
	 * @throws Exception
	 */
	private Param makeSearchParam() {
		Param param = new Param();
		param.setUserId(this.getUserVO().getId());
		param.setMustValues(makeMustValues(cate));
		if (StringUtils.isNotEmpty(startTime)) {
			param.setStartTime(getTime(startTime) + "");
		}
		if (StringUtils.isNotEmpty(endTime)) {
			param.setEndTime(getTime(endTime) + "");
		}
		return param;
	}

	private long getTime(String time) {
		try {
			return DateUtils.parse(time, "yyyy-MM-dd HH:mm:ss").getTimeInMillis();
		} catch (ParseException e) {
			e.printStackTrace();
			return System.currentTimeMillis();
		}
	}

	/**
	 * 处理mustValues的格式
	 * 
	 * @return
	 * @throws Exception
	 */
	public Map<String, List<Object>> makeMustValues(String cate) {
		Map<String, List<Object>> mustValues = new HashMap<>();
		if (StringUtils.isEmpty(cate)) {
			return mustValues;
		}
		JSONObject json = JSONObject.parseObject(cate);
		if (null == json) {
			return mustValues;
		}
		JSONObject category = json.getJSONObject("category");
		if (null != category) {
			List<Object> cate1List = getJSONvalue(category.getJSONArray("cate1"), "cateName");
			if (cate1List.size() > 0) {
				mustValues.put("_head_.category1", cate1List);
			}
			List<Object> cate2List = getJSONvalue(category.getJSONArray("cate2"), "cateName");
			if (cate2List.size() > 0) {
				mustValues.put("_head_.category2", cate2List);
			}
			List<Object> cate3List = getJSONvalue(category.getJSONArray("cate3"), "cateName");
			if (cate3List.size() > 0) {
				mustValues.put("_head_.category3", cate3List);
			}
		}
		JSONObject app = json.getJSONObject("app");
		if (null != app) {
			List<Object> appList = getJSONvalue(app.getJSONArray("cate3"), "cateName");
			if (null != appList && appList.size() > 0) {
				mustValues.put("_head_.appname", appList);
			}
			List<Object> appIdList = getJSONvalue(app.getJSONArray("cate3"), "cateId");
			if (null != appIdList && appIdList.size() > 0) {
				mustValues.put("_head_.appid", appIdList);
			}
		}
		JSONObject hosts = json.getJSONObject("hosts");
		if (null != hosts) {
			List<Object> hostList = hosts.getJSONArray("host");
			if (null != hostList && hostList.size() > 0) {
				mustValues.put("_head_.hostip", hostList);
			}
		}
		return mustValues;
	}

	private List<Object> getJSONvalue(JSONArray array, String keyName) {
		List<Object> list = new ArrayList<>();
		if (null == array) {
			return null;
		}
		for (Object temp : array) {
			JSONObject json = (JSONObject) temp;
			String value = json.getString(keyName);
			if (StringUtils.isNoneEmpty(value)) {
				list.add(value);
			}
		}
		return list;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public String getJsonCfg() {
		return jsonCfg;
	}

	public void setJsonCfg(String jsonCfg) {
		this.jsonCfg = jsonCfg;
	}
	
}
