package cn.com.agree.aweb.struts2.action.screen;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.PageMonitorApmTop;
import tc.cama.aweb.service.IAppMonitor;

@Controller("MonitorActionBean")
@Scope("prototype")
public class MonitorAction extends StandardActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IAppMonitor appMonitor;
	 
	int top;
    public Map<Integer,List<String>> typemap;
	public IAppMonitor getAppMonitor() {
		return appMonitor;
	}

	public int getTop() {
		return top;
	}

	public void setAppMonitor(IAppMonitor appMonitor) {
		this.appMonitor = appMonitor;
	}

	public void setTop(int top) {
		this.top = top;
	}

	public Map<Integer, List<String>> getTypemap() {
		return typemap;
	}

	public void setTypemap(Map<Integer, List<String>> typemap) {
		this.typemap = typemap;
	}

	/**
	 * top 日交易量
	 * @param top
	 * @return
	 * @throws Exception
	 */
	public String getApmTransTop() throws Exception {
		//Map<Integer, List<String>> mobjAndType=appMonitor.getMobjAndType(top);
		List<Object> monitorApmTop = appMonitor.getApmTransTop(top);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("monitorApmTop", monitorApmTop.get(1)).addParameter("typemap",monitorApmTop.get(0) ));
		return SUCCESS;
	}
	
	/**
	 * top 成功率-业务成功率
	 * @param top
	 * @return
	 * @throws Exception
	 */
	public String getApmBussSucTop() throws Exception {
		List<PageMonitorApmTop> monitorApmTop = appMonitor.getApmBussSucTop(top,typemap);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("monitorApmTop", monitorApmTop));
		return SUCCESS;
	}
	
	/**
	 * top 响应率-系统成功率
	 * @param top
	 * @return
	 * @throws Exception
	 */
	public String getApmSysSucTop() throws Exception {
		List<PageMonitorApmTop> monitorApmTop = appMonitor.getApmSysSucTop(top,typemap);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("monitorApmTop", monitorApmTop));
		return SUCCESS;
	}
	
	/**
	 * top  tps
	 * @param top
	 * @return
	 * @throws Exception
	 */
	public String getApmTpsTop() throws Exception {
		List<PageMonitorApmTop> monitorApmTop = appMonitor.getApmTpsTop(top,typemap);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("monitorApmTop", monitorApmTop));
		return SUCCESS;
	}
	
	/**
	 * top 耗时
	 * @param top
	 * @return
	 * @throws Exception
	 */
	public String getApmTimeTop() throws Exception {
		List<PageMonitorApmTop> monitorApmTop = appMonitor.getApmTimeTop(top,typemap);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("monitorApmTop", monitorApmTop));
		return SUCCESS;
	}
	
}
