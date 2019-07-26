package tc.bank.asda.sqlmarket.service;

import java.util.List;
import java.util.Map;


public interface IAimSqlMarketDynamicStateService {
	
	List<Map<String, Object>> getAllState(int sqlId,  int type);
	
	List<Map<String, Object>> getBasicInfo(int sqlId, int userId);
}
