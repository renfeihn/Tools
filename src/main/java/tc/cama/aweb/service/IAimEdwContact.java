package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.model.AimEdwContact;


/**
 * 数据仓库短信通知人配置
 *
 */
public interface IAimEdwContact {
	/**
	 * 新增
	 * @param aimEdwContact
	 * @return
	 */
    public int save(AimEdwContact aimEdwContact); 
    
    /**
     * 删除
     * @param id
     * @return
     */
    
    public int delete(Integer id);
    /**
     * 修改
     * @param id
     * @return
     */
    
    public int update(AimEdwContact aimEdwContact);
    /**
     * 查询
     * @return
     */
    public List<AimEdwContact> queryAimEdwContact();

}

