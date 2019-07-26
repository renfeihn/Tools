package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;
import tc.bank.asda.model.AimlKeywordsCount;
import tc.bank.asda.model.AimlKeywordsLogs;
import tc.bank.cama.agentmgr.model.AimAdmAgentReg;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.bank.common.db.Sort;
import tc.cama.aweb.bean.PageProgramBase;
import tc.cama.aweb.esb.model.EsbSystem;

public interface IAppProgram {

	/**
	 * 获取应用程序基本信息
	 * 
	 * @param programId
	 * @return
	 * @throws Exception
	 */
	PageProgramBase getProgramBaseInfo(Long programId) throws Exception;

	/**
	 * 获取关键进程信息列表
	 * @param programId
	 * @return
	 * @throws Exception
	 */
    List<Map<String, Object>> getProcessList(Long appId,Long programId) throws Exception;
    /**
     * 获取端口信息
     * @param programId
     * @param processId
     * @return
     * @throws Exception
     */
    
    List<Map<String, Object>> getPortList(Long appId,Long mobjId,String procName) throws Exception;
  /* * 统计当日关键字信息
	 * 
	 * @param appCode
	 * @return
	 */
	public List<AimlKeywordsCount> statCurrentDayKeywords(String appCode)
			throws Exception;
	/**
	 * 查询当日关键字日志
	 * 
	 * @param appCode
	 *            应用系统编号
	 * @param keyword
	 *            关键字
	 * @param pageable
	 *            分页
	 * @param sort
	 *            排序
	 * @return
	 * @throws Exception
	 */
	public Page<AimlKeywordsLogs> pageQueryCurrentDayKeywordsLogs(
			String appCode, String keyword, String logfile, Pageable pageable, Sort sort)
			throws Exception;
	/**
	 * @param agentType
	 *            代理类型 1-主机代理 2-web代理 3-日志代理
	 * @param pageable
	 * @param sort
	 * @return
	 */
	public Page<AimAdmAgentReg> queryAgentByType(String agentType,
			Pageable pageable, Sort sort);
	/**
	 * 根据appId查询系统码 
	 * @param appId
	 * @return
	 * @throws Exception 
	 */
	public EsbSystem getSysInfoByAppId(Long appId) throws Exception;
}
