package tc.bank.asda.forward.service;

import java.util.List;

import tc.bank.asda.forward.bean.DataForwadRet;
import tc.bank.asda.forward.model.DataForward;

public interface IDataForwardService {

	/**
	 * 查找数据转发列表
	 * @return
	 */
	List<DataForwadRet> getAllDataForward();
	
	/**
	 * 添加数据转发
	 * @param dataForward
	 * @param forwardTo
	 * @return
	 */
	boolean addDateForward(DataForward dataForward,String forwardTo);
	
	/**
	 * 修改数据转发
	 * @param dataForward
	 * @param forwardTo
	 * @return
	 */
	boolean updateDateForward(DataForward dataForward,String forwardTo);
	/**
	 * 主键ID
	 * @param id
	 * @return
	 */
	boolean delDateForward(long id);
}
