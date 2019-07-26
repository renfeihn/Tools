package cn.com.agree.aweb.struts2.action.basemonitor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.EchartsUtils;
import tc.bank.common.core.Timeline;
import tc.cama.aweb.base_monitor.ES.IESService;

@Controller("ESMonitorAction")
@Scope("prototype")
public class ESMonitorAction extends StandardActionSupport {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Autowired
    private IESService esService;

    private int objId;

    private int time;

    private int interval;

    private String node_key;
    
    public String getNode_key() {
		return node_key;
	}

	public void setNode_key(String node_key) {
		this.node_key = node_key;
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

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public void setTime(int time) {
        this.time = time;
    }

    
    /**
     * 节点列表详情
     *
     * @return
     * @throws Exception
     */
    public String getNodeList() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esService.getNodesList(objId)));
        return SUCCESS;
    }
    /**
     * 索引列表详情
     *
     * @return
     * @throws Exception
     */
    public String getIndexList() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esService.getIndexList(objId)));
        return SUCCESS;
    }
    /**
     * 节点明细
     *
     * @return
     * @throws Exception
     */
    public String getNodeMetric() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esService.getNodeDetailMetric(node_key, objId)));
        return SUCCESS;
    }
    /**
     * cpu mem echarts
     *
     * @return
     * @throws Exception
     */
    public String getCpuMemEcharts() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esService.getCpuMemEcharts(node_key, objId, time, interval)));
        return SUCCESS;
    }
    /**
     *线程echarts
     *
     * @return
     * @throws Exception
     */
    public String getThreadEcharts() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esService.getThreadEcharts(node_key, objId, time, interval)));
        return SUCCESS;
    }
    /**
     *jvmecharts
     *
     * @return
     * @throws Exception
     */
    public String getJVMEcharts() throws Exception {
    	setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esService.getJVMEcharts(node_key, objId, time, interval)));
    	return SUCCESS;
    }
    /**
     *load echarts
     *
     * @return
     * @throws Exception
     */
    public String getLoadEcharts() throws Exception {
    	setStrutsMessage(StrutsMessage.successMessage().addParameter("result", esService.getLoadSegEcharts(node_key, objId, time, interval)));
    	return SUCCESS;
    }
    
}
