package tc.bank.asda.dashboard.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.dashboard.model.Panel;

public interface IPanelService {
	
	/**
	 * 新增仪表盘组件对象
	 * @param panelChart
	 * @return
	 */
	public boolean add(Panel panel);
	
	/**
	 * 删除仪表盘组件对象
	 * @param id
	 * @return
	 */
	public boolean delById(long id);
	
	/**
	 * 获取全部仪表盘组件对象
	 * @return
	 */
	public List<Panel> getAll(long userId);
	
	/**
	 * 更新仪表盘组件对象
	 * @param panel
	 * @return
	 */
	public boolean update(Panel panel);
	
	/**
	 * 根据id获取仪表盘组件对象
	 * @param id
	 * @return
	 */
	public Panel getById(long id);
		
	/**
	 * 条件查询仪表盘组件对象
	 * @param whereEx
	 * @return
	 */
	public List<Panel> getAllByWhereEx(Map<String, Object> whereEx) ;
	/**
	 * 根据用户id和仪表盘id查找应用系统id集合，用“,”间隔
	 * @param appId
	 * @return
	 */
	String queryAppidsByAppId(long userId, long panelId);
	
	/**
	 * 仪表盘发布到首页
	 * @param path
	 * @param name
	 * @param id
	 * @param userId
	 * @return
	 */
	public boolean uploadPage(String path, String name, long id, String userId);
	
	public boolean addDashBoardPannel(String path, String name, long id, String userId);
	
	public List<Map<String,Object>> getDashBoardPannelList(String userId);
	
	public boolean delDashBoardPannel(long id);
}
