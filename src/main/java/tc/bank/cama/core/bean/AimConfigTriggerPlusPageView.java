package tc.bank.cama.core.bean;

import java.util.List;

import tc.bank.cama.core.module.AimConfigTrigger;
import tc.bank.common.core.Page;

public class AimConfigTriggerPlusPageView {

	private List<AimConfigTriggerPlus> aimConfigTriggerPlus;
		
	private Page<AimConfigTrigger> pageResult;

	public List<AimConfigTriggerPlus> getAimConfigTriggerPlus() {
		return aimConfigTriggerPlus;
	}

	public void setAimConfigTriggerPlus(
			List<AimConfigTriggerPlus> aimConfigTriggerPlus) {
		this.aimConfigTriggerPlus = aimConfigTriggerPlus;
	}

	public Page<AimConfigTrigger> getPageResult() {
		return pageResult;
	}

	public void setPageResult(Page<AimConfigTrigger> pageResult) {
		this.pageResult = pageResult;
	}

	
}
