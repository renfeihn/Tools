package tc.cama.aweb.bean;

import tc.cama.aweb.ab.model.AimAbsDynamicCur;
import tc.cama.aweb.ab.model.AimAbsOsinfoCur;

/**
 * 
 * 内存分析
 *
 */
public class MemAnsyBean {
	private AimAbsDynamicCur absDynam;
	
	private AimAbsOsinfoCur absOs ;

	public AimAbsDynamicCur getAbsDynam() {
		return absDynam;
	}

	public void setAbsDynam(AimAbsDynamicCur absDynam) {
		this.absDynam = absDynam;
	}

	public AimAbsOsinfoCur getAbsOs() {
		return absOs;
	}

	public void setAbsOs(AimAbsOsinfoCur absOs) {
		this.absOs = absOs;
	}
	
}
