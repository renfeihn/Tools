package tc.cama.aweb.ab.model;

import java.util.Set;

public class AimAbsBrinfoCfgAbcCount {

	private AimAbsBrinfoCfg brinfo;
	private int AbcCount;
	private Set<String> subIds;

	public AimAbsBrinfoCfg getBrinfo() {
		return brinfo;
	}

	public int getAbcCount() {
		return AbcCount;
	}

	public Set<String> getSubIds() {
		return subIds;
	}

	public void setBrinfo(AimAbsBrinfoCfg brinfo) {
		this.brinfo = brinfo;
	}

	public void setAbcCount(int abcCount) {
		AbcCount = abcCount;
	}

	public void setSubIds(Set<String> subIds) {
		this.subIds = subIds;
	}

}
