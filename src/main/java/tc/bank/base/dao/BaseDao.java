package tc.bank.base.dao;

import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.T;

import tc.bank.asda.app.model.AimlCfgAppUserConfigBean;

/**
 * BaseDao
 * @author Klaus
 * @param <T>
 */
public interface BaseDao<T> {
	
	/***
	 * 新增
	 * @param t 需要保存的对象
	 * @return  操作是否成功
	 */
	public boolean add(T t);
	/***
	 * 新增
	 * @param List<t> 需要保存的对象集合
	 * @return  操作是否成功
	 */
	public boolean batchAdd(List<T> t);
	
	/***
	 * 更新
	 * @param t 需要更新的对象
	 * @return  操作是否成功
	 */
	public boolean update(T t);
	
	/***
	 * 删除
	 * @param id 需要删除的对象的id
	 * @return
	 */
	public boolean delete(long id);

	/***
	 * 删除
	 * @param id 需要删除的对象的id
	 * @return
	 */
	public boolean deleteByWhereEx(Map<String, Object> whereEx);
	
	/***
	 * 根据id获取对象
	 * @param id 获取对象的id
	 * @return
	 */
	public T get(long id);
	
	/***
	 * 获取所有记录
	 * @return 所有记录
	 */
	public List<T> getAll();
	
	/***
	 * 根据条件获取记录
	 * @param whereEx 条件
	 * @return 符合条件的记录
	 */
	public List<T> getAllByWhereEx(Map<String, Object> whereEx);
	
	/**
	 * 根据查询条件返回bean实体
	 * @return
	 */
	public T getBeanByWhereEx(Map<String, Object> whereEx);
}
