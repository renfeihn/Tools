package tc.cama.aweb.service;

import java.util.List;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.cama.aweb.model.AimEdwIndexChange;

/**
 * 数据仓库指标变化值
 *
 */
public interface IAimEdwIndexChange {
	
	/**
	 * 通过流水号查询非正常状态指标
     * 
	 * @return
	 */
	public List<AimEdwIndexChange> query();
	
	/**
	 * 查询
	 * @param pageable
	 * @param whereEx
	 * @return
	 */
	public Page<AimEdwIndexChange> queryAimEdwIndexChangeByPage(Pageable pageable,JSONObject whereEx);

}
