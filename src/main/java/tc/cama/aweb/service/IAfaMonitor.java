package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.AFAMonBean;
import tc.cama.aweb.model.AfaInstanceVO;
import tc.cama.aweb.model.AfaRegistryVO;

public interface IAfaMonitor {
	/**
	 * 获取流水记录
	 * 
	 * @return
	 * @throws Exception
	 */
	List<AFAMonBean> getAfaFlowStatistic(Long appId) throws Exception;

	/**
	 * 获取实例
	 * 
	 * @return
	 */
	List<AfaInstanceVO> getAfaInstance();

	/**
   * 
   */
	List<AfaRegistryVO> getRegistrys();
}
