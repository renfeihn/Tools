package tc.bank.asda.logtrace.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.logtrace.model.AimlCfgTrankeysStopword;
import tc.bank.asda.logtrace.model.LogTranKeys;

public interface ILogTranKeysDaoService {
  void addStopword(AimlCfgTrankeysStopword stopword);
	/**
	 * 添加
	 * @param warning
	 * @return
	 */
	LogTranKeys add(LogTranKeys bean);
	/**
	 * 查询所有
	 * 
	 * @return
	 */
	List<LogTranKeys> getAll();
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
	boolean update(LogTranKeys bean);
	/**
	 * 根据ID获取
	 * @param id
	 * @return
	 */
	LogTranKeys getById(int id);
	/**
	 * 条件查询
	 * @param whereEx
	 * @param queryFields
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	List<LogTranKeys> query(Map whereEx, String[] queryFields);
	
}
