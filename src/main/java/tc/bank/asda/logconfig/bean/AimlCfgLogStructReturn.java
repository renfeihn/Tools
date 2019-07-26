package tc.bank.asda.logconfig.bean;

import java.io.Serializable;
import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogStruct;
import tc.bank.asda.logconfig.model.AimlCfgLogStructLine;

public class AimlCfgLogStructReturn implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7728472792557957426L;

	private AimlCfgLogStruct struct;
	
	private List<AimlCfgLogStructLine> lines;

	public AimlCfgLogStruct getStruct() {
		return struct;
	}

	public void setStruct(AimlCfgLogStruct struct) {
		this.struct = struct;
	}

	public List<AimlCfgLogStructLine> getLines() {
		return lines;
	}

	public void setLines(List<AimlCfgLogStructLine> lines) {
		this.lines = lines;
	}
	
}
