package tc.bank.asda.logconfig.bean;

public class AimLogSourceStatistic {

	/**
	 * 日志源数
	 */
	private int logSourceCount;
	/**
	 * 日志文件分类数
	 */
	private int logFuncCount;
	/**
	 * 结构化字段公共数
	 */
	private int publicDictCount;
	/**
	 * 结构化字段私有数
	 */
	private int privateDictCount;
	/**
	 * 拆包类型：可视化配置
	 */
	private int splitType1;
	/**
	 * 拆包类型：python脚本
	 */
	private int splitType2;
	/**
	 * 拆包类型：groovy脚本
	 */
	private int splitType3;
	
	public int getLogSourceCount() {
		return logSourceCount;
	}
	public void setLogSourceCount(int logSourceCount) {
		this.logSourceCount = logSourceCount;
	}
	public int getLogFuncCount() {
		return logFuncCount;
	}
	public void setLogFuncCount(int logFuncCount) {
		this.logFuncCount = logFuncCount;
	}
	public int getPublicDictCount() {
		return publicDictCount;
	}
	public void setPublicDictCount(int publicDictCount) {
		this.publicDictCount = publicDictCount;
	}
	public int getPrivateDictCount() {
		return privateDictCount;
	}
	public void setPrivateDictCount(int privateDictCount) {
		this.privateDictCount = privateDictCount;
	}
	public int getSplitType1() {
		return splitType1;
	}
	public void setSplitType1(int splitType1) {
		this.splitType1 = splitType1;
	}
	public int getSplitType2() {
		return splitType2;
	}
	public void setSplitType2(int splitType2) {
		this.splitType2 = splitType2;
	}
	public int getSplitType3() {
		return splitType3;
	}
	public void setSplitType3(int splitType3) {
		this.splitType3 = splitType3;
	}
}
