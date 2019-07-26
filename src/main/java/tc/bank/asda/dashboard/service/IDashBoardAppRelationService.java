package tc.bank.asda.dashboard.service;

import java.util.List;

import tc.bank.asda.dashboard.model.DashBoardAppRelation;
import tc.bank.asda.dashboard.model.Panel;

public interface IDashBoardAppRelationService {
	/**
	 * 根据仪表盘id关联应用系统关系
	 * @param dashBoard
	 * @return
	 */
	boolean addOrUpdateRelation(List<DashBoardAppRelation> relationList, long panelId);
	/**
	 * 删除关联
	 * @param relationId 关联主键id
	 * @return
	 */
	boolean delRelation(long relationId);
	/**
	 * 根据用户id和应用id查找仪表盘
	 * @param appId
	 * @return
	 */
	List<Panel> queryByAppId(long userId, long appId);
}
