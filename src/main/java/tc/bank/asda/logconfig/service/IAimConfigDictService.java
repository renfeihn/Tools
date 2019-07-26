package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.bean.AimConfigDictVO;

public interface IAimConfigDictService {

	/**获取字典定义列表
	 * @return
	 * @throws Exception
	 */
	List<AimConfigDictVO> getDictList() throws Exception;
	/**根据ID获取字典定义
	 * @param dictid 配置ID
	 * @return
	 * @throws Exception
	 */
	AimConfigDictVO getDictById(String dictid) throws Exception;
	/**根据分类信息获取字典配置定义
	 * @param class1 一级分类
	 * @param class2 二级分类
	 * @param class3 三级分类
	 * @return
	 * @throws Exception
	 */
	AimConfigDictVO getDictByClasses(String class1,String class2,String class3) throws Exception;
	/**新增字典定义配置
	 * @param vo
	 * @throws Exception
	 */
	void createConfigDict(AimConfigDictVO vo) throws Exception;
	/**批量新增字典定义配置
	 * @param list
	 * @throws Exception
	 * @return
	 */
	String batchSaveConfigDict(List<AimConfigDictVO> list) throws Exception;
	/**更新字典定义
	 * @param vo
	 * @throws Exception
	 */
	void updateConfigDict(AimConfigDictVO vo) throws Exception;
	/**删除
	 * @param dictid 字典配置定义ID
	 * @throws Exception
	 */
	void deleteConfigDict(String dictid) throws Exception;
	
	/**根据objectid和logid获取字典定义
	 * @param objectid 对象ID
	 * @param logid 日志ID
	 * @return
	 * @throws Exception
	 */
	 List<AimConfigDictVO> getDictByObjectidLogId(String objectid,String logid) throws Exception;
	 
	 /**删除字典
	 * @param objectid 对象ID
	 * @param logid 日志ID
	 * @throws Exception
	 */
	void deleteConfigDict(String objectid,String logid) throws Exception;
}
