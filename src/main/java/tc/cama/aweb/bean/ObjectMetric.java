package tc.cama.aweb.bean;

import java.util.List;

import tc.bank.cama.core.bean.MetricVO;

public class ObjectMetric {
	/**
	 *指定对象的 cpu实时数据
	 */
     private List<MetricVO> cpuData;
     /**
      *   指定对象的内存占比
      */
     private List<MetricVO> memoryData;
     /**
      * 指定对象的磁盘io
      */
     private List<MetricVO> diskData;   
     /**
      * 指定对象的网络io
      */
     private List<MetricVO> netData;
	public List<MetricVO> getCpuData() {
		return cpuData;
	}
	public void setCpuData(List<MetricVO> cpuData) {
		this.cpuData = cpuData;
	}
	public List<MetricVO> getMemoryData() {
		return memoryData;
	}
	public void setMemoryData(List<MetricVO> memoryData) {
		this.memoryData = memoryData;
	}
	public List<MetricVO> getDiskData() {
		return diskData;
	}
	public void setDiskData(List<MetricVO> diskData) {
		this.diskData = diskData;
	}
	public List<MetricVO> getNetData() {
		return netData;
	}
	public void setNetData(List<MetricVO> netData) {
		this.netData = netData;
	} 
     
}
