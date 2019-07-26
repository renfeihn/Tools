package tc.bank.asda.logconfig.bean;

import tc.bank.asda.logconfig.model.AimLogChannelBase;
import tc.bank.asda.logconfig.model.AimLogChannelFile;
import tc.bank.asda.logconfig.model.AimLogChannelKafka;

public class AimLogChannelInfo {
	
	private AimLogChannelBase baseInfo;
	
	private AimLogChannelFile fileInfo;
	
	private AimLogChannelKafka kafkaInfo;

	public AimLogChannelBase getBaseInfo() {
		return baseInfo;
	}

	public void setBaseInfo(AimLogChannelBase baseInfo) {
		this.baseInfo = baseInfo;
	}

	public AimLogChannelFile getFileInfo() {
		return fileInfo;
	}

	public void setFileInfo(AimLogChannelFile fileInfo) {
		this.fileInfo = fileInfo;
	}

	public AimLogChannelKafka getKafkaInfo() {
		return kafkaInfo;
	}

	public void setKafkaInfo(AimLogChannelKafka kafkaInfo) {
		this.kafkaInfo = kafkaInfo;
	}
	
	
}
