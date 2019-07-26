package tc.bank.asda.dashboard.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.dashboard.model.PanelChart;

public interface IPanelChartService {
	
	/**
	 * 新增仪表盘组件对象
	 * @param panelChart
	 * @return
	 */
	public boolean add(PanelChart panelChart);
	
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
	public List<PanelChart> getAll();
	
	/**
	 * 更新仪表盘组件对象
	 * @param panel
	 * @return
	 */
	public boolean update(PanelChart panelChart);
	
	/**
	 * 根据id获取仪表盘组件对象
	 * @param id
	 * @return
	 */
	public PanelChart getById(long id);
	
	/**
	 * 条件查询仪表盘组件对象
	 * @param whereEx
	 * @return
	 */
	public List<PanelChart> getAllByWhereEx(Map<String, Object> whereEx);

}
