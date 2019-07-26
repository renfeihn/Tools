package tc.cama.aweb.esb.service;

import java.sql.SQLException;
import java.util.List;

import tc.cama.aweb.esb.model.AimEsbMonMsExtBean;
import tc.cama.aweb.esb.model.EsbSystem;

public interface IEsbMonMsext {
	public List<AimEsbMonMsExtBean> getEsbExtTopStatistic(String syscode,int serviceType,
			int statisticType, int orderType, int top) throws SQLException, Exception;
	public EsbSystem getEsbSystype(long appId) throws Exception;
	public List<EsbSystem> geteEsbSystems() throws Exception;
}
