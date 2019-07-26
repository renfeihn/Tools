package tc.bank.asda.es.service;

import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogQuickSearch;

public interface IESQuickSearch {

	/**
	 * 添加快速搜索
	 * 
	 * @param quickSearch
	 * @return
	 */
	boolean addQuickSearch(AimlCfgLogQuickSearch quickSearch);

	/**
	 * 修改快速添加
	 * 
	 * @param quickSearch
	 * @return
	 */
	boolean updateQuickSearch(AimlCfgLogQuickSearch quickSearch);

	/**
	 * 删除快速搜索
	 * 
	 * @param id
	 * @return
	 */
	boolean delQuickSearch(long id);

	/**
	 * 查看快速搜索信息
	 * 
	 * @param id
	 * @return
	 */
	AimlCfgLogQuickSearch getQuickSearch(long id);

	/**
	 * 获取快速搜索列表
	 * 
	 * @param createUser
	 * @param top
	 * @param pageNum
	 * @return
	 */
	List<AimlCfgLogQuickSearch> getQuickSearchList(Integer createUser, int top,
			int pageNum);

	/**
	 * 获取快速搜索总数
	 * 
	 * @param createUser
	 * @return
	 */
	long getQuickSearchCount(Integer createUser);
}
