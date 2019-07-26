package tc.bank.cama.cmdb.service;

import java.util.List;

public interface IPQuery {

	/**
	 * 获取软件的部署IP(关联服务器的服务IP)
	 * @param swObjectId
	 * @return
	 * @throws Exception
	 */
	String getSoftwareDeploymentIP(Long swObjectId) throws Exception;

	/**
	 * 获取对象关联的IP地址<br>
	 * 仅处理属于以下对象分类的入参
	 * <li> 入参对象是一级分类中的"应用群组"
	 * <li> 入参对象是一级分类中的"软件"
	 * <li> 入参对象是二级分类中的"逻辑服务器"
	 * 
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	List<String> getObjectRelatedIPs(Long objectId) throws Exception;
}
