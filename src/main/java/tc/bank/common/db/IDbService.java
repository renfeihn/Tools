package tc.bank.common.db;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

/**
 * 数据库接口。增删改；单查、多查、分页查询
 * 
 * @author Win7-user
 * 
 */
public interface IDbService {

	/**
	 * 提交事务
	 */
	public void commit();

	/**
	 * 查询记录数
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @return
	 */
	public <T> int count(Class<T> entityClass, JSONObject whereEx);

	/**
	 * 删除数据
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            删除条件
	 * @return
	 */
	public <T> int deleteWithDict(Class<T> entityClass, JSONObject whereEx);

	/**
	 * 新增数据
	 * 
	 * @param entityClass
	 *            实体类
	 * @param insetData
	 *            新增数据
	 * @return
	 */
	public <T> int insertWithDict(Class<T> entityClass, JSONObject insertData);

	/**
	 * 分页查询
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @param pageable
	 *            分页信息，从0页开始
	 * @return
	 */
	public <T> Page<T> pageQuery(Class<T> entityClass, JSONObject whereEx,
			Pageable pageable);

	/**
	 * 分页查询
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @param pageable
	 *            分页信息，从0页开始
	 * @param sort
	 *            排序
	 * @return
	 */
	public <T> Page<T> pageQuery(Class<T> entityClass, JSONObject whereEx,
			Pageable pageable, Sort sort);

	/**
	 * 查询返回实体
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @return
	 */
	public <T> T queryAsBean(Class<T> entityClass, JSONObject whereEx);

	/**
	 * 查询返回实体list
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @return
	 */
	public <T> List<T> queryAsBeanList(Class<T> entityClass, JSONObject whereEx);

	/**
	 * 查询返回实体list
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @param sort
	 *            排序
	 * @return
	 */
	public <T> List<T> queryAsBeanList(Class<T> entityClass,
			JSONObject whereEx, Sort sort);

	/**
	 * 查询返回dict
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @return
	 */
	public <T> JSONObject queryAsDict(Class<T> entityClass, JSONObject whereEx);

	/**
	 * 查询返回dictList
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @return
	 */
	public <T> JSONArray queryAsDictList(Class<T> entityClass,
			JSONObject whereEx);

	/**
	 * 查询返回dictList
	 * 
	 * @param entityClass
	 *            实体类
	 * @param whereEx
	 *            查询条件
	 * @param sort
	 *            排序
	 * @return
	 */
	public <T> JSONArray queryAsDictList(Class<T> entityClass,
			JSONObject whereEx, Sort sort);

	/**
	 * 保存实体
	 * 
	 * @param entities
	 * @return
	 */
	public <T> int save(List<T> entities);

	/**
	 * 保存实体
	 * 
	 * @param entity
	 *            实体类
	 */
	public <T> int save(T entity);

	/**
	 * 更新数据
	 * 
	 * @param entitryClass
	 *            实体类
	 * @param updateData
	 *            更新数据
	 * @param whereEx
	 *            更新条件
	 * @return
	 */
	public <T> int updateWithDict(Class<T> entityClass, JSONObject updateData,
			JSONObject whereEx);

	/**
	 * 执行sql语句
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int executeSql(String sql, Object... params);

	/**
	 * 查询数据
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * @throws SQLException
	 */
	public List<Map<String, Object>> queryAsMapListBySQL(String sql,
			Object... params);

}
