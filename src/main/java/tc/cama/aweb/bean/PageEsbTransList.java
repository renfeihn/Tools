package tc.cama.aweb.bean;

import java.util.List;

import tc.cama.aweb.esb.model.EsbMonChannelSys;
import tc.cama.aweb.esb.model.EsbService;
import tc.cama.aweb.esb.model.EsbSystem;

/**
 * 应用性能-流水监控（条件列表Bean）
 */
public class PageEsbTransList {

	List<EsbMonChannelSys> esbMonChannelSys;
	List<EsbSystem> esbSystem;
	List<EsbService> esbService;

	public List<EsbMonChannelSys> getEsbMonChannelSys() {
		return esbMonChannelSys;
	}

	public List<EsbSystem> getEsbSystem() {
		return esbSystem;
	}

	public List<EsbService> getEsbService() {
		return esbService;
	}

	public void setEsbMonChannelSys(List<EsbMonChannelSys> esbMonChannelSys) {
		this.esbMonChannelSys = esbMonChannelSys;
	}

	public void setEsbSystem(List<EsbSystem> esbSystem) {
		this.esbSystem = esbSystem;
	}

	public void setEsbService(List<EsbService> esbService) {
		this.esbService = esbService;
	}

}
