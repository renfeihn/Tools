package cn.com.agree.aweb.struts2.action.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.echarts.model.AimConfigEchartsInstance;
import tc.cama.aweb.echarts.model.AimConfigEchartsPage;
import tc.cama.aweb.echarts.service.IAimConfigEchartsPage;
import tc.cama.aweb.echarts.service.IEchartsInsConf;

@Controller("EchartsInsConfActionBean")
@Scope("prototype")
public class EchartsInsConfAction extends StandardActionSupport implements ModelDriven<AimConfigEchartsInstance>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1436004287303255307L;
	private AimConfigEchartsInstance echarts = new AimConfigEchartsInstance();
	@Autowired
	private IEchartsInsConf conf;
	@Autowired
	private IAimConfigEchartsPage aimConfigEchartsPage;
	private String metriName;
	public IEchartsInsConf getConf() {
		return conf;
	}
	public void setConf(IEchartsInsConf conf) {
		this.conf = conf;
	}
	@Override
	public AimConfigEchartsInstance getModel() {
		return echarts;
	}
	public AimConfigEchartsInstance getEcharts() {
		return echarts;
	}
	public void setEcharts(AimConfigEchartsInstance echarts) {
		this.echarts = echarts;
	}
	
	public String getMetriName() {
		return metriName;
	}
	public void setMetriName(String metriName) {
		this.metriName = metriName;
	}
	public String getList(){
		List<AimConfigEchartsInstance> l = conf.getList();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", l));
		return SUCCESS;
	}
	
	public String addOrUpdate(){
		conf.addOrUpdateConf(echarts);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", true));
		return SUCCESS;
	}
	
	public String deleteConf(){
		conf.deleteConf(echarts.getUid());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", true));
		return SUCCESS;
		
	}
	/**
	 * 根据指标名字查询指标配置
	 */
	public String findAimCfgEchartPageByMetriName() throws Exception{
	List<AimConfigEchartsInstance> list=conf.getList();
	List<HashMap<Object, Object>> lmap=new ArrayList<HashMap<Object,Object>>();
	 List<AimConfigEchartsPage> eps=aimConfigEchartsPage.getAimCfgEchartPageBaseInfo();
	//List<AimConfigEchartsInstance> list1=new ArrayList<AimConfigEchartsInstance>();
	 for(AimConfigEchartsPage p:eps){
	 for(AimConfigEchartsInstance page:list){
    	   HashMap<Object,Object> map=new HashMap<Object,Object>();
    	  
    	   if(page.getTid().equals(metriName)&&(int)page.getUid()==(int)p.getEid()){
    		   
    		   map.put("inst", page);
    		   map.put("styleId", p.getEtypeId());
    		   if(removeTheSame(lmap,map)){
    		   lmap.add(map);
    		   }
    	   }
    	   }
       }
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aimConfigEchartsInstance", lmap));
		return SUCCESS;
	}
	 public Boolean removeTheSame(List<HashMap<Object, Object>> lmap,HashMap<Object, Object> map){
		for(HashMap<Object, Object> m:lmap){
			if(((AimConfigEchartsInstance)map.get("inst")).getUid()==((AimConfigEchartsInstance)m.get("inst")).getUid()&&
					(Integer)map.get("styleId")==(Integer)m.get("styleId")	
					){
				return false;
			}
		}
		 return true;
	 }
}
