package tc.cama.aweb.echarts.service;

import java.util.List;

import tc.cama.aweb.echarts.model.AimConfigEchartsInstance;


public interface IEchartsInsConf {

	public List<AimConfigEchartsInstance> getList();
	
	public void addOrUpdateConf(AimConfigEchartsInstance ins);

	public void deleteConf(int uid);
}				
