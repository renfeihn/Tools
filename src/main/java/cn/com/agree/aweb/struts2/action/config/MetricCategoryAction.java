package cn.com.agree.aweb.struts2.action.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.core.module.AimConfigMetricCateMapping;
import tc.bank.cama.core.module.AimConfigMetricCateMappingView;
import tc.cama.aweb.service.IMetricCategory;

/**
 * 指标分类定义
 * 
 * @author luotong
 *
 */
@Controller("MetricCategoryActionBean")
@Scope("prototype")
public class MetricCategoryAction extends StandardActionSupport implements ModelDriven<AimConfigMetricCateMapping>{

	private static final long serialVersionUID = 1L;

	@Autowired
	private IMetricCategory metricCategory;
	
	private AimConfigMetricCateMapping metricCate = new AimConfigMetricCateMapping();
	
	public AimConfigMetricCateMapping getMetricCate() {
		return metricCate;
	}

	public void setMetricCate(AimConfigMetricCateMapping metricCate) {
		this.metricCate = metricCate;
	}

	/**
	 * 指标定义，列表查询
	 * @return
	 */
	public String getMetricList(){
		List<AimConfigMetricCateMappingView> metricList = metricCategory.getMetricList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("metricList", metricList));
		return SUCCESS;
	}
	
	/**
	 * 新增指标分类
	 * @param metricCate
	 * @return
	 */
	public String addMetricCate(){
		String msg = metricCategory.addMetricCate(metricCate);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 修改指标分类
	 * @param metricCate
	 * @return
	 */
	public String updateMetricCate(){
		String msg = metricCategory.updateMetricCate(metricCate);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 删除指标分类
	 * @param id 指标分类id
	 * @return
	 */
	public String delMetricCate(){
		String msg = metricCategory.delMetricCate(metricCate.getId());
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 获取StrutsMessage对象
	 * 
	 * @param msg
	 * @return
	 */
	private StrutsMessage getStrutsMessageBean(String msg) {
		return "".equals(msg) ? StrutsMessage.successMessage() : StrutsMessage.errorMessage(msg);
	}

	@Override
	public AimConfigMetricCateMapping getModel() {
		return metricCate;
	}

}