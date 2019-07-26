package tc.cama.aweb.bean;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;

import tc.bank.cama.core.bean.MetricVO;
import tc.bank.common.core.Timeline;

/**
 * 应用监控_应用指标
 * 
 * @author zhangkun
 *
 */
@Scope("prototype")
public class AppMetric {
	/**
	 * cpu占比top5
	 */
	private List<MetricVO> CPUTop5;
	/**
	 * 网络iotop5
	 */
	private List<MetricVO>  netIoTop5;
	/**
	 * 磁盘io top5
	 */
	private List<MetricVO> diskIoTop5;
	/**
	 * 内存占比top5
	 */
	private List<MetricVO> memoryTop5;
	/**
	 * 磁盘空间低top5
	 * 
	 */
	private List<MetricVO> diskSpaceLowTop5;
	/**
	 * 对5类指标的echarts图数据
	 */
    private   Timeline<Integer> temeline;
    
	public Timeline<Integer> getTemeline() {
		return temeline;
	}

	public void setTemeline(Timeline<Integer> temeline) {
		this.temeline = temeline;
	}

	

	public List<MetricVO> getCPUTop5() {
		return CPUTop5;
	}

	public void setCPUTop5(List<MetricVO> cPUTop5) {
		CPUTop5 = cPUTop5;
	}

	public List<MetricVO> getNetIoTop5() {
		return netIoTop5;
	}

	public void setNetIoTop5(List<MetricVO> netIoTop5) {
		this.netIoTop5 = netIoTop5;
	}

	public List<MetricVO> getDiskIoTop5() {
		return diskIoTop5;
	}

	public void setDiskIoTop5(List<MetricVO> diskIoTop5) {
		this.diskIoTop5 = diskIoTop5;
	}

	public List<MetricVO> getMemoryTop5() {
		return memoryTop5;
	}

	public void setMemoryTop5(List<MetricVO> memoryTop5) {
		this.memoryTop5 = memoryTop5;
	}

	public List<MetricVO> getDiskSpaceLowTop5() {
		return diskSpaceLowTop5;
	}

	public void setDiskSpaceLowTop5(List<MetricVO> diskSpaceLowTop5) {
		this.diskSpaceLowTop5 = diskSpaceLowTop5;
	}

}
