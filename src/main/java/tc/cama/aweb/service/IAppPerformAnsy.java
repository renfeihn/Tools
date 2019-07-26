package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.AppPerformAnsBean;
import tc.cama.aweb.bean.FiveStates;
import tc.cama.aweb.bean.SoftWareDeployBean;
import tc.cama.aweb.esb.model.AimEsbMonMsext5;

/**
 * esb 应用性能， 性能分析
 * 
 * @author zhangkun
 *
 */
public interface IAppPerformAnsy {
	/**
	 * 获取总交易数 ，昨日同比， 系统异常笔数， 响应率，成功率， 5分钟环比，实时TPS 响应时间，空闲时间
	 * 
	 * @param objectId
	 * @param startTime
	 * @param endTime
	 * @param orderType
	 * @return
	 * @throws Exception
	 */
	AppPerformAnsBean getAPMPerformance(int timeBlock, int timeJianGe, Long objectId) throws Exception;

	/**
	 * 获取实时tps 响应率 成功率 相应时间
	 * 
	 * @param timeBlock
	 * @param timeJianGe
	 * @param objectId
	 * @return
	 * @throws Exception
	 */

	Object curTimeTPS(int timeBlock, int timeJianGe, Long objectId) throws Exception;

	/**
	 * 获取实时的tps 的最后一个点
	 * 
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	AppPerformAnsBean getLastAPMPerformance(Long objectId) throws Exception;

	/**
	 * 获取系统的软件部署信息， 实时响应率， 实时TPS， 实时成功笔， 实时响应时间
	 * 
	 * @param appId
	 * @return
	 * @throws Exception
	 */
	List<SoftWareDeployBean> getAppCurPerformByAppID(long appId) throws Exception;

	/**
	 * 返回5分钟响应率，成功率，相应时间
	 * 
	 * @param appId
	 * @return
	 * @throws Exception
	 */
	FiveStates getFiveStates(Long appId, int temeBlock, int interval) throws Exception;
	FiveStates getFiveStates(Long appId) throws Exception;
	/**
	 * 获取实时tps 响应率 成功率 相应时间
	 * 
	 * @param timeBlock
	 * @param timeJianGe
	 * @param objectId
	 * @return
	 * @throws Exception
	 */
	Object curTimeState(int timeBlock, int timeJianGe, long appId, long objectId, String objName) throws Exception;
	Object curTimeState( long appId, long objectId, String objName) throws Exception;
	
	/**
	 * 根据监控类型和对象获取5分钟数据进行原因分析
	 * @param monType
	 * @param monitor
	 * @param statisticType
	 * @param orderType
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<AimEsbMonMsext5> reasonAnsy(int monType, long appId,
			int statisticType, int orderType, int top) throws Exception;
	
	
	
	
}
