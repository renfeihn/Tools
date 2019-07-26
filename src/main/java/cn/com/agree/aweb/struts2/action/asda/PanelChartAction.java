package cn.com.agree.aweb.struts2.action.asda;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.dashboard.model.PanelChart;
import tc.bank.asda.dashboard.service.IPanelChartService;

@Controller("PanelChartActionBean")
@Scope("prototype")
public class PanelChartAction extends StandardActionSupport{


	private static final long serialVersionUID = 4375284449398520910L;
	
	@Autowired
	private IPanelChartService panelChartService;
	
	/**
	 * 仪表盘组件id
	 */
	private long id;
	
	/**
	 * 仪表盘组件名称
	 */
	private String name;
	
	/**
	 * 仪表盘组件类型
	 */
	private String type;
	
	/**
	 * 仪表盘组件配置
	 */
	private String config;
	
	/**
	 * 仪表盘组件截图
	 */
	
	private String pic;
	
	/**
	 * 关联的仪表盘组件ID
	 */
	private long panelId;
	
	/**
	 * panelChartBean
	 */
	private String panelChartBean;
	
	/**
	 * 查询条件
	 */
	private String whereEx;
	
	public String add(){
		try {
			PanelChart panelChart = JSONObject.parseObject(panelChartBean, PanelChart.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelChartService.add(panelChart)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String update(){
		try {
			PanelChart panelChart = JSONObject.parseObject(panelChartBean, PanelChart.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelChartService.update(panelChart)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getAll(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelChartService.getAll()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String delById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelChartService.delById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelChartService.getById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
    
    public String  getAllByWhereEx(){
		try {
			JSONObject obj = JSONObject.parseObject(whereEx);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelChartService.getAllByWhereEx(obj)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getConfig() {
		return config;
	}

	public void setConfig(String config) {
		this.config = config;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public long getPanelId() {
		return panelId;
	}

	public void setPanelId(long panelId) {
		this.panelId = panelId;
	}

	public String getPanelChartBean() {
		return panelChartBean;
	}

	public void setPanelChartBean(String panelChartBean) {
		this.panelChartBean = panelChartBean;
	}

	public String getWhereEx() {
		return whereEx;
	}

	public void setWhereEx(String whereEx) {
		this.whereEx = whereEx;
	}
	
	
}
