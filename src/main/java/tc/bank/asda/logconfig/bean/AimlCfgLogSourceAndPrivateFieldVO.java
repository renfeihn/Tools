package tc.bank.asda.logconfig.bean;

import java.io.Serializable;
import java.util.List;

import tc.bank.asda.logconfig.model.AimlCfgLogSourceAgent;
import tc.bank.asda.logconfig.model.AimlCfgLogSplitFieldV1;

/**
 * 通过sourceId获取日志源詳情返回信息类
 * @author anpei
 *
 */
public class AimlCfgLogSourceAndPrivateFieldVO implements Serializable {



	private static final long serialVersionUID = 3686862598980176192L;

	private AimlCfgLogSourceAgent logSourceAndAgent;
	
	private List<AimlCfgLogSplitFieldV1> privateFields;
	
	public AimlCfgLogSourceAgent getLogSourceAndAgent() {
		return logSourceAndAgent;
	}

	public void setLogSourceAndAgent(AimlCfgLogSourceAgent logSourceAndAgent) {
		this.logSourceAndAgent = logSourceAndAgent;
	}

	public List<AimlCfgLogSplitFieldV1> getPrivateFields() {
		return privateFields;
	}

	public void setPrivateFields(List<AimlCfgLogSplitFieldV1> privateFields) {
		this.privateFields = privateFields;
	}


	@Override
	public String toString() {
		return "AimlCfgLogSourceAndPrivateFieldVO [logSourceAndAgent=" + logSourceAndAgent
				+ ", privateFields=" + privateFields + "]";
	}

}
