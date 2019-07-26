package tc.bank.cama.cmdb.service;

import java.util.List;

import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;

/**
 * CMDB对象分类查询服务接口
 */
public interface CategoryQuery {

	/**
	 * 查询全部三级分类
	 * 
	 * @return
	 * @throws Exception
	 */
	List<CmdbObjectCategory> getAllCategories() throws Exception;
}
