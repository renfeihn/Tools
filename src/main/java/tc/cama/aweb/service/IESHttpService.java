package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

public interface IESHttpService {

	
	/**
	 * 此接口为通用接口,不做任何数据处理
	 * 模糊匹配
	 * @param indice
	 * @param type
	 * @param paras
	 * @return
	 * @throws Exception
	 */
	JSONObject fuzzyQuery(String indice,String type,Map<String,List<Object>> paras) throws Exception;
	
	
	/**
	 * 此接口为通用接口,不做任何数据处理
	 * 精确匹配
	 * @param indice
	 * @param type
	 * @param paras
	 * @return
	 * @throws Exception
	 */
	JSONObject termQuery(String indice,String type,Map<String,List<Object>> paras) throws Exception;
	
	
	
	/**
	 * 
	 * 根据appType和text内容查找对应日志列表
	 * @param beginDate	开始日期
	 * @param endDate	结束日期
	 * @param appType	app类型
	 * @param text		需要匹配的关键字[]
	 * @return
	 * @throws Exception
	 */
	JSONObject fuzzyQueryAppLog(String beginDate,String endDate,String appType,String...text) throws Exception;
	
	
	/**
	 * 根据交易流水号查询日志内容
	 * @param serialno	交易流水号
	 * @return
	 * @throws Exception
	 */
	JSONObject queryLogBySerialno(String date,String appType,String serilano) throws Exception;
	
	
	/**
	 * 根据交易流水号查询结构化流水内容
	 * @param serailno
	 * @return
	 * @throws Exception
	 */
	JSONObject queryTransRecordBySerailno(String beginDate,String endDate,String serailno) throws Exception;
	
	/**
	 * 根据交易流水模糊查询结构化流水内容
	 * @param appType
	 * @param text
	 * @return
	 * @throws Exception
	 */
	JSONObject fuzzyQueryTransRecord(String beginDate,String endDate,String appType,String...text) throws Exception;
	
	/**
	 * 创建一周的日志索引
	 * @throws Exception
	 */
	void createOneWeekApplogIndex() throws Exception;
}
