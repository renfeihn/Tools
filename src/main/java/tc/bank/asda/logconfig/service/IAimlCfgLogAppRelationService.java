package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogAppRelation;
import tc.bank.asda.logconfig.model.AimlCfgLogInfo;


public interface IAimlCfgLogAppRelationService {

	/**
	 * 增加关联关系集合
	 * @param relations
	 * @return
	 */
	boolean addCfglogAppRelations(List<AimlCfgLogAppRelation> relations);
	/**
	 * 根据关联关系查询应用下所有日志解析配置
	 * @param appid
	 * @param objectid
	 * @return
	 */
	List<AimlCfgLogInfo> queryCfgloginfoByAppid(long appid, long objectid);

}
