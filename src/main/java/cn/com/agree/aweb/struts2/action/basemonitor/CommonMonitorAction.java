package cn.com.agree.aweb.struts2.action.basemonitor;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.base_monitor.common.ICommonService;

@Controller("CommonMonitorAction")
@Scope("prototype")
public class CommonMonitorAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3671776319150877071L;

	@Autowired
	private ICommonService service;
	
	private int time;
	
	private int interval;
	
	private int objectId;
	
	
	private String[] metricNames;
	
	private String resultSet;
	
	private int metricKind;
	
	private String category;
	
	private String categoryKind;
	private int echarts_type;
	private String objName;
	
	private String tagvs;
	
	private String filed;
	
	private String whereEx;
	
	private int top;
	
	private String oraInsname;
	private String ip;
	private String nodeName;
	
	/*public TimeUnit getUnit() {
		return unit;
	}


	public void setUnit(TimeUnit unit) {
		this.unit = unit;
	}
*/

	public String getNodeName() {
		return nodeName;
	}


	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}


	public int getTop() {
		return top;
	}


	public void setTop(int top) {
		this.top = top;
	}


	public String getFiled() {
		return filed;
	}


	public String getWhereEx() {
		return whereEx;
	}


	public void setWhereEx(String whereEx) {
		this.whereEx = whereEx;
	}


	public void setFiled(String filed) {
		this.filed = filed;
	}


	public String getTagvs() {
		return tagvs;
	}


	public void setTagvs(String tagvs) {
		this.tagvs = tagvs;
	}


	public String getObjName() {
		return objName;
	}


	public void setObjName(String objName) {
		this.objName = objName;
	}


	public int getEcharts_type() {
		return echarts_type;
	}


	public void setEcharts_type(int echarts_type) {
		this.echarts_type = echarts_type;
	}

	public String getOraInsname() {
		return oraInsname;
	}


	public void setOraInsname(String oraInsname) {
		this.oraInsname = oraInsname;
	}

	public String getIp() {
		return ip;
	}


	public void setIp(String ip) {
		this.ip = ip;
	}

	private String metricName;
	
	private String l1CateName;
	
	private String l2CateName;
	
	private String l3CateName;
	
	public ICommonService getService() {
		return service;
	}


	public void setService(ICommonService service) {
		this.service = service;
	}


	public int getTime() {
		return time;
	}


	public void setTime(int time) {
		this.time = time;
	}


	public int getInterval() {
		return interval;
	}


	public void setInterval(int interval) {
		this.interval = interval;
	}


	public int getObjectId() {
		return objectId;
	}


	public void setObjectId(int objectId) {
		this.objectId = objectId;
	}
	
	public String[] getMetricNames() {
		return metricNames;
	}


	public void setMetricNames(String[] metricNames) {
		this.metricNames = metricNames;
	}


	public String getResultSet() {
		return resultSet;
	}


	public void setResultSet(String resultSet) {
		this.resultSet = resultSet;
	}


	public int getMetricKind() {
		return metricKind;
	}


	public void setMetricKind(int metricKind) {
		this.metricKind = metricKind;
	}

	public String getMetricName() {
		return metricName;
	}


	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}

	public String getL1CateName() {
		return l1CateName;
	}

	public void setL1CateName(String l1CateName) {
		this.l1CateName = l1CateName;
	}

	public String getL2CateName() {
		return l2CateName;
	}

	public void setL2CateName(String l2CateName) {
		this.l2CateName = l2CateName;
	}

	public String getL3CateName() {
		return l3CateName;
	}

	public void setL3CateName(String l3CateName) {
		this.l3CateName = l3CateName;
	}

	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public String getCategoryKind() {
		return categoryKind;
	}


	public void setCategoryKind(String categoryKind) {
		this.categoryKind = categoryKind;
	}


	/**
	 * 获取Echart
	 */
	public String getEachart()throws Exception{
		return getEachart(objectId, metricNames, time, interval, null);
	}
	
	/**
	 * 获取Echart
	 */
	public String getEachart(int objectId, String[] metricNames,int time, int interval,TimeUnit unit)throws Exception{

		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getEchart(objectId, metricNames, time, interval,unit)));
		return SUCCESS;
	}
	
	/**
	 * 获取关键指标列表
	 */
	public String getKeyMetric() throws Exception{
		Map<String,Object> whereMap=new HashMap<String,Object>();
		if(whereEx!=null){
			whereMap=JSONObject.parseObject(whereEx, whereMap.getClass());
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getKeyMetric(objectId, resultSet, whereMap)));
		return SUCCESS;
	}
	
	
	/**
	 * 获取关键指标列表
	 */
	public String getKeyMetricBywhere() throws Exception{
		Map<String,Object> whereExe= null;
		if(tagvs!=null && !"".equals(tagvs)){			
			try{
				whereExe = JSONObject.parseObject(tagvs);
			}catch(Exception e){
				e.printStackTrace();
			}	
		}
		if(resultSet.equals("weblogic_jvm_reports")){
			whereExe.put("name", whereExe.get("servername"));
			whereExe.remove("servername");
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getKeyMetricBywhere(resultSet,whereExe)));
		return SUCCESS;
	}
	
	
	/**
	 * 获取指标展开项
	 */
	public String getMetricExpand(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricExpand(categoryKind)));
		return SUCCESS;
	}
	
	/**
	 * 获取指标信息
	 * @throws Exception 
	 */
	public String getMetricInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricInfo(objectId,metricName)));
		return SUCCESS;
	}
	
	/**获取多指标信息
	 * @return
	 * @throws Exception 
	 */
	public String getMetricInfo2() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricInfo(objectId,metricNames)));
		return SUCCESS;
	}
	
	/**获取指标echarts
	 * @return
	 */
	public String getMetricEcharts(){
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricEcharts(time, objectId, interval, metricName,echarts_type)));
		return SUCCESS;
	}
	/**
	 * 汇总事件Echars
	 * @return
	 * @throws Exception
	 */
	public String getEventViewEcharts() throws Exception {
		Map<String, Object>result = service.getEventEcharts(time, interval, l1CateName, l2CateName, l3CateName);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result));
		return SUCCESS;
	}
	
	/**获取动态列
	 * @return
	 */
	public String getColums(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getColums(categoryKind)));
		return SUCCESS;
	}
	
	/**
	 * 获取首页基本信息
	 * @return
	 */
	public String getBaseInfo(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getBaseInfo(l1CateName, l2CateName, objectId)));
		return SUCCESS;
	}
	
	public String getSingleEcharts(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getSingleEcharts(time, objectId, objName, interval, metricName, echarts_type)));
		return SUCCESS;
	}
	  /**
	    * 汇总基本信息
	    * @return
	 * @throws Exception 
	    */
	   public String getSumInfoByCate() throws Exception{
		   setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getSumInfoByCate(category)));
		   return SUCCESS;
	   }
	
	/**获取指标标签
	 * @return
	 */
	public String getMetricTags(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricTags(objectId, metricName)));
		return SUCCESS;
	}
	/**带标签获取Echart
	 * @return
	 */
	public String getEachart2(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getEchart(objectId, metricNames, tagvs, time, interval)));
		return SUCCESS;
	}
	
	/**
	 * kb 数据转 Gb
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String getEchartByByteToGB(){
		/**
		 * objectId:101501
			interval:1
			time:60
			metricNames[]:weblogic.jvm.reports_heapfreecurrent
			metricNames[]:weblogic.jvm.reports_heapsizecurrent
			metricNames[]:weblogic.jvm.reports_heapsizemax
			tagvs:ecifserver1
			String metric[]= new String[]{"weblogic.jvm.reports_heapfreecurrent","weblogic.jvm.reports_heapsizecurrent","jvm.reports_heapsizemax"};
		 */
		Map<String,Object> map = service.getEchart(objectId, metricNames,tagvs, time, interval);
		Map<String,Object> datas=new HashMap<String,Object>();
		for (Map.Entry<String, Object> entry: map.entrySet())  {
			Object value = entry.getValue();
			datas = (Map<String, Object>) value;
			JSONArray obj= (JSONArray) datas.get("datas");
			JSONArray return1 = new JSONArray();
			if(obj!=null){				
				for (int i = 0; i < obj.size(); i++) {
					JSONArray json = obj.getJSONArray(i) ;
					JSONArray return2 = new JSONArray();
					if(json !=null){
						for (int j = 0; j < json.size() ; j++) {
							long num = json.getLong(j);
							long result = num/1024/1024;
							return2.add(result);
						}
					}
					return1.add(return2);
				}
			}
			datas.put("datas", return1);
		}
		map.put("echartsData", datas);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",map));
		return SUCCESS;
	}
	
	/**获取某个指标的数量
	 * @return
	 * @throws Exception 
	 */
	public String getMetricCount() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricCount(objectId, resultSet,filed,whereEx)));
		return SUCCESS;
	}
	
	public String getHTML(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getHTML(category)));
		return SUCCESS;
	}
	
	/**获取指标列表前几条数据
	 * @return
	 * @throws Exception
	 */
	public String getKeyMetric2() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getKeyMetric(objectId, metricName, whereEx, top)));
		return SUCCESS;
	}
	
	public String getEchartSumValue() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getEchartSumValue(objectId, metricNames, time, interval, null)));
		return SUCCESS;
	}
	
	public String getEventCount() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getEventCount(objectId, time, interval)));
		return SUCCESS;
	}
	public String getEchartByTagLike() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getEchartByTagLike(objectId, metricNames, tagvs, time, interval)));
		return SUCCESS;
	}
	public String queryErrLogKeysOracle() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.queryErrLogKeysOracle(oraInsname)));
		return SUCCESS;
	}
	public String getMetricProperty() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricProperty(Long.parseLong(objectId+""))));
		return SUCCESS;
	}
	public String getObjectByIp() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getObjectByIp(ip)));
		return SUCCESS;
	}
	public static void main(String[] args) {
		String json = "{'object_id':'101501','servername':'ecifserver1'}";
		System.out.println(JSONObject.parse(json));
	}
	private long cateId;
	
	public long getCateId() {
		return cateId;
	}


	public void setCateId(long cateId) {
		this.cateId = cateId;
	}


	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getSoftSumInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getSummaryObjInfo(cateId, l1CateName, l2CateName)));
		return SUCCESS;
	}
	
	public String getDataMetrics() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getDataMetrics(category, objectId,nodeName)));
		return SUCCESS;
	}
	public String getMetricEchart() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetricEcharts(time, objectId, interval, metricNames)));
		return SUCCESS;
	}
	public String getKeyMetrics() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMetric(objectId, metricNames)));
		return SUCCESS;
	}
	
	//获取监控首页数据
	public String getMonitorData() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMyMonitorData()));
		return SUCCESS;
	}
	
	
	public String getMyMonitorInstance() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",service.getMyMonitorInstance(category)));
		return SUCCESS;
	}
}
