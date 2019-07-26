package tc.cama.aweb.service;

import java.util.List;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.cama.aweb.bean.AimlAbnormal;

public interface IAppAbnormalLog {
	
    /** 统计当日异常日志信息
	 * 
	 * @param appId
	 * @return
	 */
	public List<AimlAbnormal> statCurrDayAbnormal(Long appId) throws Exception;
	
	/**
	 * 查询当日异常日志
	 * 
	 * @param appId
	 * @param path
	 * @param pageable
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public Page<JSONObject> pageQueryCurrDayAbnormalLogs(
			Long appId, String serilano, Pageable pageable) throws Exception;

}
