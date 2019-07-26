package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AimlLogfileConfig;

public interface IAimlLogfileConfig {
	/**
	 * 获取所有AimlLogfileConfig
	 * @param id
	 * @return
	 */
	List<AimlLogfileConfig> getAllAimlLogfileConfig() throws Exception;
	
	/**
	 * 根据AppId获取AimlLogfileConfig
	 */
	List<AimlLogfileConfig> findAimlLogfileConfig(String id) throws Exception;
	
	/**
	 * 增加AimlLogfileConfig
	 * @return
	 */
	int addAimlLogfileConfig(AimlLogfileConfig aimlLogfileConfig) throws Exception;
	
	/**
	 * 删除AimlLogfileConfig
	 */
	int deleteAimlLogfileConfig(int id) throws Exception;
	
	/**
	 * 修改AimlLogfileConfig
	 */
	int updateAimlLogfileConfig(AimlLogfileConfig aimlLogfileConfig) throws Exception;
}
