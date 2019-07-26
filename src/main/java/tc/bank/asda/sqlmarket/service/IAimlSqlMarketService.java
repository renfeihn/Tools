package tc.bank.asda.sqlmarket.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.sqlmarket.model.AimlSqlMarketCfg;
import tc.bank.asda.sqlmarket.model.AimlSqlMarketCfgView;
import tc.bank.asda.sqlmarket.model.AimlSqlMarketGroup;
import tc.bank.asda.sqlmarket.model.AimlSqlMarketSqlInterest;
import tc.cama.aweb.model.AwebUser;

public interface IAimlSqlMarketService {

	/**
	 * 
	 * @param bean
	 * @param userIds
	 * @return
	 * @throws Exception
	 */
	public boolean addCfg(AimlSqlMarketCfg bean, List<Long> userIds,
			String groupName) throws Exception;

	/**
	 * 更新sql配置和分享朋友
	 * 
	 * @param updateFlag
	 * @param bean
	 * @param userIds
	 * @return
	 * @throws Exception
	 */
	public boolean updateCfg(String updateFlag, AimlSqlMarketCfg bean,
			List<Long> userIds) throws Exception;

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<AimlSqlMarketCfg> getAllCfg();

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	List<Map<String, Object>> getAllCfgView(Map<String, String> conditions, Map<String,String> sorts);

	/**
	 * 我关注的查询所有
	 * 
	 * @return
	 */
	List<Map<String, Object>> getAllCfgViewByUserId(
			Map<String, String> conditions, Map<String,String> sorts);

	/**
	 * 获取关注信息
	 * 
	 * @param userId
	 * @return
	 */
	public List<Long> getInterests(long userId);

	/**
	 * 添加关注信息
	 * 
	 * @param bean
	 * @return
	 */
	public boolean addInterest(AimlSqlMarketSqlInterest bean);

	/**
	 * 取消关注
	 * 
	 * @param sqlId
	 * @param userId
	 * @return
	 */
	boolean delByUserId(long sqlId, long userId);

	/**
	 * 查询sql 可见人
	 * @param sqlId
	 * @return
	 */
	public List<AwebUser> getUserNames(long sqlId) ;
	
	/**
	 * 添加评分
	 * @param bean
	 * @return
	 */
	public boolean addScore(AimlSqlMarketSqlInterest bean);
	
	/**
	 * 根据ID删除
	 * 
	 * @param id
	 * @return
	 */
	public boolean delCfgById(long id);

	/**
	 * 修改
	 * 
	 * @param bean
	 * @return
	 */
	public boolean updateCfg(AimlSqlMarketCfg bean);

	/**
	 * 根据ID获取
	 * 
	 * @param id
	 * @return
	 */
	public AimlSqlMarketCfg getCfgById(long id);

	/**
	 * 根据ID获取
	 * 
	 * @param id
	 * @return
	 */
	public List<AimlSqlMarketCfg> getCfgByGroupId(long groupId);

	/**
	 * 添加
	 * 
	 * @param warning
	 * @return
	 */
	public boolean addGroup(AimlSqlMarketGroup bean);

	/**
	 * 查询所有
	 * 
	 * @return
	 */
	public List<AimlSqlMarketGroup> getAllGroup();

	/**
	 * 根据ID删除
	 * 
	 * @param id
	 * @return
	 */
	public boolean delGroupById(long id);

	/**
	 * 修改
	 * 
	 * @param bean
	 * @return
	 */
	public boolean updateGroup(AimlSqlMarketGroup bean);

	/**
	 * 根据ID获取
	 * 
	 * @param id
	 * @return
	 */
	public AimlSqlMarketGroup getGroupById(long id);

	/**
	 * 查询当前用户是否关注或评分或评论了该sql,若果有不能取消分享可见
	 * 
	 * @param userId
	 * @param sqlId
	 * @return
	 */
	boolean isInterest(long userId, long sqlId);

}
