package tc.bank.asda.logtrace.service;

import java.util.List;
import java.util.Map;

public interface LogChainService {

	List<List<Map<String, Object>>> getChain(String appid, String pid,
			String start);

}
