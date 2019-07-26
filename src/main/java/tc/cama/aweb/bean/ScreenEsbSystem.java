package tc.cama.aweb.bean;

import tc.cama.aweb.esb.model.EsbSystem;

public class ScreenEsbSystem {

	/**
	 * 健康度
	 */
	private int healthyValue;
	
	/** ESB系统对象 */
	private EsbSystem esbSystem;

	public int getHealthyValue() {
		return healthyValue;
	}

	public void setHealthyValue(int healthyValue) {
		this.healthyValue = healthyValue;
	}

	public EsbSystem getEsbSystem() {
		return esbSystem;
	}

	public void setEsbSystem(EsbSystem esbSystem) {
		this.esbSystem = esbSystem;
	}

}

