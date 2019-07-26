package tc.bank.asda.logconfig.bean;

import java.util.List;

public class AimConfigInfoTab {

	private List<AimConfigDictVO> dictVOList;
	private AimConfigSplitVO splitVO;
	
	public List<AimConfigDictVO> getDictVOList() {
		return dictVOList;
	}
	public void setDictVOList(List<AimConfigDictVO> dictVOList) {
		this.dictVOList = dictVOList;
	}
	public AimConfigSplitVO getSplitVO() {
		return splitVO;
	}
	public void setSplitVO(AimConfigSplitVO splitVO) {
		this.splitVO = splitVO;
	}
}
