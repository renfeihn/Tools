/**
 * 
 */
package cn.com.agree.aweb.struts2.action.interceptor;

import java.net.InetAddress;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import cn.com.agree.aweb.struts2.action.support.AimServerAfaSdk;
import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.struts2.action.support.bean.SerialBean;
import cn.com.agree.aweb.struts2.action.support.interfaces.IAimServer;

/**
 * 注入serialbean并设置信息
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年10月26日
 */
public class SerialInterceptor implements Interceptor{
	private static final long serialVersionUID = 221908873269399928L;
	@Autowired
	private IAimServer aimService;
	@Override
	public void destroy() {
	}

	@Override
	public void init() {
	}
	
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		AimStandardActionSupport action = (AimStandardActionSupport) invocation.getAction();
		SerialBean serialBean = action.getSerialBean();
		HttpServletRequest req = (HttpServletRequest)invocation.getInvocationContext().get(ServletActionContext.HTTP_REQUEST);
		String hostName = InetAddress.getLocalHost().getHostName();
		serialBean.setActionBeginTime(System.currentTimeMillis());
		serialBean.setReqIP(req.getRemoteAddr());
		serialBean.setWebHostName(hostName);
		serialBean.setActionPath(action.getClass().toString());
		serialBean.setActionURI(req.getRequestURI());
		serialBean.setSerialNo();
		req.setAttribute("serialBean", serialBean);
		aimService.setUsername1(action.getUserName());
		aimService.setSerialBean1(serialBean);
		action.setAimServer(aimService);
		action.setStrutsMessage(new StrutsMessage(serialBean));
		invocation.invoke();
		return null;
	}

	public IAimServer getAimService() {
		return aimService;
	}

	public void setAimService(IAimServer aimService) {
		this.aimService = aimService;
	}
	

}
