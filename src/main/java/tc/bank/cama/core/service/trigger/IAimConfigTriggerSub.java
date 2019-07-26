package tc.bank.cama.core.service.trigger;

import java.util.List;

import tc.bank.cama.core.bean.AimConfigTriggerSubPlus;
import tc.bank.cama.core.module.AimConfigTriggerSub;

public interface IAimConfigTriggerSub {
	/**
	 * 通过对象id获取触发器
	 * @return
	 */
     public List<AimConfigTriggerSubPlus> getTriggerSubByObjectId(Integer objectId);
    /**
     * 获取所有触发器
     * @return
     * @throws Exception 
     */
     public List<AimConfigTriggerSubPlus> getAllTriggerSub();
     /**
      * 通过触发器id获取触发器
      * @return
      */
     public AimConfigTriggerSubPlus getAllTriggerSubByTriggerId(Integer triggerID);
     /**
      * 通过触发器id删除触发器
      * @return
      */
     public int deleteTriggerSubByTriggerId(Integer triggerID);
     /**
      * 添加触发器
      * @return
      */
     public int insertTriggerSub(AimConfigTriggerSub triggerSub);
     /**
      * 更新触发器
      */
     public int updateTriggerSub(Integer triggerId,AimConfigTriggerSub triggerSub);
     
     public List<String> getIpByObjectId(Integer objectId)throws Exception;
	
}
