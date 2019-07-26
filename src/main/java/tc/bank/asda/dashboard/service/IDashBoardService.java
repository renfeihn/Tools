package tc.bank.asda.dashboard.service;

import java.util.List;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.asda.dashboard.model.DashBoard;

public interface IDashBoardService {

	/**
	 * 添加一条仪表盘记录信息
	 * @param dashBoard
	 * @return
	 */
	boolean addDashBoard(DashBoard dashBoard);
	
	/**
	 * 获取仪表盘记录列表
	 * @param echartsType 图标类型
	 * @return
	 */
	List<DashBoard> getAllDashBoard(int echartsType);
	
	/**
	 * 根据ID获取仪表盘详细信息
	 * @param id 主键ID
	 * @return
	 */
	DashBoard getDashBoardById(long id);
	/**
	 * 根据ID删除仪表盘信息
	 * @param id 主键ID
	 * @return
	 */
	boolean delDashBoardById(long id) throws Exception;
	/**
	 * 修改仪表盘信息
	 * @param dashBoard
	 * @return
	 */
	boolean updateDashBoard(DashBoard dashBoard);
	/**
	 * 获取单个仪表盘统计数据
	 * @param id
	 * @return
	 */
	JSONObject getDashBoardData(List<Long> ids);
}
