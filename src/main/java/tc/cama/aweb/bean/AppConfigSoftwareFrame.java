package tc.cama.aweb.bean;

import java.util.List;
import java.util.Set;

public class AppConfigSoftwareFrame {
	/**
	 * 软件架构总览
	 */
	public List<AppConfigBean> SoftwareFrame;
	/**
	 * 应用程序列表
	 */
	public List<SoftDeployInfo> softWares;
	/**
	 * 中间件
	 */
	public List<SoftDeployInfo> middwares;
	/**
	 * 数据库
	 */
	public List<SoftDeployInfo> Dbs;
	public Set<String> ips ;

	public Set<String> getIps() {
		return ips;
	}

	public void setIps(Set<String> ips) {
		this.ips = ips;
	}
	public List<AppConfigBean> getSoftwareFrame() {
		return SoftwareFrame;
	}

	public void setSoftwareFrame(List<AppConfigBean> softwareFrame) {
		SoftwareFrame = softwareFrame;
	}

	public List<SoftDeployInfo> getSoftWares() {
		return softWares;
	}

	public void setSoftWares(List<SoftDeployInfo> softWares) {
		this.softWares = softWares;
	}

	public List<SoftDeployInfo> getMiddwares() {
		return middwares;
	}

	public void setMiddwares(List<SoftDeployInfo> middwares) {
		this.middwares = middwares;
	}

	public List<SoftDeployInfo> getDbs() {
		return Dbs;
	}

	public void setDbs(List<SoftDeployInfo> dbs) {
		Dbs = dbs;
	}

}
