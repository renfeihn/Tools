package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.bean.AimConfigSplitVO;

public interface IAimlConfigSplitService {

	/**获取拆分配置列表-全部
	 * @return
	 * @throws Exception
	 */
	List<AimConfigSplitVO> getConfigSplitVOList() throws Exception;
	
	/**获取拆分配置列表-按照对象ID
	 * @return
	 * @throws Exception
	 */
	List<AimConfigSplitVO> getConfigSplitVOList(String objectid) throws Exception;
	
	
	/**获取所有的拆分配置列表
	 * @return
	 * @throws Exception
	 */
	List<AimConfigSplitVO> getAllConfigSplitVOList() throws Exception;
	/**根据功能分类获取拆分配置-按照对象ID和分类
	 * @param category
	 * @return
	 * @throws Exception
	 */
	AimConfigSplitVO getConfigSplitVOByCate(String objectid,String functype) throws Exception;
	/**新增拆分配置
	 * @param vo
	 * @throws Exception
	 */
	void createConfigSplit(AimConfigSplitVO vo) throws Exception;
	/**更新拆分配置
	 * @param vo
	 * @throws Exception
	 */
	void updateConfigSplit(AimConfigSplitVO vo) throws Exception;
	
	/**根据objectid和logid查询拆分配置
	 * @param objectid
	 * @param logid
	 * @return
	 * @throws Exception
	 */
	List<AimConfigSplitVO> getConfigSplitVOList(String objectid,String logid) throws Exception;
	
	/**删除
	 * @param objectid
	 * @param logid
	 * @throws Exception
	 */
	void deleteConfigSplit(String objectid,String logid) throws Exception;
}
