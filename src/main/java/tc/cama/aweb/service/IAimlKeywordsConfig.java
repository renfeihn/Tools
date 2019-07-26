package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AimlKeywordsConfig;

public interface IAimlKeywordsConfig {

	/**
	 * 获取所有AimlKeywordsConfig
	 * @param id
	 * @return
	 */
	List<AimlKeywordsConfig> getAllAimlKeywordsConfig() throws Exception;
	
	/**
	 * 根据appId获取AimlKeywordsConfig
	 */
	List<AimlKeywordsConfig> findAimlKeywordsConfig(Integer appId) throws Exception;
	
	/**
	 * 根据系统ID+文件模式名，查找对应的关键字列表
	 * @param appId
	 * 系统ID
	 * @param pattern
	 * 文件模式名
	 * @return
	 * @throws Exception
	 */
	List<String> findAimlKeywords(Integer appId, String pattern) throws Exception;
	
	/**
	 * 增加AimlKeywordsConfig
	 * @return
	 */
	int addAimlKeywordsConfig(AimlKeywordsConfig aimlKeywordsConfig) throws Exception;
	
	/**
	 * 删除AimlKeywordsConfig
	 */
	int deleteAimlKeywordsConfig(int id) throws Exception;
	
	/**
	 * 修改AimlKeywordsConfig
	 */
	int updateAimlKeywordsConfig(AimlKeywordsConfig aimlKeywordsConfig) throws Exception;
	
	
	
}
