package tc.cama.aweb.bean;

import java.util.List;

public class PageCfgSoftDeploy {

	String osModel;//
	long dbCount;
	long mwCount;
	long programCount;
	List<PageCfgSoftwares> cfgSoftwareDeploy;

	public List<PageCfgSoftwares> getCfgSoftwareDeploy() {
		return cfgSoftwareDeploy;
	}

	public void setCfgSoftwareDeploy(List<PageCfgSoftwares> cfgSoftwareDeploy) {
		this.cfgSoftwareDeploy = cfgSoftwareDeploy;
	}

	public String getOsModel() {
		return osModel;
	}

	public void setOsModel(String osModel) {
		this.osModel = osModel;
	}

	public long getDbCount() {
		return dbCount;
	}

	public void setDbCount(long dbCount) {
		this.dbCount = dbCount;
	}

	public long getMwCount() {
		return mwCount;
	}

	public void setMwCount(long mwCount) {
		this.mwCount = mwCount;
	}

	public long getProgramCount() {
		return programCount;
	}

	public void setProgramCount(long programCount) {
		this.programCount = programCount;
	}

}
