package cn.com.agree.aweb.struts2.action.asda;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CompressUtil;
import cn.com.agree.aweb.util.ExcelHandle;
import cn.com.agree.aweb.util.MailUtil;
import cn.com.agree.aweb.util.ResumeWord;
import tc.bank.asda.es.bean.CategoryMap;
import tc.bank.asda.es.bean.Fields;
import tc.bank.asda.es.bean.FormatFields;
import tc.bank.asda.es.bean.Mail;
import tc.bank.asda.es.bean.Param;
import tc.bank.asda.es.bean.PopularRet;
import tc.bank.asda.es.bean.SearchRet;
import tc.bank.asda.es.bean.query.ESSummaryFileQuery;
import tc.bank.asda.es.service.IESQuickSearch;
import tc.bank.asda.es.service.IESSearch;
import tc.bank.asda.logconfig.model.AimlCfgLogQuickSearch;
import tc.bank.asda.logconfig.service.IAimlCfgLogSourceService;
import tc.bank.asda.sysvariable.service.ISysVariableService;
import tc.bank.common.date.DateUtils;
import tc.cama.aweb.model.AwebUser;

@Controller("ESSearchActionBean")
@Scope("prototype")
public class ESSearchAction extends StandardActionSupport {
	private static final Logger LOG = LoggerFactory.getLogger(ESSearchAction.class);

	/**
	 * 
	 */
	private static final long serialVersionUID = -774339103279428853L;

	@Autowired
	private ResumeWord resumeWord;

	@Autowired
	private IESSearch searchService;

	@Autowired
	private IESQuickSearch esQuickSearch;

	@Autowired
	private ISysVariableService variableService;

	@Autowired
	private IAimlCfgLogSourceService sourceService;

	/**
	 * 从多少行开始查询
	 */
	private int from;

	/**
	 * 分页查询每页大小,默认为10条
	 */
	private int size = 10;

	/**
	 * 开始时间
	 */
	private String startTime;
	/**
	 * 结束时间
	 */
	private String endTime;
	/**
	 * 应用系统以及资产对象
	 */
	private String cate;
	/**
	 * 流水ID
	 */
	private String serialNo;
	/**
	 * ES索引
	 */
	private String index = "applog-*";
	/**
	 * ES路由
	 */
	private String routing;
	/**
	 * 应用ID列表
	 */
	private List<String> appIds;
	/**
	 * 统计频率（支持 year,quarter,month,week,day,hour,minute,second）
	 */
	private String interval;

	private String aggsTerm;

	private String search;

	private String sql;

	private String fieldName;

	private String isSort;
	/**
	 * 统计语句
	 */
	private String aggs;
	/**
	 * 统计类型
	 */
	private int staticsType;
	/**
	 * 快速搜索ID
	 */
	private long quickSearchId;
	/**
	 * 快速搜索top数
	 */
	private int top;
	/**
	 * 分页 页码
	 */
	private Integer pageNum;
	/**
	 * 快速搜索对象
	 */
	private String quickSearch;
	/**
	 * 文件名
	 */
	private String fileName;
	/**
	 * 当前路径
	 */
	private String currentPath;
	/**
	 * 主机
	 */
	private String host;
	
	private List<String> sort;
	
	private long acqTime;

	private InputStream inStream;

	private String id;

	private int pageSize;

	private Integer page;
	
	private Integer total;

	private String preambleTime;

	private String postambleTime;

	private String parent;

	private String mail;

	private List<Long> sourceIds;

	private String esFileQueryString;
	
	private int curPage;

	private int aimPage;

	private long lastAcqTime;
	
	private String param;
	
	private List<String> leftIds;
	
	private String ikType;
	
	private String keyword;
	
	public String getIkType() {
		return ikType;
	}

	public void setIkType(String ikType) {
		this.ikType = ikType;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public List<String> getLeftIds() {
		return leftIds;
	}

	public void setLeftIds(List<String> leftIds) {
		this.leftIds = leftIds;
	}

	public Integer getCurPage() {
		return curPage;
	}

	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}

	public Integer getAimPage() {
		return aimPage;
	}

	public void setAimPage(Integer aimPage) {
		this.aimPage = aimPage;
	}

	public long getLastAcqTime() {
		return lastAcqTime;
	}

	public void setLastAcqTime(long lastAcqTime) {
		this.lastAcqTime = lastAcqTime;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public String getEsFileQueryString() {
		return esFileQueryString;
	}

	public void setEsFileQueryString(String esFileQueryString) {
		this.esFileQueryString = esFileQueryString;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}
	

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPreambleTime() {
		return preambleTime;
	}

	public void setPreambleTime(String preambleTime) {
		this.preambleTime = preambleTime;
	}

	public String getPostambleTime() {
		return postambleTime;
	}

	public void setPostambleTime(String postambleTime) {
		this.postambleTime = postambleTime;
	}

	public List<String> getAppIds() {
		return appIds;
	}

	public void setAppIds(List<String> appIds) {
		this.appIds = appIds;
	}
	
	public List<String> getSort() {
		return sort;
	}

	public void setSort(List<String> sort) {
		this.sort = sort;
	}

	public InputStream getInStream() {
		if (inStream != null) {
			return inStream;
		}
		String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
		try {
			inStream = new FileInputStream(path);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		deleteFile(path);
		return inStream;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getRouting() {
		return routing;
	}

	public void setRouting(String routing) {
		this.routing = routing;
	}

	private boolean deleteFile(String filePath) {
		boolean flag = false;
		File file = new File(filePath);
		if (file.isFile() && file.exists()) {
			file.delete();
			flag = true;
		}
		return flag;
	}

	public void setInStream(InputStream inStream) {
		this.inStream = inStream;
	}

	public int getFrom() {
		return from;
	}

	public void setFrom(int from) {
		this.from = from;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
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

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getIsSort() {
		return isSort;
	}

	public void setIsSort(String isSort) {
		this.isSort = isSort;
	}

	public String getSerialNo() {
		return serialNo;
	}

	public String getAggsTerm() {
		return aggsTerm;
	}

	public void setAggsTerm(String aggsTerm) {
		this.aggsTerm = aggsTerm;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getAggs() {
		return aggs;
	}

	public void setAggs(String aggs) {
		this.aggs = aggs;
	}

	public String getInterval() {
		return interval;
	}

	public void setInterval(String interval) {
		this.interval = interval;
	}

	public long getQuickSearchId() {
		return quickSearchId;
	}

	public void setQuickSearchId(long quickSearchId) {
		this.quickSearchId = quickSearchId;
	}

	public int getTop() {
		return top;
	}

	public void setTop(int top) {
		this.top = top;
	}

	public void setQuickSearch(String quickSearch) {
		this.quickSearch = quickSearch;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public int getStaticsType() {
		return staticsType;
	}

	public void setStaticsType(int staticsType) {
		this.staticsType = staticsType;
	}

	public String getCurrentPath() {
		return currentPath;
	}

	public void setCurrentPath(String currentPath) {
		this.currentPath = currentPath;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public long getAcqTime() {
		return acqTime;
	}

	public void setAcqTime(long acqTime) {
		this.acqTime = acqTime;
	}

	public List<Long> getSourceIds() {
		return sourceIds;
	}

	public void setSourceIds(List<Long> sourceIds) {
		this.sourceIds = sourceIds;
	}

	public static void main(String[] args) {
		String[] split = "context.log".split("\\.");
		for (String string : split) {
			System.out.println(string);
		}
		
		System.out.println("context.log".split("\\.").length);
	}
	
	/**
	 * 普通搜索
	 * 
	 * @return
	 */
	public String search() {
		try {
			if(from == 0 && size == 0) {
				if(search.contains("|")) {
					search = search.substring(0,search.indexOf("|"));
				}
			}
			SearchRet result = searchService.search(makeSearchParam(), search);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败，请检查查询语句"));
			return ERROR;
		}
	}

	/**
	 * 普通搜索-聚合应用
	 * 
	 * @return
	 */
	public String aggsApp() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.searchAggs(makeSearchParam(), search)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查看所有的结构化字段
	 * 
	 * @return
	 */
	public String getFields() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.getFields(sourceIds)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 获取字段列表用于数据统计
	 */
	public String getFieldsForStatics() {
		List<Fields> result = searchService.getFields(sourceIds);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	/**
	 * 查看所有的查询格式化字段显示百分比化字段
	 * 
	 * @return
	 */
	public String getPopularTop() {
		try {
			List<PopularRet> result = searchService.getPopularTop(makeSearchParam(), search, fieldName, 5);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查看匹配次数Echars数据
	 * 
	 * @return
	 */
	public String getDocCountEchars() {
		try {
			String result = searchService.getDocCountEchars(makeSearchParam(), search, interval, aggsTerm);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败，请检查查询语句"));
			return ERROR;
		}
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
	 * 获取原流水日志内容
	 * 
	 * @return
	 */
	public String getOriginalDetail() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					searchService.getOriginalDetailWithHeightLight(index, host, fileName, id, 
							0, 0, pageSize, 0, 0, false, this.getUserVO().getId(), "")));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	
	/**
	 * 获取原流水日志内容
	 * @return
	 */
	public String getOriginalDetailWithHeightLight() {
		try {
			if(total == null)
				total = 0;
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					searchService.getOriginalDetailWithHeightLight(index, host, fileName, 
							id, curPage, aimPage, pageSize, lastAcqTime, total, false, this.getUserVO().getId(), search)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	

	/**
	 * 获取结构化日志内容
	 * 
	 * @return
	 */
	public String getFormatDetail() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.getFormatDetail(index, routing, serialNo)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 获取结构化日志内容
	 * 
	 * @return
	 */
	public String getFormatLog() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.getFormatLog(serialNo)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查看快速搜索列表
	 * 
	 * @return
	 */
	public String addQuickSearchs() {
		try {
			AimlCfgLogQuickSearch obj = JSONObject.parseObject(quickSearch, AimlCfgLogQuickSearch.class);
			obj.setCreateUser(this.getUserVO().getId());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esQuickSearch.addQuickSearch(obj)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改快速搜索列表
	 * 
	 * @return
	 */
	public String updateQuickSearchs() {
		try {
			AimlCfgLogQuickSearch obj = JSONObject.parseObject(quickSearch, AimlCfgLogQuickSearch.class);
			obj.setCreateUser(this.getUserVO().getId());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esQuickSearch.updateQuickSearch(obj)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查看快速搜索信息
	 * 
	 * @return
	 */
	public String getQuickSearch() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esQuickSearch.getQuickSearch(quickSearchId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 查看快速搜索列表
	 * 
	 * @return
	 */
	public String getQuickSearchs() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esQuickSearch.getQuickSearchList(this.getUserVO().getId(), top, pageNum==null?0:pageNum)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 获取快速搜索总数
	 * 
	 * @return
	 */
	public String getQuickSearchCount() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esQuickSearch.getQuickSearchCount(this.getUserVO().getId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 删除快速搜索信息
	 * 
	 * @return
	 */
	public String delQuickSearch() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esQuickSearch.delQuickSearch(quickSearchId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 获取三级分类
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getObjectCategory() {
		try {
			List<CategoryMap> list = searchService.getAllCategoryMap();
			Set<CategoryMap> applicationCates = new HashSet<>();
			Set<CategoryMap> systemCates = new HashSet<>();
			List<Long> roleApps = sourceService.getUserDataRole((String) this.getSession().getAttribute("username"), "1");
			for (CategoryMap temp : list) {
				if ("应用群组".equals(temp.getCateName())) {
					Set<CategoryMap> childs = temp.getChilds();
					for (CategoryMap app1 : childs) {
						Set<CategoryMap> app1Childs = app1.getChilds();
						for (CategoryMap app2 : app1Childs) {
							Set<CategoryMap> app2Childs = app2.getChilds();
							Set<CategoryMap> roleChilds = new HashSet<>();
							for (CategoryMap map : app2Childs) {
								for (Long roleApp : roleApps) {
									if (roleApp == map.getCateId()) {
										roleChilds.add(map);
									}
								}
							}
							app2.setChilds(roleChilds);
						}
					}
					applicationCates.addAll(childs);
				} else {
					systemCates.add(temp);
				}
			}
			Map<String, Set<CategoryMap>> map = new HashMap<>();
			map.put("app", applicationCates);
			map.put("sys", systemCates);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", map));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 快速搜索次数加一
	 */
	public void updateQuickSearchTime() {
		AimlCfgLogQuickSearch obj = esQuickSearch.getQuickSearch(quickSearchId);
		if (obj != null) {
			obj.setUsedTimes(obj.getUsedTimes() + 1);
			esQuickSearch.updateQuickSearch(obj);
		}
	}

	/**
	 * SQL搜索
	 * 
	 * @return
	 */
	public String sqlSearch() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.sqlSearch(makeSearchParam(), search)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败，请检查查询语句"));
			return ERROR;
		}
	}

	/**
	 * SQL统计
	 * 
	 * @return
	 */
	public String sqlStatistics() {
		try {
			JSONObject statisticsRet = searchService.sqlStatistics(makeSearchParam(), search, sql);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", statisticsRet));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败，请检查查询语句"));
			return ERROR;
		}
	}

	/**
	 * SQL搜索 带聚合解析
	 * 
	 * @return
	 */
	public String sqlSearchWithAggregationsParse() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.sqlSearchWithAggregationsParse(makeSearchParam(), search)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败，请检查查询语句"));
			return ERROR;
		}
	}
	
	/**
	 * 导出SQL统计
	 * 
	 * @return
	 */
	public String esportSQLStatistics() {
		try {
			String aggsStr = new String(aggs.getBytes("ISO-8859-1"), "UTF-8");
			JSONObject aggsToJSON = JSONObject.parseObject(aggsStr);
			Object[] rowName = null;
			List<Object[]> dataList = new ArrayList<Object[]>();
			if (staticsType == -1) {
				if (aggsToJSON.toJSONString().contains("^^^")) {
					for (String key : aggsToJSON.keySet()) {
						JSONObject result = aggsToJSON.getJSONObject(key);
						for (String childKey : result.keySet()) {
							try {
								JSONObject grandson = result.getJSONObject(childKey);
								int arraySize = 1 + grandson.keySet().size();
								rowName = new Object[arraySize];
								Object[] data = new Object[arraySize];
								String[] array = key.split("\\^\\^\\^");
								rowName[0] = array[0];
								data[0] = array[1];
								int i = 1;
								for (String grandsonKey : grandson.keySet()) {
									rowName[i] = childKey + "@" + grandsonKey;
									data[i] = grandson.get(grandsonKey);
									i++;
								}
								dataList.add(data);
							} catch (Exception e) {
								int arraySize = 1 + result.keySet().size();
								rowName = new Object[arraySize];
								Object[] data = new Object[arraySize];
								String[] array = key.split("\\^\\^\\^");
								rowName[0] = array[0];
								data[0] = array[1];
								int i = 1;
								data[i] = result.get(childKey);
								for (String temp : result.keySet()) {
									rowName[i] = array[0] + "@" + temp;
									data[i] = result.get(temp);
									i++;
								}
								dataList.add(data);
								break;
							}
						}
					}
				} else if(aggsToJSON.containsKey("fieldName")&&"agg".equals(aggsToJSON.get("fieldName"))){
				
					JSONArray datas = aggsToJSON.getJSONArray("agg");
					// 循环数据
					JSONObject obj0 = datas.getJSONObject(0);
					if(obj0!=null&&obj0.size()>0){
						rowName = new Object[obj0.size()];
						
						int i=0;
						// 循环第一条数据取字段名
						for(String childKey : obj0.keySet()){
							rowName[i] = childKey;
							i++;
						}
						// 循环所有数据取值
						Object[] data = null;
						for(int m=0;m<datas.size();m++){
							JSONObject source = datas.getJSONObject(m);
							// 取每一行数据
							if(source!=null&&source.size()>0){
								data = new Object[obj0.size()];
								for(int n=0;n<rowName.length;n++){
									data[n] = source.get(rowName[n])==null||"".equals(source.get(rowName[n]))?" ":source.get(rowName[n]);
								}
								dataList.add(data);
							}
						}
					}
				}else {
					if(aggsToJSON.containsKey("hits")&&aggsToJSON.getJSONArray("hits").size()>0){
						JSONArray datas = aggsToJSON.getJSONArray("hits");
						// 循环数据
						JSONObject source0 = datas.getJSONObject(0).getJSONObject("_source");
						if(source0!=null&&source0.size()>0){
							rowName = new Object[source0.size()];
							
							int i=0;
							// 循环第一条数据取字段名
							for(String childKey : source0.keySet()){
								rowName[i] = childKey;
								i++;
							}
							// 循环所有数据取值
							Object[] data = null;
							for(int m=0;m<datas.size();m++){
								JSONObject source = datas.getJSONObject(m).getJSONObject("_source");
								// 取每一行source数据
								if(source!=null&&source.size()>0){
									data = new Object[source0.size()];
									for(int n=0;n<rowName.length;n++){
										data[n] = source.get(rowName[n])==null||"".equals(source.get(rowName[n]))?" ":source.get(rowName[n]);
									}
									dataList.add(data);
								}
							}
						}
						
						
					}
				}
			} else if (staticsType == 0 || staticsType == 2) {// 0:事件趋势统计 2:时间间隔统计
				JSONArray buckets = aggsToJSON.getJSONArray("buckets");
				Map<String, Map<String, Object>> map = new HashMap<>();
				Set<String> keySet = new HashSet<>();
				for (Object temp : buckets) {
					JSONObject bucket = (JSONObject) temp;
					String key = bucket.getString("key_as_string");
					if (StringUtils.isEmpty(key)) {
						key = bucket.getString("key");
					}
					Map<String, Object> map0 = new HashMap<>();
					for (String keyTemp : bucket.keySet()) {
						try {
							JSONObject valueJson = bucket.getJSONObject(keyTemp);
							map0.put(keyTemp, valueJson.getString("value"));
							keySet.add(keyTemp);
						} catch (Exception e) {
						}
					}
					map.put(key, map0);
				}
				Object[] keySetArray = keySet.toArray();
				rowName = new Object[keySetArray.length + 1];
				rowName[0] = "key";
				for (int i = 0; i < keySetArray.length; i++) {
					rowName[i + 1] = keySetArray[i];
				}
				for (String key : map.keySet()) {
					Map<String, Object> map0 = map.get(key);
					Object[] data = new Object[rowName.length];
					data[0] = key;
					for (int i = 1; i < rowName.length; i++) {
						data[i] = map0.get(rowName[i]);
					}
					dataList.add(data);
				}
			} else if (staticsType == 3) {// 3数值区间统计
				JSONArray buckets = aggsToJSON.getJSONArray("buckets");
				for (Object temp : buckets) {
					JSONObject bucket = (JSONObject) temp;
					Object[] data = new Object[2];
					data[0] = bucket.getString("key");
					Object value = 0;
					String key = "value";
					for (String keyTemp : bucket.keySet()) {
						try {
							JSONObject valueJson = bucket.getJSONObject(keyTemp);
							value = valueJson.getString("value");
							key = keyTemp;
						} catch (Exception e) {
						}
					}
					data[1] = value;
					dataList.add(data);
					rowName = new Object[2];
					rowName[0] = fieldName;
					rowName[1] = key;
				}
			} else if (staticsType == 1 || staticsType == 4) {// 1时间分区统计 4数值分类统计
				JSONArray buckets = aggsToJSON.getJSONArray("buckets");
				rowName = new Object[2];
				rowName[0] = fieldName;
				rowName[1] = "value";
				for (Object temp : buckets) {
					JSONObject bucket = (JSONObject) temp;
					String key = bucket.getString("key_as_string");
					if (StringUtils.isEmpty(key)) {
						key = bucket.getString("key");
					}
					Object[] data = new Object[2];
					data[0] = key;
					data[1] = bucket.get("doc_count");
					dataList.add(data);
				}
			} else if (staticsType == 5) {// 5数值百分比统计
				rowName = new Object[3];
				rowName[0] = "字段";
				rowName[1] = "百分比";
				rowName[2] = "值";
				JSONObject values = aggsToJSON.getJSONObject("values");
				for (String temp : values.keySet()) {
					Object[] data = new Object[3];
					data[0] = fieldName;
					data[1] = temp;
					data[2] = values.get(temp);
					dataList.add(data);
				}
			}
			return exportFile("统计结果", rowName, dataList);
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 全量下载sql结果
	 * @return
	 */
	public String sqlSearchDownLoad() {
		try {
			long id = searchService.sqlSearchDownLoad(makeSearchParam(), search);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("id", id));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败，请检查查询语句"));
			return ERROR;
		}
	}
	
	/**
	 * 查询sql全量结果是否下载完毕
	 * @param id
	 * @return
	 */
	public String checkSqlSearchDownLoadIsFinish() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.checkSqlSearchDownLoadIsFinish(Long.parseLong(id))));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败"));
			return ERROR;
		}
	}
	
	/**
	 * 导出文件
	 * 
	 * @param
	 * @return
	 * @throws Exception
	 */
	public String exportFile(String title, List<JSONObject> dataList) throws Exception {
		HSSFWorkbook workbook = null;
		OutputStream out = null;
		this.fileName = "Asda_Statics_" + DateUtils.format(new Date(), "yyyyMMdd") + ".xls";
		File downFilePath = new File(ServletActionContext.getServletContext().getRealPath("download"));
		if (!downFilePath.exists()) {
			downFilePath.mkdirs();
		}
		String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
		File file = new File(path);
		if (!file.exists()) {
			file.createNewFile();
		}
		workbook = ExcelHandle.export(title, dataList);
		out = new FileOutputStream(file);
		workbook.write(out);
		if (null != out) {
			out.close();
		}
		return "stream";
	}
	
	
	/**
	 * 导出文件
	 * 
	 * @param
	 * @return
	 * @throws Exception
	 */
	public String exportFile(String title, Object[] rowName, List<Object[]> dataList) throws Exception {
		HSSFWorkbook workbook = null;
		OutputStream out = null;
		this.fileName = "Asda_Statics_" + DateUtils.format(new Date(), "yyyyMMdd") + ".xls";
		File downFilePath = new File(ServletActionContext.getServletContext().getRealPath("download"));
		if (!downFilePath.exists()) {
			downFilePath.mkdirs();
		}
		String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
		File file = new File(path);
		if (!file.exists()) {
			file.createNewFile();
		}
		workbook = ExcelHandle.export(title, rowName, dataList);
		out = new FileOutputStream(file);
		workbook.write(out);
		if (null != out) {
			out.close();
		}
		return "stream";
	}

	/**
	 * SPL统计
	 * 
	 * @return
	 */
	public String SPLStatistics() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.SPLStatistics(makeSearchParam(), search)));
			return SUCCESS;
		} catch (Exception e) {
			String[] temp = e.getMessage().split(":");
			setStrutsMessage(StrutsMessage.errorMessage(temp[temp.length - 1]));
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
		param.setFrom(from);
		param.setSize(size);
		param.setUserId(this.getUserVO().getId());
		param.setMustValues(makeMustValues(cate));
		if (StringUtils.isNotEmpty(startTime)) {
			param.setStartTime(getTime(startTime) + "");
		}
		if (StringUtils.isNotEmpty(endTime)) {
			param.setEndTime(getTime(endTime) + "");
		}
		if (StringUtils.isNotEmpty(currentPath) && !"/".equals(currentPath)) {
			Map<String, String> phraseValues = new HashMap<>();
			phraseValues.put("_head_.file", currentPath);
			param.setPhraseValues(phraseValues);
		}
		param.setAppIds(appIds);
		param.setSort(sort);
		return param;
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
		if (app != null) {
			List<Object> appList = getJSONvalue(app.getJSONArray("cate3"), "cateName");
			if (appList.size() > 0) {
				mustValues.put("_head_.appname", appList);
			}
			List<Object> appIdList = getJSONvalue(app.getJSONArray("cate3"), "cateId");
			if (appIdList.size() > 0) {
				mustValues.put("_head_.appid", appIdList);
			}
		}
		JSONObject hosts = json.getJSONObject("hosts");
		if (hosts != null) {
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
			if(StringUtils.isNoneEmpty(value)) {
				list.add(value);
			}
		}
		return list;
	}

	/**
	 * 视图-文件视图
	 * 
	 * @return
	 */
	public String searchFileView() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.search(makeSearchParam(), search, currentPath)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 日志上下文查看
	 * 
	 * @return
	 */
	public String getLogContext() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", searchService.getLogContext(index, host, fileName, preambleTime, postambleTime)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}

	/**
	 * 查询满足条件的日志ID列表
	 * 
	 * @return
	 */
	public String searchId() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.searchId(makeSearchParam(), search)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}
	
	/**
	 * 查看日志原文
	 * 
	 * @return
	 */
	public String getContextByFile() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.getContextByFile(index, host, fileName, acqTime, size, total==null?-1:total.intValue(), search, leftIds, this.getUserVO().getId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}

	/**
	 * 查看日志原文
	 * 
	 * @return
	 */
	public String getContextByParent() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					searchService.getContextByParent(index, host, fileName, parent, acqTime, size, search, this.getUserVO().getId())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}

	/**
	 * 下载日志
	 */
	public void downLogDoc() {
		File file = null;
		InputStream is = null;
		ServletOutputStream out = null;
		try {
			Map<String, List<FormatFields>> formatMap = searchService.getFormatDetail(index, parent, serialNo);
			JSONObject originalDetail = searchService.getOriginalDetail(index, host, fileName, parent, 10000, 1, false, this.getUserVO().getId(), -1);
			JSONArray logs = originalDetail.getJSONArray("listData");
			file = createLogFile(formatMap, logs, "aimlog" + System.currentTimeMillis());
			is = new FileInputStream(file);
			String docName = "江西银行日志平台日志"+ DateUtils.format(new Date(), "yyyy_MM_dd") + ".doc";
			HttpServletResponse response = setResponse(this.getResponse(), "application/msword", docName);
			out = response.getOutputStream();
			byte[] buffer = new byte[1024];
			int bytesToRead = -1;
			while ((bytesToRead = is.read(buffer)) != -1) {
				out.write(buffer, 0, bytesToRead);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (is != null) {
					is.close();
				}
				if (out != null) {
					out.close();
				}
				if (file != null) {
					file.delete();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
	}
	/**
	 * 下载日志
	 */
	public void downLogTxt() {
		File file = null;
		InputStream is = null;
		ServletOutputStream out = null;
		BufferedWriter writer = null;
		try {
			JSONObject originalDetail = searchService.downLoadOriginalDetail(index, host, fileName, parent);
			JSONArray logs = originalDetail.getJSONArray("listData");
			if (null != logs && logs.size() > 0) {
				writer = new BufferedWriter(new FileWriter("text"));
				for (Object tmp : logs) {
					JSONObject json = (JSONObject) tmp;
					writer.append(json.getString("LOG"));
					writer.flush();
				}
				file = new File("text");
				is = new FileInputStream(file);
			} 

			String[] array = fileName.split("/");
			if(array.length>0) {
				fileName = array[array.length-1];
			}
			HttpServletResponse response = setResponse(this.getResponse(), "application/msword", fileName);
			out = response.getOutputStream();
			byte[] buffer = new byte[1024];
			int bytesToRead = -1;
			while ((bytesToRead = is.read(buffer)) != -1) {
				out.write(buffer, 0, bytesToRead);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (is != null) {
					is.close();
				}
				if (out != null) {
					out.close();
				}
				if (file != null) {
					file.delete();
				}
				if(writer != null) {
					writer.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
	}

	public void downloadLogOriginal() throws IOException {
		HttpServletResponse response = this.getResponse();
		if (response == null) {
			return;
		}
		response.reset();
		response.setCharacterEncoding("utf-8");
		if (getUserVO() == null) { // 未登录
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}
		if (fileName == null) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		OutputStream out = response.getOutputStream();
		FileInputStream is = null;
		try {
			String tempFile = writeLogStream(out, index, host, fileName, parent);
			if(StringUtils.isBlank(tempFile)) {
				throw new RuntimeException("文件获取失败");
			}
			String tarFileName = tempFile.split("\\.")[0];
			response = setResponse(response, "multipart/form-data", tarFileName+".tar.gz");
			CompressUtil.compressedFile(tempFile, tarFileName+".tar");
			byte[] buffer = new byte[1024];
			int bytesToRead = -1;
			is = new FileInputStream(tarFileName+".tar.gz");
			while ((bytesToRead = is.read(buffer)) != -1) {
				out.write(buffer, 0, bytesToRead);
			}
			new File(tarFileName+".tar.gz").deleteOnExit();
		} catch (Exception e) {
			LOG.error("下载文件异常: " + fileName, e);
		} finally {
			if(null != out ) {
				out.close();
			}
			if(null != is) {
				is.close();
			}
		}
	}
	
	private HttpServletResponse setResponse(HttpServletResponse response,String contextType,String name) throws UnsupportedEncodingException {
		response.setCharacterEncoding("utf-8");
		response.setContentType(contextType);
		response.addHeader("Content-Disposition","attachment;filename=" + new String(name.getBytes("utf-8"), "iso-8859-1"));
		return response;
	}

	@SuppressWarnings("resource")
	private String writeLogStream(OutputStream out, String index, String host, String fileName, String parent) throws IOException {
		if (index == null || host == null || fileName == null) {
			return null;
		}
		String[] array = fileName.split("/");
		String tempFile = fileName;
		if(array.length>0) {
			tempFile = array[array.length-1];
		}
		int page = 1;
		int total = -1;
		final int PAGE_SIZE = 2000;
		FileWriter writer = new FileWriter(new File(tempFile));
		while (true) {
			JSONObject originalDetail = searchService.getLogFile(index, host, fileName, getUserVO().getId());
			JSONArray logs = originalDetail.getJSONArray("listData");
			if (logs == null || logs.isEmpty()) {
				return null;
			}
			for (int i = 0; i < logs.size(); i++) {
				String log = logs.getJSONObject(i).getString("LOG");
				writer.write(log);
			}
			page++; // 下一页
			total = originalDetail.getIntValue("total");
			int totalPage = (total - 1) / PAGE_SIZE + 1;
			if (page > totalPage) {
				break;
			}
		}
		writer.close();
		return tempFile;
	}

	/**
	 * 邮件发送
	 * 
	 * @return
	 */
	public String sendMail() {
		File file = null;
		try {
			Map<String, String> map = variableService.getProperties("mail");
			if (null == map || map.isEmpty()) {
				setStrutsMessage(StrutsMessage.errorMessage("邮件服务未配置！"));
				return ERROR;
			}
			Mail obj = JSONObject.toJavaObject(JSON.parseObject(mail), Mail.class);
			if (null == obj) {
				setStrutsMessage(StrutsMessage.errorMessage("邮件内容参数错误"));
				return ERROR;
			}
			String content = obj.getContent().replaceAll("\r\n", "<br>").replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			obj.setContent(content);
			if (obj.isAttach()) {
				Map<String, List<FormatFields>> formatMap = searchService.getFormatDetail(index, routing, serialNo);
				JSONObject originalDetail = searchService.getOriginalDetail(index, host, fileName, parent, 10000, 1, false, getUserVO().getId(), -1);
				JSONArray logs = originalDetail.getJSONArray("listData");
				file = createLogFile(formatMap, logs, "江西银行日志平台日志.doc");
				obj.setFile(file);
			}
			obj.setFrom(map.get("user"));
			String imagePath = this.getRequest().getSession().getServletContext().getRealPath("/") + "img/bank/JiangXiBank.png";
			obj.setImagePath(imagePath);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					MailUtil.send(map.get("host"), map.get("protocol"), map.get("user"), map.get("password"), obj)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		} finally {
			try {
				if (file != null) {
					file.delete();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
	}
	
	/**
	 * freemark 创建文件
	 * 
	 * @param formatMap
	 * @param originalDetail
	 * @param fileName
	 * @return
	 */
	private File createLogFile(Map<String, List<FormatFields>> formatMap, JSONArray originalDetail, String fileName) {
		// 给map填充数据
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("downDate", DateUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
		if (null != formatMap) {
			List<FormatFields> formatFields = formatMap.get("public");
			for (FormatFields tmp : formatFields) {
				String fieldName = tmp.getFieldName();
				if ("一级分类".equals(fieldName)) {
					dataMap.put("cat1", StringEscapeUtils.escapeXml((String) tmp.getFieldValue()));
					continue;
				} else if ("二级分类".equals(fieldName)) {
					dataMap.put("cat2", StringEscapeUtils.escapeXml((String) tmp.getFieldValue()));
					continue;
				} else if ("三级分类".equals(fieldName)) {
					dataMap.put("cat3", StringEscapeUtils.escapeXml((String) tmp.getFieldValue()));
					continue;
				} else if ("日志源名称".equals(fieldName)) {
					dataMap.put("sourceName", StringEscapeUtils.escapeXml((String) tmp.getFieldValue()));
					continue;
				} else if ("应用名称".equals(fieldName)) {
					dataMap.put("appName", StringEscapeUtils.escapeXml((String) tmp.getFieldValue()));
					continue;
				} else if ("主机IP".equals(fieldName)) {
					dataMap.put("IP", StringEscapeUtils.escapeXml((String) tmp.getFieldValue()));
					continue;
				} else if ("交易耗时".equals(fieldName)) {
					dataMap.put("duration", tmp.getFieldValue() + "毫秒");
					continue;
				} else if ("日志文件".equals(fieldName)) {
					dataMap.put("file", StringEscapeUtils.escapeXml((String) tmp.getFieldValue()));
					continue;
				}
			}
		}
		if (null != originalDetail && originalDetail.size() > 0) {
			StringBuilder build = new StringBuilder();
			for (Object tmp : originalDetail) {
				JSONObject json = (JSONObject) tmp;
				build.append(StringEscapeUtils.escapeXml(json.getString("LOG"))).append("<w:p></w:p>");
			}
			dataMap.put("log", build.toString());
		} else {
			dataMap.put("log", "");
		}
		return resumeWord.createDoc(dataMap, "aimlog", fileName);
	}

	/**
	 * 文件列表統計
	 * 
	 * @return
	 */
	public String statisLogFile() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.statisLogFile(makeSearchParam(), search)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}

	/**
	 * 日志大小統計
	 * 
	 * @return
	 */
	public String statisAllLogSize() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.statisAllLogSize(null)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}

	/**
	 * 当日日志量統計
	 * 
	 * @return
	 */
	public String statisTodayLogSize() {
		try {
			String date = DateUtils.format(new Date(), "yyyyMMdd");
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.statisAllLogSize(date)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}

	/**
	 * 分页获取ESFile文件列表
	 * 
	 * @return
	 */
	public String listESFiles() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.listESFiles(getESSummaryFileQuery())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("服务错误！"));
			return ERROR;
		}
	}

	private ESSummaryFileQuery getESSummaryFileQuery() {
		return JSON.parseObject(esFileQueryString, ESSummaryFileQuery.class);
	}

	/**
	 * 获取服务端当前时间
	 * 
	 * @return
	 */
	public String getNowTime() {
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", new Date().getTime()));
		return SUCCESS;
	}
	
	
	/**
	 * 日志文件下载
	 * @return
	 */
	public String logFileDownLoad() {
		try {
			long id = searchService.fileDownLoad(index, host, fileName, getUserVO().getId());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("id", id));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败，请检查查询语句"));
			return ERROR;
		}
	}
	
	/**
	 * 查询日志文件是否下载完毕
	 * @param id
	 * @return
	 */
	public String checkFileDownLoadIsFinish() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.checkFileDownLoadIsFinish(Long.parseLong(id))));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("查询失败"));
			return ERROR;
		}
	}
	
	public String searchApplog() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isEmpty(param)) {
					setStrutsMessage(StrutsMessage.errorMessage("参数有误！"));
					return ERROR;
				}
				@SuppressWarnings("unchecked")
				Map<String, String> paramMap = (Map<String, String>)JSON.parseObject(param, Map.class);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.searchApplog(paramMap)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getAnalyzeWordsByIkType() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isAnyEmpty(ikType, keyword)) {
					setStrutsMessage(StrutsMessage.errorMessage("参数有误！"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.getAnalyzeWordsByIkType(ikType, keyword)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getOneTradeAcqList() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(StringUtils.isAnyEmpty(index, id)) {
					setStrutsMessage(StrutsMessage.errorMessage("参数有误！"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", searchService.getOneTradeAcqList(index, id)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
}
