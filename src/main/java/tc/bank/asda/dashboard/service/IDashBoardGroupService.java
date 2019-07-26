package tc.bank.asda.dashboard.service;

import java.util.List;

import com.aim.alibaba.fastjson.JSONArray;

import tc.bank.asda.dashboard.bean.DashBoardReturn;
import tc.bank.asda.dashboard.model.DashBoardGroup;
import tc.bank.asda.dashboard.model.DashBoardRelation;

public interface IDashBoardGroupService {

	/**
	 * 获取仪表盘列表
	 * @return
	 */
	List<DashBoardGroup> getDashBoardGroups();
	
	/**
	 * 添加仪表盘分组
	 * @param groupName
	 * @param remark
	 * @return
	 */
	boolean addDashBoardGroup(String groupName,String remark);
	
	/**
	 * 修改仪表盘分组信息
	 * @param groupId
	 * @param groupName
	 * @param remark
	 * @return
	 */
	boolean updateDashBoardGroup(long groupId,String groupName,String remark);
	/**
	 * 拷贝仪表盘分组
	 * @param groupId
	 * @param groupName
	 * @param remark
	 * @return
	 */
	boolean copyDashBoardGroup(long groupId,String groupName,String remark);
	/**
	 * 删除仪表盘分组名称
	 * @param groupId
	 * @return
	 */
	boolean delDashBoardGroupById(long groupId);
	
	/**
	 * 保存仪表盘
	 * @param groupId
	 * @param relations
	 * @return
	 */
	boolean addDashBoardRelation(long groupId,List<DashBoardRelation> relations);
	/**
	 * 根据groupId查询仪表盘内容
	 * @param groupId
	 * @return
	 */
	List<DashBoardReturn> getDashBoardByGroupId(long groupId);
	
	/**
	 * 设置首页仪表盘
	 * @param groupId
	 * @return
	 */
	boolean setIndexDashBoardGroup(long groupId);
	
	/**
	 * 查询首页仪表盘内容
	 * @return
	 */
	List<DashBoardReturn> getIndexDashBoard();
	
	/**
	 * 仪表盘信息汇总
	 * @return
	 */
	JSONArray getDashBoard();
}
