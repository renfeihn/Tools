package tc.bank.cama.core.service.trigger;

import java.util.List;

import tc.bank.cama.core.bean.AimConfigTriggerPlus;
import tc.bank.cama.core.bean.AimConfigTriggerPlusPageView;
import tc.bank.cama.core.bean.AimConfigTriggerSubPlus;
import tc.bank.cama.core.bean.CateNode;
import tc.bank.cama.core.module.AimConfigMeasure;
import tc.bank.cama.core.module.AimConfigMetricCateMappingView;
import tc.bank.cama.core.module.AimConfigTrigger;

/**
 * 主触发器相关操作
 * 
 * @author zhangkun
 *
 */
public interface IAimConfigTrigger {
	/**
	 * 通过对象id获取触发器
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<AimConfigTriggerPlus> getTriggerByObjectId(Integer objectId) throws Exception;

	/**
	 * 分页获取触发器
	 * 
	 * @return
	 * @throws Exception
	 */
	public AimConfigTriggerPlusPageView getTriggersByPageQuery(int page,int size) throws Exception;

	/**
	 * 根据触发器id 修改触发器
	 * 
	 * @param mobjId
	 * @param trigger
	 */
	public int updateTriggerById(Integer mobjId, AimConfigTrigger trigger);

	/**
	 * 新增触发器
	 * 
	 * @param trigger
	 * @return
	 * @throws Exception
	 */
	public int addTrigger(AimConfigTrigger trigger) throws Exception;

	/**
	 * 根据触发器id删除触发器
	 * 
	 * @param mobjId
	 * @return
	 */

	public int deleteTriggerById(Integer mobjId);

	/**
	 * 根据主触发器id查询子触发器列表
	 * 
	 * @param mobjId
	 * @return
	 * @throws Exception
	 */
	public List<AimConfigTriggerSubPlus> getAllChildTriggerById(Integer mobjId) throws Exception;

	/**
	 * 根据主触发器id得到主触发器
	 * 
	 * @return
	 * @throws Exception
	 */
	public AimConfigTriggerPlus getTriggerById(Integer mixtId) throws Exception;

	/**
	 * 获得指定触发器的子触发器数目
	 */
	public int getChildTriggerNum(Integer id);

	/**
	 * 根据对象id查ip
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<String> getIpByObjId(Integer objId) throws Exception;

	/**
	 * 获取分类数
	 * 
	 * @return
	 * @throws ExDception
	 */
	public CateNode getAllcate() throws Exception;
	
	
	/**
	 * 根据分类id获取指标
	 * @param cateId
	 * @return
	 * @throws Exception
	 */
	public List<AimConfigMetricCateMappingView>  getMetricByCateId(Long cateId) throws Exception;

	/**
	 * 根据指标id获取函数
	 * @param mid
	 * @return
	 * @throws Exception
	 */
	public List<AimConfigMeasure> getMeasureByMid(Long mid) throws Exception;
}
