package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.esb.model.EsbShowSystem;
import tc.cama.aweb.esb.model.EsbSystem;

public interface IAimEsbShowSystem {
	
	
	/**
	 * 获取所有AimEsbShowSystem
	 * @param syscode
	 * @return
	 */
	List<EsbShowSystem> getAllAimEsbShowSystem() throws Exception;
	
	/**
	 * 根据syscode获取AimEsbShowSystem
	 */
	EsbShowSystem findAimEsbShowSystem(String syscode) throws Exception;
	
	/**
	 * 增加AimEsbShowSystem
	 * @return
	 */
	int addAimEsbShowSystem(EsbShowSystem aimEsbShowSystem) throws Exception;
	
	/**
	 * 删除AimEsbShowSystem
	 */
	int deleteAimEsbShowSystem(String syscode) throws Exception;
	
	/**
	 * 修改AimEsbShowSystem
	 */
	int updateAimEsbShowSystem(EsbShowSystem aimEsbShowSystem) throws Exception;
	
	/**
	 * 获取EsbSystem
	 */
	List<EsbSystem> findAllEsbSystem() throws Exception;
	

}
