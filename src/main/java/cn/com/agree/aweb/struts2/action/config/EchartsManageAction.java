package cn.com.agree.aweb.struts2.action.config;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;
import tc.bank.cama.cmdb.model.table.CmdbObjectSummary;
import tc.bank.common.core.Timeline;
import tc.bank.common.utils.TimelineUtils;
import tc.cama.aweb.bean.PageCfgObjectSummary;
import tc.cama.aweb.echarts.service.IEchartsManager;
import tc.cama.aweb.service.IAppConfigOverview;
import tc.cama.aweb.service.IEvent;

@Controller("EchartsManageActionBean")
@Scope("prototype")
public class EchartsManageAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IEchartsManager echartsManager;
	@Autowired
	private IEvent event;
	@Autowired
	private IAppConfigOverview appConfigOverview;
	private int styleId;
	private String metricCate;
	private String path;
	private List<Long> appIds;
	private Long objectId;
	private Long []objIds;
	private List<String> levelOneTwoName;
	private String levelOneName;
	private String levelTwoName;
	private int instanceId;
	private String metricName;
	private String params;
	private String isOs;
	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public IEchartsManager getEchartsManager() {
		return echartsManager;
	}

	public void setEchartsManager(IEchartsManager echartsManager) {
		this.echartsManager = echartsManager;
	}
	
	public String getPath() {
		return path;
	}

	public int getInstanceId() {
		return instanceId;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public void setInstanceId(int instanceId) {
		this.instanceId = instanceId;
	}

	public int getStyleId() {
		return styleId;
	}

	public void setStyleId(int styleId) {
		this.styleId = styleId;
	}

	public String getIsOs() {
		return isOs;
	}

	public void setIsOs(String isOs) {
		this.isOs = isOs;
	}

	public void setMetricCate(String metricCate) {
		this.metricCate = metricCate;
	}

	
	public Long[] getObjIds() {
		return objIds;
	}

	public void setObjIds(Long[] objIds) {
		this.objIds = objIds;
	}

	public String getLevelOneName() {
		return levelOneName;
	}

	public void setLevelOneName(String levelOneName) {
		this.levelOneName = levelOneName;
	}

	public String getLevelTwoName() {
		return levelTwoName;
	}

	public void setLevelTwoName(String levelTwoName) {
		this.levelTwoName = levelTwoName;
	}

	public List<Long> getAppIds() {
		return appIds;
	}

	public void setAppIds(List<Long> appIds) {
		this.appIds = appIds;
	}

	public List<String> getLevelOneTwoName() {
		return levelOneTwoName;
	}

	public void setLevelOneTwoName(List<String> levelOneTwoName) {
		this.levelOneTwoName = levelOneTwoName;
	}

	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	
	public Long getObjectId() {
		return objectId;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	/**
	 * echarts样式id
	 * @param styleId
	 * @return
	 */
	public String getEchartsStyle(){
		JSONObject echartsStyle=echartsManager.getEchartsStyle(styleId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsStyle", echartsStyle));
		return SUCCESS;
		
	}
	
	/**
	 * echarts页面设置
	 * @param path
	 * @return
	 */
	public String getEchartsPage(){
		JSONArray echartsPage=echartsManager.getEchartsPage(path);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsPage", echartsPage));
		return SUCCESS;	
	}
	
	/**
	 * echarts实例化配置
	 * @param instanceId
	 * @return
	 */
	public String getEchartsInstance(){
		JSONArray echartsInstance=echartsManager.getEchartsInstance(instanceId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsInstance", echartsInstance));
		return SUCCESS;
	}
	
	public String getWorkSpaceEidtData() throws Exception{
		System.out.println("objectID:"+objectId); 
		JSONArray echartsInstance=echartsManager.getEchartsInstance(instanceId);
		JSONObject json=ConvertUtils.convert(echartsInstance.get(0), JSONObject.class);
		String tid=json.getString("tid");
		String eType=json.getString("eType");
		JSONArray defineMetric=echartsManager.getEchartsDefind(tid);
		JSONObject json2=ConvertUtils.convert(defineMetric.get(0), JSONObject.class);
		String category=json2.getString("category");
		Map<Object,Object> result=new HashMap<Object, Object>();
		result=echartsManager.getObjectTirdCateByObjId(objectId);
		Long appid =echartsManager.getObjectRelatedAppId(objectId);
		result.put("appId",appid);		
		result.put("metric", tid);
		result.put("objectId", objectId);
		result.put("category", category);
		result.put("eType", eType);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("EditData", result));
		return SUCCESS;	
	}
	
	/**
	 * 获取ESBecharts数据
	 * @return
	 *
	 */
	public String getEsbEchartsConfig(){
		JSONObject echartsStyle=echartsManager.getEchartsStyle(styleId);
		JSONArray echartsInstance=echartsManager.getEchartsInstance(instanceId);
		JSONObject json=ConvertUtils.convert(echartsInstance.get(0), JSONObject.class);
		String eType=json.getString("eType");
		if(eType.equalsIgnoreCase("bar")){
			Map<String,Object> echartsData=echartsManager.getBarEchartsData(toJsonObject(params), echartsInstance);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsStyle", echartsStyle)
					.addParameter("echartsInstance", echartsInstance).addParameter("echartsData", echartsData));
		}else{
		Timeline<Double> echartsData=echartsManager.getEsbEchartsData(toJsonObject(params), echartsInstance); 
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsStyle", echartsStyle)
				.addParameter("echartsInstance", echartsInstance));
		EchartsUtils.setEchartsData(getStrutsMessage(), echartsData);
		}
		return SUCCESS;
	}

	public String getEchartsConfig() throws NumberFormatException, Exception{
		JSONObject echartsStyle=echartsManager.getEchartsStyle(styleId);
		JSONArray echartsInstance=echartsManager.getEchartsInstance(instanceId);
		JSONObject json=ConvertUtils.convert(echartsInstance.get(0), JSONObject.class);
		String eType=json.getString("eType");
		if(eType.equalsIgnoreCase("bar")){
			Map<String,Object> echartsData=echartsManager.getBarEchartsData(toJsonObject(params), echartsInstance);
			String tid=json.getString("tid");
			if("os.filestat.ftime".equals(tid))
			{
				SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
				List<String> line=	(List<String>) echartsData.get("line1");
				for (int i=0;i<line.size();i++){
					if("0".equals(line.get(i))){
						continue;
					}
					String time=line.get(i)+"000";
					long value=Long.parseLong(time);
					Calendar calendar=Calendar.getInstance();
					calendar.setTimeInMillis(value);
					String resultTime=df.format(calendar.getTime());
					line.set(i, resultTime);
					
				}
				
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsStyle", echartsStyle)
					.addParameter("echartsInstance", echartsInstance).addParameter("echartsData", echartsData));
		}else{
		Timeline<Double> echartsData=echartsManager.getEchartsData(toJsonObject(params), echartsInstance,isOs); 
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsStyle", echartsStyle)
				.addParameter("echartsInstance", echartsInstance));
		EchartsUtils.setEchartsData(getStrutsMessage(), TimelineUtils.numberFormat(echartsData));
		}
		return SUCCESS;
	}

	

	/**
	 * 将json字符串转化成Json对象
	 * @return
	 */
	private JSONObject toJsonObject(String jsonString){
		return (JSONObject) JSON.parseObject(jsonString);
	}
	
	
	public String getEchartsRefresh(){
		JSONArray echartsInstance=echartsManager.getEchartsInstance(instanceId);
		Timeline<Double> echartsData=echartsManager.getCurEchartsData(toJsonObject(params), echartsInstance);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsInstance", echartsInstance));
		EchartsUtils.setEchartsData(getStrutsMessage(), TimelineUtils.numberFormat(echartsData));
		return SUCCESS;
	}
	public String getBarEchartsData(){
		JSONObject echartsStyle=echartsManager.getEchartsStyle(styleId);
		JSONArray echartsInstance=echartsManager.getEchartsInstance(instanceId);
		Map<String,Object> echartsData=echartsManager.getBarEchartsData(toJsonObject(params), echartsInstance); 
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsStyle", echartsStyle)
				.addParameter("echartsInstance", echartsInstance).addParameter("echartsData", echartsData));
		return SUCCESS;
	}
	/**
	 * 获取三级分类
	 * @return
	 * @throws Exception
	 */
	public String getObjectCategory() throws Exception{
		List<CmdbObjectCategory> objectCates = event.getObjectCategory();
		List<String>level3Cate=new ArrayList<String>();
		for(CmdbObjectCategory cateObj:objectCates){
			String cate=""+cateObj.getLevelOneName()+"_"+cateObj.getLevelTwoName()+"_"+cateObj.getLevelThreeName();
			if(!level3Cate.contains(cate)){
			level3Cate.add(cateObj.getLevelThreeName());
			}
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("objectCate", objectCates));
		return SUCCESS;
	}
	/**
	 * 获取指标分类
	 * @return
	 * @throws Exception
	 */
	public String getMetricCate() throws Exception{
		Object metricCate=echartsManager.getMetricCate();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("metricCate", metricCate));
		return SUCCESS;
	}
	/**
	 * 获取指标名称
	 * @return
	 * @throws Exception
	 */
	public String getMetricName() throws Exception{
		Object metricNameList=echartsManager.getMetricName(metricCate);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("metricNameList", metricNameList));
		return SUCCESS;
	}
	/**
	 * 查询指定系统二级分类下所有对象概要
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getSecondCategoryObjects() throws Exception {
		//List<Map<Object,Object>>cate2Objects1=new ArrayList<Map<Object,Object>>();
	//	List<PageCfgObjectSummary> cate2Objects=new ArrayList<PageCfgObjectSummary>();
       // List<Long> cate2ObjIds=new ArrayList<Long>();
//        appIds=new ArrayList<Long>();
//        appIds.add(70213l); 
//        levelOneTwoName=new ArrayList<String>();
//        levelOneTwoName.add("软件,应用程序");
       Object cate2Objects= echartsManager.getgetSecondCategoryObjects(appIds, levelOneTwoName);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("cate2Objects", cate2Objects));
		return SUCCESS;
	}
	
	public String getThirdCategoryObjects() throws Exception {
		 Object cate2Objects= echartsManager.getThirdCategoryObjects(appIds, levelOneTwoName);
			
			setStrutsMessage(StrutsMessage.successMessage().addParameter("cate2Objects", cate2Objects));
			return SUCCESS;
		
	}
	
	public String getDataTable() throws SQLException, Exception{
		    Object dataTable= echartsManager.getDataTable(metricCate);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("dataTable", dataTable));
			return SUCCESS;
	}
}
