package tc.cama.aweb.service.agentManager;

import java.util.List;
import java.util.Map;

public interface IAgentManage {

	Map<String, Object> execute(List<String> ip, String opType, Map<String, Object> params) throws Exception;
}
