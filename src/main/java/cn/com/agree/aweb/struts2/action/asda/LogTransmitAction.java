package cn.com.agree.aweb.struts2.action.asda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.bean.AimLogChannelInfo;
import tc.bank.asda.logconfig.model.AimLogChannelBase;
import tc.bank.asda.logconfig.model.AimLogChannelFile;
import tc.bank.asda.logconfig.model.AimLogChannelKafka;
import tc.bank.asda.logconfig.service.IAimLogConfigService;

@Controller("LogTransmitActionBean")
@Scope("prototype")
public class LogTransmitAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IAimLogConfigService aimLogConfigService;
	
	public IAimLogConfigService getAimLogConfigService() {
		return aimLogConfigService;
	}

	public void setAimLogConfigService(IAimLogConfigService aimLogConfigService) {
		this.aimLogConfigService = aimLogConfigService;
	}

	private String channelId;
	
	private String channelName;
	
	private String objectId;
	
	private String channeltype;
	
	private long channelcapacity;
	
	private long channeltransactioncapacity;
	
	private String filecheckpointdir;
	
	private String filedatadir;
	
	private String channeltopic;
	
	private String brokerlist;
	
	private String zookeeperconnect;
	
	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getChannelName() {
		return channelName;
	}

	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getChanneltype() {
		return channeltype;
	}

	public void setChanneltype(String channeltype) {
		this.channeltype = channeltype;
	}

	public long getChannelcapacity() {
		return channelcapacity;
	}

	public void setChannelcapacity(long channelcapacity) {
		this.channelcapacity = channelcapacity;
	}

	public long getChanneltransactioncapacity() {
		return channeltransactioncapacity;
	}

	public void setChanneltransactioncapacity(long channeltransactioncapacity) {
		this.channeltransactioncapacity = channeltransactioncapacity;
	}
	
	public String getFilecheckpointdir() {
		return filecheckpointdir;
	}

	public void setFilecheckpointdir(String filecheckpointdir) {
		this.filecheckpointdir = filecheckpointdir;
	}

	public String getFiledatadir() {
		return filedatadir;
	}

	public void setFiledatadir(String filedatadir) {
		this.filedatadir = filedatadir;
	}
	

	public String getChanneltopic() {
		return channeltopic;
	}

	public void setChanneltopic(String channeltopic) {
		this.channeltopic = channeltopic;
	}

	public String getBrokerlist() {
		return brokerlist;
	}

	public void setBrokerlist(String brokerlist) {
		this.brokerlist = brokerlist;
	}

	public String getZookeeperconnect() {
		return zookeeperconnect;
	}

	public void setZookeeperconnect(String zookeeperconnect) {
		this.zookeeperconnect = zookeeperconnect;
	}
	
	public String getChannelInfoByObjectId() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("sourceList", aimLogConfigService.getLogChannelByObjectId(objectId)).addParameter("countMap", aimLogConfigService.getLogChannelCountByObjectId(objectId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String saveChannelInfos() {
		AimLogChannelInfo channelInfo = new AimLogChannelInfo();
		
		AimLogChannelBase baseInfo = new AimLogChannelBase();
		baseInfo.setObjectid(objectId);
		baseInfo.setChannelname(channelName);
		baseInfo.setChanneltype(channeltype);
		baseInfo.setChannelcapacity(channelcapacity);
		baseInfo.setChanneltransactioncapacity(channeltransactioncapacity);
		channelInfo.setBaseInfo(baseInfo);
		
		if("file".equals(channeltype)) {
			AimLogChannelFile fileInfo = new AimLogChannelFile();
			fileInfo.setFilecheckpointdir(filecheckpointdir);
			fileInfo.setFiledatadir(filedatadir);
			channelInfo.setFileInfo(fileInfo);
			
		}else if("org.apache.flume.channel.kafka.KafkaChannel".equals(channeltype)) {
			AimLogChannelKafka kafkaInfo = new AimLogChannelKafka();
			kafkaInfo.setTopic(channeltopic);
			kafkaInfo.setBrokerlist(brokerlist);
			kafkaInfo.setZookeeperconnect(zookeeperconnect);
			channelInfo.setKafkaInfo(kafkaInfo);
		}
		
		try {
			
			return SUCCESS;
		}catch(Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
		
//		try {
//			aimLogConfigService.saveSourceConfig(configInfo);
//			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
//			return SUCCESS;
//		} catch (Exception e) {
//			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
//			return ERROR;
//		}
	}
}
