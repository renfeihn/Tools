package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AimlTellerOperationConfig;

/**
 * 
 * 柜面日志操作名称配置表
 *
 */
public interface IAimlTellerOperationConfig {
	
	/**
	 * 新增
	 * @param aimlTellerOperationConfig
	 * @return
	 */
    public int save(AimlTellerOperationConfig aimlTellerOperationConfig); 
    
    /**
     * 删除
     * @param id
     * @return
     */
    public int delete(Integer id);
    
    /**
     * 修改
     * @param aimlTellerOperationConfig
     * @return
     */
    public int update(AimlTellerOperationConfig aimlTellerOperationConfig);
    
    /**
     * 查询
     * @param pageable
     * @return
     */
    public List<AimlTellerOperationConfig> queryAimlTellerOperationConfig();

}
