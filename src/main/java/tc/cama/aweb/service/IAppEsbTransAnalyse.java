package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.bean.PageEsbTransAnalyse;
import tc.cama.aweb.bean.PageEsbTransError;
import tc.cama.aweb.bean.PageEsbTransTop;
import tc.cama.aweb.esb.model.AimEsbMonMsext1;

public interface IAppEsbTransAnalyse {
	/**
	 * 
	 * @param appId
	 * @return
	 */
	PageEsbTransAnalyse getAppAnalyse(Long appId) throws Exception;

	/**
	 * 
	 * @param appId
	 * @param intenal
	 * @return
	 * @throws Exception
	 */
	PageEsbTransAnalyse getEcharErrNum(Long appId, int time,int interval) throws Exception;

	/**
	 * 
	 * @param appId
	 * @param top
	 * @return
	 * @throws Exception
	 */
	PageEsbTransTop getTop(Long appId, int top) throws Exception;

	/**
	 * 获取流水错误信息以及错误码发生的次数
	 * 
	 * @param appId
	 * @param top
	 * @return
	 * @throws Exception
	 */
	List<PageEsbTransError> getErrorInfo(Long appId, int top) throws Exception;

	/**
	 * 获取流水错误发生次数的echar
	 * 
	 * @param errorCode
	 * @param intenal
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getErrorCountEchar(String errorCode, int time,int interval) throws Exception;

	/**
	 * 获取实时echarts系统错误笔数和业务错误笔数
	 * 
	 * @param appId
	 * @return
	 * @throws Exception
	 */
	PageEsbTransAnalyse getCurrEcharErrNum(Long appId) throws Exception;
	
	/**
	 * 获取实时echarts错误次数
	 * 
	 * @param errorCode
	 * @param time
	 * @param interval
	 * @return
	 * @throws Exception
	 */
	Map<String, List<String>> getCurrErrorCountEchar(String errorCode) throws Exception;
	
	/**
	 * 标签切换
	 * @param appId
	 * @param top
	 * @param mon_type
	 * @return
	 * @throws Exception 
	 */
	List<AimEsbMonMsext1> getConsuProv(Long appId, int top,int mon_type) throws Exception;

}
