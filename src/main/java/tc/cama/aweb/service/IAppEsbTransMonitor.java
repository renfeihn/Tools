package tc.cama.aweb.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import tc.bank.cama.statistic.AimCommonTrans;
import tc.bank.common.core.Page;
import tc.cama.aweb.bean.PageEsbTransList;
import tc.cama.aweb.esb.model.EsbMonTransService;
import tc.cama.aweb.esb.model.EsbService;

public interface IAppEsbTransMonitor {

	/**
	 * 查询ESB流水列表
	 * 
	 * @param map
	 * @param page
	 * @param pageCount
	 * @return
	 * @throws Exception
	 */
	Page<EsbMonTransService> getEsbTransMonitor(Map<Integer, Object> conditions, int page, int pageCount)
			throws Exception;

	/**
	 * 统一监控
	 * @param conditions
	 * @param page
	 * @param pageCount
	 * @return
	 * @throws Exception 
	 */
	public Page<AimCommonTrans> getUMONTransDetail(Map<Integer, Object> conditions, int page, int pageCount) throws Exception;
	
	/**
	 * 统一监控service
	 * @return
	 * @throws SQLException 
	 */
	public List<Object> getUMONService(String sysId) throws SQLException;
	
	/**
	 * 查询ESB流水条件列表
	 * 
	 * @return
	 * @throws Exception
	 */
	PageEsbTransList getEsbList(Long appId) throws Exception;
	
	/**
	 * 
	 * @param syscode
	 * @return
	 * @throws Exception
	 */
	List<EsbService> getServiceList(String syscode) throws Exception;
}
