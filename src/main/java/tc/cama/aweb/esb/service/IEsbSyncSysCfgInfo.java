package tc.cama.aweb.esb.service;

import java.util.List;

import tc.cama.aweb.bean.EsbSyncInfo;
import tc.cama.aweb.model.AimSysconfigVariables;

/**
 * esb同步信息查询  esb系统参数配置查询 
 * 同步开始时间 
 * 同步结束时间 
 * 同步状态 
 * 同步耗时
 * @author zhangkun
 *
 */
public interface  IEsbSyncSysCfgInfo {
	/**
	 * 同步开始时间 
     * 同步结束时间 
     * 同步状态 
     * 同步耗时
	 * @return
	 */
   public EsbSyncInfo getEsbSyncInfo();
   /**
    * esb配置信息
    * @return
    */
   public List<AimSysconfigVariables> getEsbCfgInfo();
}
