package tc.cama.aweb.bean;

public class KeyKPI {
	// indoubt状态
	private int indoubtState;
	// 队列深度过高
	private int queryDepthHigh;
	// 端口状态异常
	private int portStateExcept;
	// 死信队列信息
	private int queryInformation;
	public int getIndoubtState() {
		return indoubtState;
	}
	public void setIndoubtState(int indoubtState) {
		this.indoubtState = indoubtState;
	}
	public int getQueryDepthHigh() {
		return queryDepthHigh;
	}
	public void setQueryDepthHigh(int queryDepthHigh) {
		this.queryDepthHigh = queryDepthHigh;
	}
	public int getPortStateExcept() {
		return portStateExcept;
	}
	public void setPortStateExcept(int portStateExcept) {
		this.portStateExcept = portStateExcept;
	}
	public int getQueryInformation() {
		return queryInformation;
	}
	public void setQueryInformation(int queryInformation) {
		this.queryInformation = queryInformation;
	}
  
	
}
