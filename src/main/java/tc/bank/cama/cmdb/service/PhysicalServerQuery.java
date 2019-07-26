package tc.bank.cama.cmdb.service;

import tc.bank.cama.cmdb.model.table.extention.CmdbPhysicalServer;

public interface PhysicalServerQuery {

	/**
	 * 获取逻辑服务器关联的物理服务器
	 * 
	 * @param srvObjectId
	 * 逻辑服务器对象ID
	 * 
	 * @return
	 * @throws Exception
	 */
	CmdbPhysicalServer getServerRelatedHardware(Long srvObjectId) throws Exception;
}
