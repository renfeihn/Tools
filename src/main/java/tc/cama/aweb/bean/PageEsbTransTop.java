package tc.cama.aweb.bean;

import java.util.List;

import tc.cama.aweb.esb.model.AimEsbMonMsext1;

/**
 * 应用性能-流水分析-topBean
 */
public class PageEsbTransTop {

	List<AimEsbMonMsext1> consumerTop;
	List<AimEsbMonMsext1> providerTop;

	public List<AimEsbMonMsext1> getConsumerTop() {
		return consumerTop;
	}

	public void setConsumerTop(List<AimEsbMonMsext1> consumerTop) {
		this.consumerTop = consumerTop;
	}

	public List<AimEsbMonMsext1> getProviderTop() {
		return providerTop;
	}

	public void setProviderTop(List<AimEsbMonMsext1> providerTop) {
		this.providerTop = providerTop;
	}

}
