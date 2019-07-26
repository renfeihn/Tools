package tc.cama.aweb.service;

import java.util.List;

import tc.cama.aweb.bean.EsbErrCode;
import tc.cama.aweb.bean.PageAppAPMSummary;
import tc.cama.aweb.bean.PageEsbMsSysName;

/**
 * 应用性能总览
 * @author Win-User
 *
 */
public interface IAppPerformOverview {

	/**
	 * 汇总APM信息
	 */
	public PageAppAPMSummary getAPMSummary(int orderType) throws Exception;
	
	/**
	 * 服务排名TOP
	 * @throws Exception 
	 */
	public List<PageEsbMsSysName> getTopOfService(int top) throws Exception;
	
	/**
	 * 错误码TOP
	 */
	public List<EsbErrCode> getTopOfErrorCode(int top) throws Exception;
	/**
	 * 测试专用
	 * @param top
	 * @return
	 * @throws Exception
	 */
	public List<EsbErrCode> getTopOfErrorCode1(int top) throws Exception;
}
