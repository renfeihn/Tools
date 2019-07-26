package tc.cama.aweb.echarts.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import tc.bank.common.core.Timeline;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

public interface IEchartsManager {
	/**
	 * 获取指标分类
	 * @return
	 */
	
    Object getMetricCate();
    /**
     * 获取指定应用系统指定对象下的对象
     * @param appIds
     * @param cate12Name
     * @return
     * @throws Exception 
     */
    Object getgetSecondCategoryObjects(List<Long> appIds,List<String> cate12Name) throws Exception;
    /**
     * 获取指定应用系统和三级分类下的对象
     * @param appIds
     * @param cateThirdName
     * @return
     * @throws Exception 
     */
    Object getThirdCategoryObjects(List<Long> appIds,List<String> cateThirdName) throws Exception;
    /**
     * 根据指标分类获取指标名称
     * @return
     */
    Object getMetricName(String metricCate);
	/**
	 * 获取echarts样式
	 * @param styleId
	 * @return
	 */
	JSONObject getEchartsStyle(int styleId);
	/**
	 * 获取echarts页面配置
	 * @param path
	 * @return
	 */
	JSONArray getEchartsPage(String path);
	/**
	 * 获取echarts实例
	 * @param instanceId
	 * @return
	 */
	JSONArray getEchartsInstance(int instanceId);
	
	/**
	 * 获取echarts数据
	 * @param params
	 * @param echartsInstance
	 * @return
	 * @throws Exception 
	 * @throws NumberFormatException 
	 */
	Timeline<Double> getEchartsData(JSONObject params,JSONArray echartsInstance,String isOs) throws NumberFormatException, Exception;

	/**
	 * 获取esb echarts数据(待完成)
	 * @param params
	 * @param echartsInstance
	 * @return
	 */
	Timeline<Double> getEsbEchartsData(JSONObject params,JSONArray echartsInstance);
	
	/**
	 * 获取最新的echarts数据
	 * @param params
	 * @param echartsInstance
	 * @return
	 */
	Timeline<Double> getCurEchartsData(JSONObject params,JSONArray echartsInstance);
	/**
	 * 获取柱状图 echarts
	 * @param params
	 * @param echartsInstance
	 * @return
	 */
	Map<String,Object> getBarEchartsData(JSONObject params,JSONArray echartsInstance);
	/**
	 * 获取datatable数据
	 * @param params
	 * @param echartsInstance
	 * @return
	 * @throws SQLException 
	 * @throws Exception 
	 */
	Object getDataTable(String metricName) throws SQLException, Exception;
	
	/**
	 * 获取饼状图
	 * @param appIds
	 * @param metricName
	 * @return
	 * @throws Exception
	 */
	Object getAppRate(int[] appIds,String metricName) throws Exception;
	/**
	 * 获取对象的关键kpi数据 
	 * @param objId
	 * @param metricName
	 * @return
	 */
	Map<String,Object> getObjectKeyKPI(int objId,String [] metricNames);
	/**
	 * 获取根据指标名获得指标定义数据
	 * @param name
	 * @return
	 */
	JSONArray getEchartsDefind(String name);
	
	
	/**
	 * 根据对象id获得三级分类名和分类id
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	Map<Object,Object> getObjectTirdCateByObjId(Long objectId) throws Exception;
	/**
	 * 根据对象id获得应用id
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	Long getObjectRelatedAppId(Long objectId) throws Exception;
}
