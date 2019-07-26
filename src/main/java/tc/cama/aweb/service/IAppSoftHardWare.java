package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.PageAppHardwareServer;

/**
 * 软硬件架构
 * @author huangjun
 *
 */
public interface IAppSoftHardWare {

	/**
	 * 获取逻辑服务器和相关对象的信息
	 * @param appObjectId 应用系统id
	 * @return
	 * @throws Exception
	 */
	List<PageAppHardwareServer> getHardwareServers(Long appObjectId) throws Exception;
}
