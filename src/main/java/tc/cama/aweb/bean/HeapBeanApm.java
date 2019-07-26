package tc.cama.aweb.bean;

import java.util.List;

public class HeapBeanApm {
	/**
	 * 堆内存情况
	 */
	public List<HeapMemBean> heaps;
	/**
	 * 总分配大小
	 */
	public String Total;
	/**
	 * 总使用大小
	 */
	public String used;

	public List<HeapMemBean> getHeaps() {
		return heaps;
	}

	public void setHeaps(List<HeapMemBean> heaps) {
		this.heaps = heaps;
	}

	public String getTotal() {
		return Total;
	}

	public void setTotal(String total) {
		Total = total;
	}

	public String getUsed() {
		return used;
	}

	public void setUsed(String used) {
		this.used = used;
	}

}
