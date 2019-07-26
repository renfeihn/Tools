package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;
import tc.bank.cama.core.bean.EventBo;
import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.bank.cama.core.service.alert.EventConstants.ItilStatus;
import tc.bank.common.core.Page;

public interface IEvent {
	Page<EventBo> getEventData(List<Integer> appIds,
			List<Integer> cmdbCateIdList, int page, int pageSize,
			EventType eventType, EventDealStatus dealStatus,
			List<String> propertyList, List<String> directionList,
			ItilStatus itilStatus, EventStatus eventStatus ,List<Integer> objectId) throws Exception;

	Map<Integer, String> getApplications() throws Exception;

	
	
	List<CmdbObjectCategory>  getObjectCategory() throws Exception;

	Map<String, String> getAppEventNum() throws Exception;

	List<Map<String, Object>> getEventListByAppId(Integer app_id)
			throws Exception;
}
