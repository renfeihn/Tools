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
import tc.cama.aweb.base_monitor.Kafka.IKafkaService;

@Controller("KafkaMonitorAction")
@Scope("prototype")
public class KafkaMonitorAction extends StandardActionSupport {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Autowired
    private IKafkaService kafkaService;

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
    * 集群明细KPI
    * @return
    * @throws Exception
    */
    public String getKPIDetail() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", kafkaService.getKPIDetail2(objId)));
        return SUCCESS;
    }
    /**
     * topic列表
     * @return
     * @throws Exception
     */
     public String getTopicList() throws Exception {
         setStrutsMessage(StrutsMessage.successMessage().addParameter("result", kafkaService.getTopicList(objId)));
         return SUCCESS;
     }
    /**
     * 节点列表详情
     *
     * @return
     * @throws Exception
     */
    public String getNodeList() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", kafkaService.getNodeList(objId)));
        return SUCCESS;
    }
    /**
     * echarts
     *
     * @return
     * @throws Exception
     */
    public String getMessageEcharts() throws Exception {
        setStrutsMessage(StrutsMessage.successMessage().addParameter("result", kafkaService.getMessageEcharts(objId, interval, time)));
        return SUCCESS;
    }
}
