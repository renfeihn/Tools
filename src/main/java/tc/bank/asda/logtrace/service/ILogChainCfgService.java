package tc.bank.asda.logtrace.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.logtrace.model.LogChainCfg;

public interface ILogChainCfgService {
	/**
	 * 添加
	 * @param warning
	 * @return
	 */
  LogChainCfg add(LogChainCfg bean);
	/**
	 * 查询所有
	 * 
	 * @return
	 */
	List<LogChainCfg> getAll();
	/**
	 * 根据ID删除
	 * @param id
	 * @return
	 */
	boolean delById(long id);
	/**
	 * 修改
	 * @param bean
	 * @return
	 */
	boolean update(LogChainCfg bean);
	/**
	 * 根据ID获取
	 * @param id
	 * @return
	 */
	LogChainCfg getById(int id);
	/**
	 * 条件查询
	 * @param whereEx
	 * @param queryFields
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	List<LogChainCfg> query(Map whereEx, String[] queryFields);
	
	List<String> getStructFieldByAppid(long appid);
	
}
