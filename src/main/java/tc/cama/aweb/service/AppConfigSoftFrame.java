package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.AppConfigSoftwareFrame;
import tc.cama.aweb.bean.SoftwareEvent;

/**
 * 查询应用系统下的软件架构
 * @author zhangkun
 *
 */
public interface AppConfigSoftFrame {
	/**
	 * 根据应用系统id查询关联的软件结构 
	 * 
	 * @param appId
	 * @return
	 * @throws Exception 
	 */
   public AppConfigSoftwareFrame getSoftFrameByAppId(Long appId) throws Exception;
   public AppConfigSoftwareFrame getSoftFrameByAppId2(Long appId) throws Exception;
   /**
    * 获取指定应用系统下的指定对象的事件列表和故障数 预警数
    * @param objectId
    * @param appId
    * @param page
    * @param size
    * @return
    */
   public SoftwareEvent getSoftwareEvent(String objName,Long objectId,long appId,int page,int size);
   /**
    * 获取ip所在逻辑服务器的软件架构
    * @param ip
    * @return
    */
   public AppConfigSoftwareFrame getSoftFrameByIp(String ip )throws Exception;
   /**
	 * 根据对象id查询逻辑服务器关联的软件对象
	 * 
	 * @param objectId
	 * @return
	 * @throws Exception 
	 */
  public List<Long> getSoftwareObjIdsByObjectId(Long objectId) throws Exception;
}
