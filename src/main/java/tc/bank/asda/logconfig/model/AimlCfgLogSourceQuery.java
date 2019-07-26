package tc.bank.asda.logconfig.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 日志源信息表-代理采集扩展表
 * 
 * @author parry
 * 
 */
public class AimlCfgLogSourceQuery extends AimlCfgLogSource implements Serializable{
	
	private String hostIp;

	public String getHostIp() {
		return hostIp;
	}

	public void setHostIp(String hostIp) {
		this.hostIp = hostIp;
	}
	
}
