package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.service.IMQDetail;

@Controller("MQDetailActionBean")
@Scope("prototype")
public class MQDetailAction extends StandardActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3574600100892764171L;

	
	@Autowired
	private IMQDetail mqDetail;
	
	private int objId;
	private int time ;
	
	


	public IMQDetail getMqDetail() {
		return mqDetail;
	}

	public void setMqDetail(IMQDetail mqDetail) {
		this.mqDetail = mqDetail;
	}

	
	public int getObjId() {
		return objId;
	}

	public void setObjId(int objId) {
		this.objId = objId;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	/**
	 * 基础信息
	 * @return
	 */
	public String getMQBaseInfo(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", mqDetail.getMQBase(objId)));
		return SUCCESS;
	}
	/**
	 * 队列深度百分比
	 * @return
	 */
	public String getQueueDepthPercent(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", mqDetail.getQueueDepthPer(objId)));
		return SUCCESS;
	}
	/**
	 * 队列详情
	 * @return
	 */
	public String getQueueDetail(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", mqDetail.getQueueDetail(objId)));
		return SUCCESS;
	}

	
	/**
	 * 获得通道信息
	 * @return
	 */
	public String getChanneDetail(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", mqDetail.getChanneList(objId)));
		return SUCCESS;
	}
	/**
	 * 通道状态
	 * @return
	 */
	public String getChanneStatus(){
		Map<String, List<String>> channestatus = new HashMap<String, List<String>>();
		List<String> unit = new ArrayList<String>();
		List<String> time = new ArrayList<String>();
		List<String> item = new ArrayList<String>();
		List<Map<String,Object>> status = mqDetail.getChanneStatus(objId);
		time.add("正在启动");
		time.add("正在绑定");
		time.add("正在初始化");
		time.add("正在运行");
		time.add("正在停止");
		time.add("正在重试");
		time.add("已暂停");
		time.add("已停止");
		Map<String,String> map = new HashMap<String,String>();
		for(Map<String,Object> st : status){
			if(null!=st.get("c")&&null!=st.get("CHANNEL_STATUS")){
				unit.add("");
				item.add(st.get("c").toString());
				map.put(st.get("CHANNEL_STATUS").toString(), st.get("c").toString());
			}
		}
		List<String> line1 = new ArrayList<String>();
		channestatus.put("unit", unit);
		channestatus.put("time", time);
		for(int i=1;i<=time.size();i++){
			if(map.get(i+"")==null){
				line1.add("0");
			}else
				line1.add(map.get(i+""));
			
		}
		channestatus.put("line1", line1);
		channestatus.put("item", time);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", channestatus));
		return SUCCESS;
	}
	/**
	 * 链接数echarts
	 * @return
	 */
	public String getLinkEcharts(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", mqDetail.getLinkEcharts(objId, time)));
		return SUCCESS;
	}

	/**
	 * 深度百分比TOP5
	 * @return
	 */
	public String getDepthPerTOP5(){
		Map<String, List<String>> depthPerTop5 = new HashMap<String, List<String>>();
		List<String> unit = new ArrayList<String>();
		List<String> time = new ArrayList<String>();
		List<String> item = new ArrayList<String>();
		List<Map<String,Object>> depPer = mqDetail.getQueueDepthPerTop5(objId);
		for(Map<String,Object> dp : depPer){
			if(null!=dp.get("qname")&&null!=dp.get("per")){
				unit.add("%");
				time.add(dp.get("qname").toString());
				item.add(dp.get("per").toString());
			}
		}
		
		depthPerTop5.put("unit", unit);
		depthPerTop5.put("time", time);
		List<String> line1 = new ArrayList<String>();
		for(int i=1;i<=item.size();i++){
			line1.add(item.get(i-1));
		}
		depthPerTop5.put("line1", line1);
		depthPerTop5.put("item", time);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", depthPerTop5));
		return SUCCESS;
	}
	/**
	 * 深度TOP5
	 * @return
	 */
	public String getDepthTOP5(){
		Map<String, List<String>> depthTop5 = new HashMap<String, List<String>>();
		List<String> unit = new ArrayList<String>();
		List<String> time = new ArrayList<String>();
		List<String> item = new ArrayList<String>();
		List<Map<String,Object>> dep = mqDetail.getQueueDepthTOP5(objId);
		for(Map<String,Object> dp : dep){
			if(null!=dp.get("qname")&&null!=dp.get("curdepth")){
				unit.add("");
				time.add(dp.get("qname").toString());
				item.add(dp.get("curdepth").toString());
			}
		}
		List<String> line1 = new ArrayList<String>();
		depthTop5.put("unit", unit);
		depthTop5.put("time", time);
		for(int i=1;i<=item.size();i++){
			line1.add(item.get(i-1));
		}
		depthTop5.put("line1", line1);
		depthTop5.put("item", time);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("echartsData", depthTop5));
		return SUCCESS;
	}
	/**
	 * 得到错误日志列表
	 * @return
	 */
	public String getErrLog(){
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", mqDetail.getErrLog(objId)));
		return SUCCESS;
	}
	/**
	 * echarts
	 * @return
	 */
	public String getEcharts(){
		return SUCCESS;
	}
	
	

}
