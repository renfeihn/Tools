package tc.bank.cama.cmdb.service;

import tc.bank.common.core.IServiceFactory;

/**
 * cmdb服务工厂
 * 
 * @author Win7-user
 * 
 */
public interface CmdbServiceFactory extends IServiceFactory {

	/**
	 * 获取cmdb服务
	 * 
	 * @param clazz
	 *            服务类 <br />
	 *            系统分组查询 {@linkplain tc.bank.cama.cmdb.service.AppGroupQuery}
	 *            <br />
	 *            应用系统查询 {@linkplain tc.bank.cama.cmdb.service.AppQuery}<br />
	 *            CMDB对象分类查询
	 *            {@linkplain tc.bank.cama.cmdb.service.CategoryQuery} <br />
	 *            逻辑服务器查询
	 *            {@linkplain tc.bank.cama.cmdb.service.LogicalServerQuery}
	 *            <br />
	 *            CMDB对象查询 {@linkplain tc.bank.cama.cmdb.service.ObjectQuery}
	 *            <br />
	 *            物理服务器查询
	 *            {@linkplain tc.bank.cama.cmdb.service.PhysicalServerQuery}
	 *            <br />
	 *            软件查询 {@linkplain tc.bank.cama.cmdb.service.SoftwareQuery}
	 *            <br />
	 *            网络IP\端口修改
	 *            {@linkplain tc.bank.cama.cmdb.service.NetworkFlowModifier}
	 *            <br />
	 *            网络IP\端口查询
	 *            {@linkplain tc.bank.cama.cmdb.service.NetworkFlowQuery} <br />
	 * 
	 * @return
	 */
	public <T> T getService(Class<T> clazz);

	/**
	 * @see tc.bank.cama.cmdb.service.CmdbServiceFactory#getService(Class)
	 */
	public <T> T getService(String className);
}
