package tc.cama.aweb.service;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.cama.aweb.model.AimEdwTriggerRule;

import com.aim.alibaba.fastjson.JSONObject;

/**
 * 管理驾驶舱指标监控规则管理
 * @author 
 *
 */
public interface IAimEdwTriggerRule {
	/**
	 * 新增
	 * @param aimEdwTriggerRule
	 * @return
	 */
	
    public int save(AimEdwTriggerRule aimEdwTriggerRule ); 
    /**
     * 删除
     * @param id
     * @return
     */
    
    public int delete(Integer id);
    /**
     * 修改
     * @param id
     * @return
     */
    
    public int update(AimEdwTriggerRule aimEdwTriggerRule);
    /**
     * 查询
     * @param pageable
     * @param whereEx
     * @return
     */
    
    public Page<AimEdwTriggerRule> queryAimEdwTriggerRuleByPage(Pageable pageable,JSONObject whereEx);
    
}
