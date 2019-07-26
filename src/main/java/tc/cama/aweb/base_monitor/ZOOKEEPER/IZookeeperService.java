package tc.cama.aweb.base_monitor.ZOOKEEPER;

import java.util.List;
import java.util.Map;

public interface IZookeeperService {
	/**
	 * 获取Zookeeper汇总页面信息集群列表
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getClusterForm();
	/**
	 * 获取Zookeeper汇总页面信息某个集群的详细服务信息
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> getServerDetail(String ObjectId) ;
}
