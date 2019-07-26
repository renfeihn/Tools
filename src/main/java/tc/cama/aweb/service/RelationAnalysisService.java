package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

/**
 * 
 * 事件关联分析
 *
 */
public interface RelationAnalysisService {

	/**
	 * 获取与事件有强关联性的事件列表
	 * @param id
	 * 标的事件的记录ID
	 * @return
	 * <li> 若找不到<code>id</code>对应的事件, 返回null
	 * <li> 若<code>id</code>对应的事件没有关联事件, 返回id对应的事件本身
	 * <li> 否则, 返回关联的事件列表
	 * @throws Exception
	 */
	List<Map<String,Object>> getRelatedEvents(int eventId,int[] appIds) throws Exception;
	
	/**
	 * 
	 * @param id
	 * @param relatedEvents
	 * @return
	 */
	String getConclusion(int id, List<Map<String,Object>> relatedEvents);
}
