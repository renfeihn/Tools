package tc.bank.asda.logconfig.service;

import java.util.List;
import tc.bank.asda.logconfig.model.AimUserSearch;

public interface IAimLogUserSearch {

	/**
	 * 保存用户搜索记录信息
	 * @param userSearchInfo
	 * @return
	 */
	void saveLogUserSearchByBean(AimUserSearch userSearchInfo);
	
	/**
	 * 获取当前用户搜索记录信息
	 * @param userId
	 * @return
	 */
	List<AimUserSearch> getLogUserSearchById(Integer userId);
	
	/**
	 * 清除用户搜索记录信息
	 * @param userId
	 */
	void delLogUserSearchById(Integer userId);
	
}
