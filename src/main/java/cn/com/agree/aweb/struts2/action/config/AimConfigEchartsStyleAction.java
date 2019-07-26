package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.echarts.model.AimConfigEchartsStyle;
import tc.cama.aweb.echarts.service.IAimConfigEchartsStyle;

/**
 * Echarts样式配置表
 */
@Controller("AimConfigEchartsStyleActionBean")
@Scope("prototype")
public class AimConfigEchartsStyleAction extends StandardActionSupport implements ModelDriven<AimConfigEchartsStyle>{
	
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IAimConfigEchartsStyle styleService;
	
	private AimConfigEchartsStyle aimConfigEchartsStyle = new AimConfigEchartsStyle();

	public IAimConfigEchartsStyle getStyleService() {
		return styleService;
	}

	public void setStyleService(IAimConfigEchartsStyle styleService) {
		this.styleService = styleService;
	}

	public AimConfigEchartsStyle getAimConfigEchartsStyle() {
		return aimConfigEchartsStyle;
	}

	public void setAimConfigEchartsStyle(AimConfigEchartsStyle aimConfigEchartsStyle) {
		this.aimConfigEchartsStyle = aimConfigEchartsStyle;
	}

	@Override
	public AimConfigEchartsStyle getModel() {
		return aimConfigEchartsStyle;
	}

	/**
	 * 查询Echarts样式配置表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String queryEchartsStyle() throws Exception {
		List<AimConfigEchartsStyle> query = styleService.queryEchartsStyle();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("query",query));
		return SUCCESS;
	}
	
	/**
	 * 更新Echarts样式配置表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String updateEchartsStyle() throws Exception {
		int result = styleService.updateEchartsStyle(aimConfigEchartsStyle);
		if(result != 0){
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","更新数据成功"));
		}else{
			setStrutsMessage((StrutsMessage.errorMessage("更新数据失败")));
		}
		return SUCCESS;
	}
	
	/**
	 * 插入Echarts样式配置表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String insertEchartsStyle() throws Exception {
		int result = styleService.insertEchartsStyle(aimConfigEchartsStyle);
		if(result == 1){
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","插入数据成功"));
		}else{
			setStrutsMessage((StrutsMessage.errorMessage("插入数据失败")));
		}	
		return SUCCESS;
	}
	
	/**
	 * 删除Echarts样式配置表
	 * 
	 * @return
	 * @throws Exception
	 */
	public String deleteEchartsStyle() throws Exception {
		int result = styleService.deleteEchartsStyle(aimConfigEchartsStyle.getId());
		if(result != 0){
			setStrutsMessage(StrutsMessage.successMessage().addParameter("msg","删除数据成功"));
		}else{
			setStrutsMessage((StrutsMessage.errorMessage("删除数据失败")));
		}
		return SUCCESS;
	}



}
