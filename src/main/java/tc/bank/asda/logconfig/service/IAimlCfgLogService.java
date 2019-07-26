package tc.bank.asda.logconfig.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.asda.logconfig.bean.AimlCfgLogStatistics;
import tc.bank.asda.logconfig.model.AimlCfgLogInfo;
import tc.bank.asda.logconfig.model.AimlCfgLogPrivateField;
import tc.bank.asda.logconfig.model.AimlCfgLogPublicField;

public interface IAimlCfgLogService {

	/**
	 * 获取配置汇总信息
	 * @return
	 */
	AimlCfgLogStatistics getCfgLogStatistics();
	/**
	 * 添加配置分类
	 * @param typeName
	 */
	long addCfgLogType(String typeName);
	/**
	 * 修改配置分类
	 * @param typeId
	 * @param typeName
	 */
	boolean updateCfgLogType(long typeId,String typeName);
	/**
	 * 根据分类ID获取日志配置信息列表
	 * @param typeId
	 * @return
	 */
	List<AimlCfgLogInfo> getCfgLogInfoByTypeId(long typeId);
	/**
	 * 添加/修改日志配置信息
	 * @param cfgLogInfo
	 * @param publicFileds
	 * @param privateFields
	 * @return
	 */
	boolean addCfgLogInfo(AimlCfgLogInfo cfgLogInfo,List<AimlCfgLogPublicField> publicFileds,List<AimlCfgLogPrivateField> privateFields);
	/**
	 * 获取日志配置信息
	 * @param logId
	 * @return
	 */
	AimlCfgLogInfo getCfgLogInfo(long logId);

	List<AimlCfgLogInfo> getCfgLogInfoNew();
	/**
	 * 删除日志配置信息
	 * @param logId
	 * @return
	 */
	String delCfgLogInfo(long logId);
	
	/**
	 * 删除配置分类（包含下面的配置信息）
	 * @param typeId
	 * @return
	 */
	String delCfgLogType(long typeId);
	
	/**
	 * 导出文件
	 * @param logId
	 * @return
	 */
	String exportFile(long logId);
	/**
	 * 导入模板文件
	 * @param file
	 * @return
	 */
	boolean inportFile(File file);
	/**
	 * 获取配置文件的结构化字段
	 * @param logId
	 * @return
	 */
	Map<String,List<String>> getCfgLogFields(long logId);
	/**获取Eci公共配置
	 * @param
	 * @throws Exception
	 */
	JSONObject getEciCommonConfig() throws Exception;
	
	boolean addCfgLogInfoNew(AimlCfgLogInfo cfgLogInfo,
			List<AimlCfgLogPublicField> publicFields);
	
	String delCfgLogInfoNew(long logId);
	
	List<AimlCfgLogInfo> getCfgLogInfoSource(String cate);

	
}
