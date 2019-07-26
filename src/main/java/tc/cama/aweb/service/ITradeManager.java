package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AwebMenu;
import tc.cama.aweb.model.AwebMenuMenuView;

/**
 * 交易管理的接口
 * 
 * @author Win-User
 *
 */
public interface ITradeManager {

	/**
	 * 查询所有交易列表
	 * 
	 * @return
	 */
	public List<AwebMenuMenuView> getAllTradeList();

	/**
	 * 插入一个新的交易对象
	 * 
	 * @param awebMenu
	 * @return
	 */
	public int saveTrade(AwebMenu menu);

	/**
	 * 更新一个交易对象
	 * 
	 * @param awebMenu
	 * @return
	 */
	public int updateTradeByMid(AwebMenu menu);

	/**
	 * 删除交易对象
	 * 
	 * @param mid
	 * @return
	 */
	public int deleteTradeByMid(Integer mid);

}
