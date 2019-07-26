package tc.cama.aweb.bean;

public class AbsBean {
	/**
	 * 虚拟机内存
	 */
	private String vimMen;
	/**
	 * 端口状态
	 */
	private boolean portState;
	/**
	 * 进程状态
	 */
	private String threadState;
	/**
	 * cpu使用率
	 */
	private String pupc;
	/**
	 * 物理内存使用率
	 */
	private String phPc;
	/**
	 * abc连接数
	 */
	private int abcCount;

	/**
	 * 任务平均处理时间
	 */
	private String taskAvgTime;
	
	/**
	 * db连接数
	 * @return
	 */
	private String dbcount;
	
	/**
	 * 事件数
	 * @return
	 */
	private int eventcount;
	
	/**
	 * I/O
	 */
	private String io;
	
	/**
	 * 平台上次体检时间
	 */
	private String lastTime;
	
	
	
	public String getIo() {
		return io;
	}

	public void setIo(String io) {
		this.io = io;
	}

	public int getEventcount() {
		return eventcount;
	}



	public void setEventcount(int eventcount) {
		this.eventcount = eventcount;
	}

	public String getVimMen() {
		return vimMen;
	}

	public void setVimMen(String vimMen) {
		this.vimMen = vimMen;
	}


	public String getTaskAvgTime() {
		return taskAvgTime;
	}



	public String getDbcount() {
		return dbcount;
	}



	public void setTaskAvgTime(String taskAvgTime) {
		this.taskAvgTime = taskAvgTime;
	}



	public void setDbcount(String dbcount) {
		this.dbcount = dbcount;
	}



	public boolean isPortState() {
		return portState;
	}

	public void setPortState(boolean portState) {
		this.portState = portState;
	}

	public String getThreadState() {
		return threadState;
	}

	public void setThreadState(String threadState) {
		this.threadState = threadState;
	}

	public String getPupc() {
		return pupc;
	}

	public void setPupc(String pupc) {
		this.pupc = pupc;
	}

	public String getPhPc() {
		return phPc;
	}

	public void setPhPc(String phPc) {
		this.phPc = phPc;
	}

	public int getAbcCount() {
		return abcCount;
	}

	public void setAbcCount(int abcCount) {
		this.abcCount = abcCount;
	}

	public String getLastTime() {
		return lastTime;
	}

	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}


}
