package tc.cama.aweb.echarts.service;

import java.util.List;
import tc.cama.aweb.echarts.model.AimConfigEchartsStyle;

public interface IAimConfigEchartsStyle {
	
	/**
	 * 查询Echarts样式配置表
	 * @return
	 * @throws Exception
	 */
	List<AimConfigEchartsStyle> queryEchartsStyle() throws Exception;
	
	/**
	 * 更新Echarts样式配置表
	 * @return
	 * @throws Exception
	 */
	int updateEchartsStyle(AimConfigEchartsStyle aimConfigEchartsStyle) throws Exception;
	
	/**
	 * 插入Echarts样式配置表
	 * @return
	 * @throws Exception
	 */
	int insertEchartsStyle(AimConfigEchartsStyle aimConfigEchartsStyle) throws Exception;
	
	/**
	 * 删除Echarts样式配置表
	 * @return
	 * @throws Exception
	 */
	int deleteEchartsStyle(int id) throws Exception;

}
