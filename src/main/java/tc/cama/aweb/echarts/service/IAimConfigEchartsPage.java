package tc.cama.aweb.echarts.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.echarts.model.AimConfigEchartsPage;

public interface IAimConfigEchartsPage {
	/**
	 * 得到AimCfgEchartPage的全部记录
	 * @return
	 */
	public List<AimConfigEchartsPage> getAimCfgEchartPageBaseInfo() throws Exception;
	/**
	 * 增加一条记录
	 * @param etype_id 
	 * @param ename 
	 * @param eid 
	 * @param seqno 
	 * @param path 
	 * @param name 
	 * @param id 
	 * @return
	 */
	public int addAimCfgEchartPageRecord(AimConfigEchartsPage aimCfgEchartsPage);
	/**
	 * 根据id删除一条记录
	 * @param id
	 * @return
	 */
	public int deleteAimCfgEchartPageRecord(Integer id);
	/**
	 * 根据id修改一条记录
	 * @param id
	 * @return
	 */
	public int updateAimCfgEchartPageRecord(AimConfigEchartsPage aimCfgEchartsPage);
	/**
	 * 根据id查找一条记录
	 * @param id
	 * @return
	 */
	public AimConfigEchartsPage findAimCfgEchartPageRecord(Integer id);
	
}
