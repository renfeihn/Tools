package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.echarts.model.AimConfigEchartsPage;
import tc.cama.aweb.echarts.service.IAimConfigEchartsPage;

@Scope("prototype")
@Controller("AimConfigEchartsPageActionBean")
public class AimCfgEchartPageAction extends StandardActionSupport implements ModelDriven<AimConfigEchartsPage>{
	private static final long serialVersionUID = 1L;
	private StrutsMessage strutsMessage;
	private AimConfigEchartsPage aimCfgEchartsPage=new AimConfigEchartsPage();
	@Autowired
	private IAimConfigEchartsPage aimConfigEchartsPage;
	
	@Override
	public AimConfigEchartsPage getModel() {
		return aimCfgEchartsPage;
	}
	private String metriName;
	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}
	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}
	public AimConfigEchartsPage getAimCfgEchartsPage() {
		return aimCfgEchartsPage;
	}
	public void setAimCfgEchartsPage(AimConfigEchartsPage aimCfgEchartsPage) {
		this.aimCfgEchartsPage = aimCfgEchartsPage;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getMetriName() {
		return metriName;
	}
	public void setMetriName(String metriName) {
		this.metriName = metriName;
	}
	public IAimConfigEchartsPage getAimConfigEchartsPage() {
		return aimConfigEchartsPage;
	}
	public void setAimConfigEchartsPage(IAimConfigEchartsPage aimConfigEchartsPage) {
		this.aimConfigEchartsPage = aimConfigEchartsPage;
	} 
	
	/**
	 * 得到全部记录
	 * @return
	 * @throws Exception
	 */
	public String getAimCfgEchartPageBaseInfo() throws Exception{
		List<AimConfigEchartsPage> list=aimConfigEchartsPage.getAimCfgEchartPageBaseInfo();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", list));
		return SUCCESS;
	}
	/**
	 * 增加记录
	 */
	public String addAimCfgEchartPageRecord() throws Exception{
		int result=aimConfigEchartsPage.addAimCfgEchartPageRecord(aimCfgEchartsPage);
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("添加记录失败！");
		}
		return SUCCESS;
	}
	/**
	 * 删除记录
	 */
	public String deleteAimCfgEchartPageRecord() throws Exception{
		int result=aimConfigEchartsPage.deleteAimCfgEchartPageRecord(aimCfgEchartsPage.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("删除记录失败！");
		}
		return SUCCESS;
	}
	/**
	 * 修改记录
	 */
	public String updateAimCfgEchartPageRecord() throws Exception{
		int result=aimConfigEchartsPage.updateAimCfgEchartPageRecord(aimCfgEchartsPage);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		if (result != 0) {
			strutsMessage = StrutsMessage.successMessage().addParameter("result", result);
		} else {
			strutsMessage = StrutsMessage.errorMessage("修改记录失败！");
		}
		return SUCCESS;
	}
	/**
	 * 根据id查找记录
	 */
	public String findAimCfgEchartPageRecord() throws Exception{
		AimConfigEchartsPage aimCfgEchPage=aimConfigEchartsPage.findAimCfgEchartPageRecord(aimCfgEchartsPage.getId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimCfgEchPage", aimCfgEchPage));
		return SUCCESS;
	}
	
}
