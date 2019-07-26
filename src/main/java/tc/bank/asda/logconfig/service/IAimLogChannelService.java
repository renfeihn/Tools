package tc.bank.asda.logconfig.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.logconfig.bean.AimLogChannelInfo;
import tc.bank.asda.logconfig.model.AimLogChannelBase;
public interface IAimLogChannelService {

	/**
	 * 保存日志通道信息
	 * @param channelInfo
	 * @return
	 */
	String saveLogChannelByBean(AimLogChannelInfo channelInfo);
	
	/**
	 * 根据ID查询通道列表
	 * @param ObjectId
	 * @return
	 */
	List<AimLogChannelBase> getLogChannelByObjectId(String objectId);
	
	/**
	 * 根据ID统计通道以及消息中间件数量
	 * @param objectId
	 * @return
	 */
	Map<String, Integer> getLogChannelCountByObjectId(String objectId) throws Exception;
}
