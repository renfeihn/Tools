package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AimEdwIndexConfig;

/**
 * 数据仓库指标配置表
 *
 */
public interface IAimEdwIndexConfig {
	
	/**
	 * 获取所有配置分类
     * 
	 * @return
	 */
	public List<AimEdwIndexConfig> getAllCfgType();
	
	/**
	 * 获取某个配置分类(cfg_type)下的所有配置
     * @param cfgType
	 * @return
	 */
    public List<AimEdwIndexConfig> getCfgByType(AimEdwIndexConfig aimEdwIndexConfig);
    
    /**
	 * 新增某个配置分类(cfg_type)的一条配置
     * @param cfgType
	 * @return
	 */
    public int saveCfgByType(AimEdwIndexConfig aimEdwIndexConfig);
    
    /**
     *  删除配置
     *  @param id
	 *  @return
     */
    public int deleteCfg(Integer id);
    
    
}
