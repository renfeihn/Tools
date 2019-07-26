package tc.cama.aweb.service;

import tc.bank.cama.core.bean.AppEventPreview;

/**
 * 应用
 * @author huangjun
 *
 */
public interface IAppEventView {

	/**
	 * 事件数据查询
	 * @param appId 应用id
	 * @return
	 */
	public AppEventPreview getEventData(int appId, int interval, int periodTime,String username);
}
