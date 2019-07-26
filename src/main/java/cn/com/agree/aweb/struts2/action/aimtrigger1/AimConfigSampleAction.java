package cn.com.agree.aweb.struts2.action.aimtrigger1;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.core.bean.AimConfigSampleView;
import tc.bank.cama.core.bean.AimMerticConfigView;
import tc.bank.cama.core.module.AimConfigMetric;
import tc.bank.cama.core.module.AimConfigSample;
import tc.bank.cama.core.service.trigger.IAimConfigSample;

/**
 * 采集参数配置
 * 
 * @author huangjun
 *
 */
@Controller("AimConfigSampleActionBean")
@Scope("prototype")
public class AimConfigSampleAction extends StandardActionSupport implements ModelDriven<AimConfigSample>{

	private static final long serialVersionUID = 1L;
	@Autowired
	private IAimConfigSample aimConfigSample;
	private Integer mid1;
	private AimConfigSample sample = new AimConfigSample();
	public Integer getMid1() {
		return mid1;
	}
	public void setMid1(Integer mid1) {
		this.mid1 = mid1;
	}
	public String getSampleList() throws Exception{
		List<AimConfigSampleView> result = aimConfigSample.getSampleList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result!=null?result: new ArrayList<AimConfigSampleView>()));
		return SUCCESS;
	}
	public String getMetricList() {
		List<AimMerticConfigView> result = aimConfigSample.getMetricList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result!=null?result: new ArrayList<AimMerticConfigView>()));
		return SUCCESS;
	}

	public String addSample() {
		String result = aimConfigSample.addSample(sample);
		if(result.contains("失败")){
			setStrutsMessage(StrutsMessage.errorMessage("新增失败"));
		}else
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	public String updateSample() {
		String result = aimConfigSample.updateSample(sample.getId(),sample);
		if(result.contains("失败")){
			setStrutsMessage(StrutsMessage.errorMessage("更新失败"));
		}else
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	public String delSample() {
		String result = aimConfigSample.delSample(sample.getId());
		if(result.contains("失败")){
			setStrutsMessage(StrutsMessage.errorMessage("删除失败"));
		}else{
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		}
		return SUCCESS;
	}

	/**
	 * 获取StrutsMessage对象
	 * 
	 * @param msg
	 * @return
	 * @throws Exception 
	 */
	public String getIpByObjectId() throws Exception{
		List<String> result =aimConfigSample.getIpByObjectId(sample.getMobjId());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result!=null?result:new ArrayList<String>()));
		return SUCCESS;
	}
	public String getconfigMetricBycfgMerId() throws Exception{
		List<AimConfigMetric>  result =aimConfigSample.getconfigMetricBycfgMerId(mid1);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result",result));
		return SUCCESS;
	}
	
	@Override
	public AimConfigSample getModel() {
		return sample;
	}

}
