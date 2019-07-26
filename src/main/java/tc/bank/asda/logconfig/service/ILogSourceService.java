package tc.bank.asda.logconfig.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.logconfig.model.AimLogSource;

public interface ILogSourceService {

	/**
	 * 保存日志源信息
	 * @param log
	 * @return
	 */
	String saveLogSourceByBean(AimLogSource log);

	/**
	 * 删除日志源信息
	 * @param logId 日志ID
	 * @return
	 */
	String deleteLogSourceByLogId(String logId);
	
	/**删除日志源
	 * @param objectid
	 * @param logid
	 */
	void deleteLogSource(String objectid,String logid);

	/**
	 * 编辑日志源信息
	 * @param log
	 * @return
	 */
	String editLogSourceByBean(AimLogSource log);
	
	/**更新日志源信息
	 * @param log
	 */
	void replaceLogSource(AimLogSource log);

	/**
	 * 通过objectId查询所有日志源信息
	 * @param objectId
	 * @return
	 */
	List<AimLogSource> getLogSourceListByObjectId(String objectId);

	/**
	 * 查询所有日志源信息
	 * @param objectId
	 * @return
	 */
	List<AimLogSource> getAllLogSourceList();
	
	/**
	 * 通过objectId查询日志总数以及启用和未启用数
	 * @param objectId
	 * @return
	 */
	Map<String, String> getLogSourceNumInfo(String objectId);
	
	/**通过objectid和logid查询日志源信息
	 * @param objectid 对象ID
	 * @param logid 日志源ID
	 * @return
	 */
	AimLogSource getLogSourceByOjbectIdLogId(String objectid,String logid);

}
