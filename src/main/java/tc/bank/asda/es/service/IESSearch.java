package tc.bank.asda.es.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import tc.bank.asda.es.bean.CategoryMap;
import tc.bank.asda.es.bean.Fields;
import tc.bank.asda.es.bean.FormatFields;
import tc.bank.asda.es.bean.Param;
import tc.bank.asda.es.bean.PopularRet;
import tc.bank.asda.es.bean.SearchRet;
import tc.bank.asda.es.bean.dto.ESSummaryFileDTO;
import tc.bank.asda.es.bean.query.ESSummaryFileQuery;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

public interface IESSearch {

	public JSONObject esPost(String url, JSONObject params) throws Exception;

	/**
	 * 普通搜索
	 * 
	 * @param param
	 *            基本参数[必传]
	 * @param search
	 *            搜索语句
	 * @return
	 */
	public SearchRet search(Param param, String search);

	/**
	 * 普通搜索
	 * 
	 * @param param
	 *            基本参数[必传]
	 * @param search
	 *            搜索语句
	 * @return
	 */
	public SearchRet searchWithoutAggs(Param param, String search);

	/**
	 * 普通搜索-聚合应用
	 * 
	 * @param param
	 *            基本参数[必传]
	 * @param search
	 *            搜索语句
	 * @return
	 */
	public JSONObject searchAggs(Param param, String search);

	/**
	 * 匹配次数
	 * 
	 * @param param
	 *            基本参数[必传]
	 * @param search
	 *            搜索语句
	 * @param interval
	 *            统计频率（支持 year,quarter,month,week,day,hour,minute,second）
	 * @param aggsTerm
	 *            聚合字段
	 * @return
	 */
	public String getDocCountEchars(Param param, String search, String interval, String aggsTerm);

	/**
	 * 获取字段列表
	 * 
	 * @return
	 */
	public List<Fields> getFields(List<Long> sourcesIds);

	/**
	 * 获取结构化日志内容
	 * 
	 * @param index
	 * @param routing
	 * @param serialNo
	 * @return
	 */
	public Map<String, List<FormatFields>> getFormatDetail(String index, String routing, String serialNo);

	/**
	 * 日志结构化信息查看
	 * 
	 * @param serialNo
	 * @return
	 */
	public JSONObject getFormatLog(String serialNo);

	/**
	 * 查询格式化字段显示百分比
	 * 
	 * @param param
	 * @param search
	 * @param fieldName
	 * @param size
	 * @return
	 */
	public List<PopularRet> getPopularTop(Param param, String search, String fieldName, int size);

	/**
	 * 　数据同步
	 * 
	 * @param param
	 * @param search
	 * @param aggs
	 * @return
	 */
	public JSONArray indexSync(String index, String timeName, long startTime, long endTime);

	/**
	 * 　数据同步
	 * 
	 * @param param
	 * @param search
	 * @param aggs
	 * @return
	 */
	public String getMaxItem(String index, String timeName);

	/**
	 * 三级分类 展示
	 * 
	 * @return
	 */
	List<CategoryMap> getAllCategoryMap();

	/**
	 * SQL查询
	 * 
	 * @param param
	 * @param search
	 * @return
	 */
	Map<String, Object> sqlSearch(Param param, String search);

	/**
	 * SQL统计
	 * 
	 * @param param
	 * @param search
	 * @param sql
	 * @return
	 */
	JSONObject sqlStatistics(Param param, String search, String sql);

	/**
	 * SPL统计
	 * 
	 * @param param
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	JSONObject SPLStatistics(Param param, String sql) throws Exception;

	/**
	 * 日志搜索文件视图
	 * 
	 * @param param
	 * @param search
	 * @param currentPath
	 * @return
	 */
	Map<String, Set<String>> search(Param param, String search, String currentPath);

	/**
	 * 获取日志上下文
	 * 
	 * @param host
	 *            主机
	 * @param fileName
	 *            文件名
	 * @param preambleTime
	 * @param postambleTime
	 * @return
	 */
	Map<String, Object> getLogContext(String index, String host, String fileName, String preambleTime, String postambleTime);

	/**
	 * 分页查看日志内容
	 * 
	 * @param index
	 *            索引
	 * @param host
	 *            主机IP
	 * @param file
	 *            日志文件
	 * @param parentId
	 *            parentId
	 * @param pageSize
	 *            页面大小
	 * @param page
	 *            第几页
	 * @param deal
	 * @param user
	 * @param total
	 *            总记录数
	 * @return
	 */
	JSONObject getOriginalDetail(String index, String host, String fileName, String parentId, Integer pageSize, Integer page, boolean deal,
			Integer userId, int total);

	/**
	 * 查询满足条件的日志ID
	 * 
	 * @param param
	 *            基本参数[必传]
	 * @param search
	 *            搜索语句
	 * @return
	 */
	public Set<String> searchId(Param param, String search);

	/**
	 * 查看日志原文
	 * 
	 * @param index
	 *            索引
	 * @param host
	 *            主机
	 * @param fileName
	 *            文件名
	 * @param acqtime
	 *            当前日志行时间
	 * @param size
	 *            前几条 siz<0; 后几条size>0
	 * @param total 总记录数
	 * @return
	 */
	JSONObject getContextByFile(String index, String host, String fileName, 
			long acqtime, int size, int total, String search, 
			List<String> lestIds, Integer userId);

	/**
	 * 查看日志原文
	 * 
	 * @param index
	 *            索引
	 * @param host
	 *            主机IP
	 * @param file
	 *            日志文件
	 * @param parent
	 * @param acqtime
	 *            当前日志行时间
	 * @param size
	 *            前几条 siz<0; 后几条size>0
	 * @return
	 */
	List<Map<String, Object>> getContextByParent(String index, String host, String file, String parent, long acqtime, int size,
			String search, Integer userId);

	/**
	 * 文件列表統計
	 * 
	 * @param param
	 * @param search
	 * @return
	 */
	JSONArray statisLogFile(Param param, String search);

	/**
	 * 日志大小统计（三级分类+应用）
	 * 
	 * @return
	 */
	JSONObject statisLogSize(String index);

	/**
	 * 所有日志大小统计
	 * 
	 * @param date
	 *            统计日期，为空统计所有
	 * @return
	 */
	JSONArray statisAllLogSize(String date);

	/**
	 * 
	 * 分页获取ESFile文件列表
	 * 
	 * @param query
	 *            查询对象
	 * @return
	 */
	ESSummaryFileDTO listESFiles(ESSummaryFileQuery query);
	
	/**
	 * sql  带聚合解析
	 * @param param
	 * @param search
	 * @return
	 */
	Map<String,Object> sqlSearchWithAggregationsParse(Param param,
			String search);
	
	/**
	 * SQL统计
	 * 
	 * @param param
	 * @param search
	 * @param sql
	 * @return
	 */
	Map<String,Object> sqlStatistics1(Param param, String search, String sql);
	
	/**
	 * 下载LOG文件
	 * @param index
	 * @param host
	 * @param fileName
	 * @param userId
	 * @return
	 */
	JSONObject getLogFile(String index, String host, String fileName,
			Integer userId);
	
	/**
	 * 详细查询带高亮
	 * @param index
	 * @param host
	 * @param fileName
	 * @param parentId
	 * @param curPage
	 * @param aimPage
	 * @param resultSize
	 * @param lastAcqTime
	 * @param total
	 * @param deal
	 * @param userId
	 * @param searchStr
	 * @return
	 */
	JSONObject getOriginalDetailWithHeightLight(String index, String host,
			String fileName, String parentId, Integer curPage, Integer aimPage, 
			Integer resultSize, long lastAcqTime, long total, boolean deal, Integer userId, 
			String searchStr);

	/**
	 * 下载OriginalDetail
	 * @param index
	 * @param host
	 * @param fileName
	 * @param parentId
	 * @return
	 */
	JSONObject downLoadOriginalDetail(String index, String host,
			String fileName, String parentId);
	
	/**
	 * 全量下载sql结果
	 * @param param
	 * @param search
	 * @return
	 * @throws IOException
	 */
	long sqlSearchDownLoad(Param param, String search)
			throws IOException;
	
	/**
	 * 查询sql全量结果是否下载完毕
	 * @param id
	 * @return
	 */
	Map<String,String> checkSqlSearchDownLoadIsFinish(long id);
	
	/**
	 * 日志文件列表文件下载
	 * 
	 * @param index
	 * @param host
	 * @param fileName
	 * @param userId
	 * @return
	 * @throws IOException
	 */
	long fileDownLoad(String index, String host, String fileName, Integer userId)
			throws IOException;

	/**
	 * 查询下载是否完成
	 * 
	 * @param id
	 * @return
	 */
	Map<String, String> checkFileDownLoadIsFinish(long id);

	Map<String, Object> searchApplog(Map<String, String> param);
	
	List<String> getAnalyzeWordsByIkType(String ikType, String keyword);
	
	List<Long> getOneTradeAcqList(String index, String parentId);
}
