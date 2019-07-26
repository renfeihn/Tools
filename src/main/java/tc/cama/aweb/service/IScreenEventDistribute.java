package tc.cama.aweb.service;

import java.util.List;

import tc.bank.cama.core.service.alert.EventConstants.EventDealStatus;
import tc.bank.cama.core.service.alert.EventConstants.EventType;
import tc.cama.aweb.bean.PageScreenEventBean;

public interface IScreenEventDistribute {
	
	/**
	 * 按照对象类型列表获取对象健康度
	 * @param CategoryList
	 * @return
	 * @throws Exception
	 */
	List<PageScreenEventBean> getHealthyByListCategory(List<Integer> CategoryNoList) throws Exception;
	
	/**
	 * 按照对象类型列表获取cmdb监控资源数
	 * @param CategoryList
	 * @return
	 * @throws Exception
	 */
	List<PageScreenEventBean> getCmdbCountByListCategory(List<Integer> CategoryNoList) throws Exception;

	/**
	 * 按照对象类型列表获取未解决事件数
	 * @param CategoryList
	 * @param EvetnType 事件类型 
	 * 
	 * @return
	 * @throws Exception
	 */
	List<PageScreenEventBean> getCategoryEventByListCategory(List<Integer> CategoryNoList,EventType eventType,EventDealStatus dealStatus) throws Exception;

}
