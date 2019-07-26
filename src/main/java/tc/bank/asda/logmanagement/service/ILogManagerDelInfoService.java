package tc.bank.asda.logmanagement.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.logmanagement.bean.LogManagerDelInfoBean;

public interface ILogManagerDelInfoService {
	/**
	 * 添加
	 * @param warning
	 * @return
	 */
	LogManagerDelInfoBean add(LogManagerDelInfoBean bean);
	/**
	 * 查询所有
	 * 
	 * @return
	 */
	List<LogManagerDelInfoBean> getAll();
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
	boolean update(LogManagerDelInfoBean bean);
	/**
	 * 根据ID获取
	 * @param id
	 * @return
	 */
	List<Map<String, Object>> getByHost(String host);
	/**
	 * 条件查询
	 * @param whereEx
	 * @param queryFields
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	List<LogManagerDelInfoBean> query(Map whereEx, String[] queryFields);
	
}
