package tc.bank.cama.cmdb.service;

/**
 * 对象三级分类变更接口
 */
public interface CategoryMaintain {

	/**
	 * 新增三级分类
	 * @param l1CateName
	 * 一级分类名
	 * @param l2CateName
	 * 二级分类名
	 * @param l3CateName
	 * 三级分类名
	 * @return
	 * 新分类的ID
	 * @throws Exception
	 * 若入参为null或空, 或三级分类已存在, 抛异常
	 */
	Long newCategory(String l1CateName, String l2CateName, String l3CateName) throws Exception;
}
