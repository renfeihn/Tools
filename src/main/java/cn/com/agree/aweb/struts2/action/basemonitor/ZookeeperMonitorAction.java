package cn.com.agree.aweb.struts2.action.basemonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.base_monitor.ZOOKEEPER.IZookeeperService;

@Controller("ZookeeperMonitorAction")
@Scope("prototype")
public class ZookeeperMonitorAction extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4889023597650247925L;

	@Autowired
	private IZookeeperService service;
	private String objectId;

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public IZookeeperService getService() {
		return service;
	}

	public void setService(IZookeeperService service) {
		this.service = service;
	}

	//汇总集群列表
	public String getClusterFormInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("clusterDataInfo", service.getClusterForm()));
		return SUCCESS;
	}
	// 汇总某个集群的服务信息
	public String getServerDetailInfo() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appDataInfo", service.getServerDetail(objectId)));
		return SUCCESS;
	}
	
}
