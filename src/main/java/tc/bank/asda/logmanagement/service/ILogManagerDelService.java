package tc.bank.asda.logmanagement.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.logmanagement.bean.LogManagerDelBean;

public interface ILogManagerDelService {
	/**
	 * 添加
	 * @param warning
	 * @return
	 */
	LogManagerDelBean add(LogManagerDelBean bean);
	/**
	 * 查询所有
	 * 
	 * @return
	 */
	List<LogManagerDelBean> getAll();
	/**
	 * 根据ID删除
	 * @param id
	 * @return
	 */
	boolean delById(String host);
	/**
	 * 修改
	 * @param bean
	 * @return
	 */
	boolean update(LogManagerDelBean bean);
	/**
	 * 根据ID获取
	 * @param id
	 * @return
	 */
	LogManagerDelBean getByHost(String host);
	/**
	 * 条件查询
	 * @param whereEx
	 * @param queryFields
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	List<LogManagerDelBean> query(Map whereEx, String[] queryFields);
	
	LogManagerDelBean addDelBean(String ip, int dayNum);
}
