package tc.cama.aweb.bean;

public class JvmBean {
	/**
	 * Minor GC'
	 */
     private String YGC;
     /**
      * Minor GC耗时
      */
     private String  YGCT;
     /**
      * 'Full GC',
      */
     private String FGC;
     /**Full GC耗时
      * 
      */
     private String FGCT;
     /**
      * Minor & Full GC共计耗时
      */
     private String GCT;
	public String getYGC() {
		return YGC;
	}
	public void setYGC(String yGC) {
		YGC = yGC;
	}
	public String getYGCT() {
		return YGCT;
	}
	public void setYGCT(String yGCT) {
		YGCT = yGCT;
	}
	public String getFGC() {
		return FGC;
	}
	public void setFGC(String fGC) {
		FGC = fGC;
	}
	public String getFGCT() {
		return FGCT;
	}
	public void setFGCT(String fGCT) {
		FGCT = fGCT;
	}
	public String getGCT() {
		return GCT;
	}
	public void setGCT(String gCT) {
		GCT = gCT;
	}
     
}
