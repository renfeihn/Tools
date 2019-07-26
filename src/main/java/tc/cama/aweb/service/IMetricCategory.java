package tc.cama.aweb.service;

import java.util.List;

import tc.bank.cama.core.module.AimConfigMetricCateMapping;
import tc.bank.cama.core.module.AimConfigMetricCateMappingView;

/**
 * 指标分类定义
 * @author zhangkun
 *
 */
public interface IMetricCategory {
	
	/**
	 * 指标定义，列表查询
	 * @return
	 */
	public List<AimConfigMetricCateMappingView> getMetricList();
	
	/**
	 * 新增指标分类
	 * @param metricCate
	 * @return
	 */
	public String addMetricCate(AimConfigMetricCateMapping metricCate);
	
	/**
	 * 修改指标分类
	 * @param metricCate
	 * @return
	 */
	public String updateMetricCate(AimConfigMetricCateMapping metricCate);
	
	/**
	 * 删除指标分类
	 * @param id 指标分类id
	 * @return
	 */
	public String delMetricCate(int id);
}
