package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.bean.AimConfigRelationVO;

public interface IAimConfigRelationService {

	/**获取节点调用关系列表
	 * @return
	 * @throws Exception
	 */
	List<AimConfigRelationVO> getConfigRelationList() throws Exception;
	/**新增节点调用关系
	 * @param vo
	 * @throws Exception
	 */
	void createConfigRelation(AimConfigRelationVO vo) throws Exception;
	/**更新节点调用关系
	 * @param vo
	 * @throws Exception
	 */
	void updateConfigRelation(AimConfigRelationVO vo) throws Exception;
	
}
