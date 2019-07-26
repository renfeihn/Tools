package cn.com.agree.aweb.struts2.action.appmonitor;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.esb.model.EsbSystem;
import tc.cama.aweb.esb.service.IEsbMonMsext;

@Controller("EsbMonMsextActionBean")
@Scope("prototype")
public class EsbMonMsextAction extends StandardActionSupport{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 9215186609445846484L;

	public EsbMonMsextAction() {
		// TODO Auto-generated constructor stub
	}
	@Autowired
	private IEsbMonMsext esbMonMsext;
	
	private String appId;
	
	private String syscode;
	
	

	public String getappId() {
		return appId;
	}

	public void setappId(String appId) {
		this.appId = appId;
	}

	public String getSyscode() {
		return syscode;
	}

	public void setSyscode(String syscode) {
		this.syscode = syscode;
	}
	/**
	 * @param serviceType
	 * <li> 1 - 服务消费者
	 * <li> 2 - 服务提供者
 	 */
	private int serviceType;
	
	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}
	/** @param statisticType
	 * <li> 1  - day_totnum			日交易量
	 * <li> 2  - day_sys_rate		日系统成功率
	 * <li> 3  - day_buss_rate		日业务成功率
	 * <li> 4  - day_trans_avgtime	日交易平均处理时间
	 * <li> 5  - day_esb_avgtime	日ESB内部平均处理时间
	 * <li> 6  - day_expt			日异常笔数
	 * <li> 7 - curr_totnum			当前交易量
	 * <li> 8 - curr_sys_rate		当前系统成功率
	 * <li> 9 - curr_buss_rate		当前业务成功率
	 * <li> 10 - curr_tps			当前TPS
	 * <li> 11 - curr_trans_avgtime	当前交易处理时间
	 * <li> 12 - curr_esb_avgtime	前ESB内部平均处理时间
	 * <li> 13 - stop_hold_time_flag 	当前系统持续无交易时间
	 */
	private int statisticType;
	
	/** 
	 * @param orderType
	 * <li> 1 - 升序排列 ASC
	 * <li> 2 - 降序排列 DESC
	 */
	private int orderType;
	/**
	 * 返回数量
	 */
	private int top;
	
	

	public int getServiceType() {
		return serviceType;
	}

	public void setServiceType(int serviceType) {
		this.serviceType = serviceType;
	}

	public int getStatisticType() {
		return statisticType;
	}

	public void setStatisticType(int statisticType) {
		this.statisticType = statisticType;
	}

	public int getOrderType() {
		return orderType;
	}

	public void setOrderType(int orderType) {
		this.orderType = orderType;
	}

	public int getTop() {
		return top;
	}

	public void setTop(int top) {
		this.top = top;
	}

	public IEsbMonMsext getEsbMonMsext() {
		return esbMonMsext;
	}

	public void setEsbMonMsext(IEsbMonMsext esbMonMsext) {
		this.esbMonMsext = esbMonMsext;
	}
	
	public String getEsbMonMsextInfo() throws SQLException, Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esbMonMsext.getEsbExtTopStatistic(syscode,serviceType, statisticType, orderType, top)));
		return SUCCESS;
	}
	
	public String getEsbSystem() throws NumberFormatException, Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esbMonMsext.getEsbSystype(Long.parseLong(appId))));
		return SUCCESS;
	}
	public String getEsbSystems() throws Exception{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esbMonMsext.geteEsbSystems()));
		return SUCCESS;
	}
	public String getEsbType() throws NumberFormatException, Exception{
		EsbSystem es = esbMonMsext.getEsbSystype(Long.parseLong(appId));
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", es));
		return SUCCESS;
	}

}
