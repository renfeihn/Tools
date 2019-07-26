package tc.cama.aweb.service;

import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.bank.common.db.Sort;
import tc.cama.aweb.model.AwebUserOperation;

/**
 * 
 * 用户操作记录
 *
 */
public interface IUserOperation {
	
	/**
	 * 新增
	 * @param aimEdwContact
	 * @return
	 */
    public int save(AwebUserOperation awebUserOperation) throws Exception;
    
    /**
     * 查询
     * @return
     */
    public Page<AwebUserOperation> queryAwebUserOperationByPage(AwebUserOperation awebUserOperation, String startTime, String endTime, Pageable pageable, Sort sort) throws Exception;
    
}
