package cn.com.agree.aweb.struts2.action.screen;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.IScreenAimEsbMon;
/**
 * 大屏，根据系统id来获取系统的各项指标以及昨日同比信息
 * @author Win7-user
 *
 */
@Controller("ScreenAimEsbMonActionBean")
@Scope("prototype")
public class ScreenAimEsbMonAction  extends StandardActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4670780058196149735L;
	@Autowired
	private IScreenAimEsbMon screenAimEsbMon;
	private String objIds;

	public String getObjIds() {
		return objIds;
	}

	public void setObjIds(String objIds) {
		this.objIds = objIds;
	}



	public String getSummaryAPMf() throws Exception {
		Map<String,Object> summarys = screenAimEsbMon.getAppSummary(objIds);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("summarys", summarys));
		return SUCCESS;
	}

}
