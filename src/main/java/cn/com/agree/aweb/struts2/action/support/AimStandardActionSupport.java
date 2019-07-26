/**
 * 
 */
package cn.com.agree.aweb.struts2.action.support;

import org.springframework.beans.factory.annotation.Autowired;

import cn.com.agree.aweb.service.IRemoteService;
import cn.com.agree.aweb.struts2.action.support.bean.SerialBean;
import cn.com.agree.aweb.struts2.action.support.interfaces.IAimServer;

/**
 * 类描述
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年11月10日
 */
public class AimStandardActionSupport extends StandardActionSupport{
	private static final long serialVersionUID = -7381648427376351266L;
	/**
	 * 流水信息
	 */
	protected SerialBean serialBean = new SerialBean();
	/**
	 * 注入服务请求
	 */
	/**
	 * 注入返回前端数据
	 */
	@Autowired
	protected IAimServer aimServer;

	
	public StrutsMessage strutsMessage;
	
	public SerialBean getSerialBean() {
		return serialBean;
	}
	public void setSerialBean(SerialBean serialBean) {
		this.serialBean = serialBean;
	}
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
		public IAimServer getAimServer() {
		return aimServer;
	}
	public void setAimServer(IAimServer aimServer) {
		this.aimServer = aimServer;
	}
	

}
