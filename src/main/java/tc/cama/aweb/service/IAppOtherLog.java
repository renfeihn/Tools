package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.AimlOther;

public interface IAppOtherLog {
	
	    /** 统计当日其他日志信息
		 * 
		 * @param appId
		 * @return
		 */
		public List<AimlOther> statCurrDayOther(Long appId) throws Exception;

}
