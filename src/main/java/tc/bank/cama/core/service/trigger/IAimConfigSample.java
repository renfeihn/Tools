package tc.bank.cama.core.service.trigger;

import java.util.List;

import tc.bank.cama.core.bean.AimConfigSampleView;
import tc.bank.cama.core.bean.AimMerticConfigView;
import tc.bank.cama.core.module.AimConfigMetric;
import tc.bank.cama.core.module.AimConfigSample;

/**
 * 采集参数配置
 * @author huangjun
 *
 */
public interface IAimConfigSample {
	/**
	 * 查询指标列表
	 * @return
	 */
	public List<AimMerticConfigView> getMetricList();
	
	/**
	 * 新增参数配置
	 * @param sample
	 * @return
	 */
	public String addSample(AimConfigSample sample);
	
	/**
	 * 修改参数配置
	 * @param sample
	 * @return
	 */
	public String updateSample(Integer id,AimConfigSample sample);
	
	/**
	 * 删除参数配置
	 * @param id
	 * @return
	 */
	public String delSample(Integer id);
	
	/**
	 * 查询参数列表
	 * @return
	 */
	public List<AimConfigSampleView> getSampleList () throws Exception;
	/**
	 * 查询所属ip
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	public List<String> getIpByObjectId(Integer objectId) throws Exception;
     /**
      * 通过指标id查询指标配置
      * @param mid
      * @return
      */
	public List<AimConfigMetric>  getconfigMetricBycfgMerId(Integer mid);
}
