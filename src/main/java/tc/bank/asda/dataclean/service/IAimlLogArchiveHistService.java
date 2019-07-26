package tc.bank.asda.dataclean.service;

import java.util.List;
import java.util.Map;

import tc.bank.asda.dataclean.model.AimlLogArchiveHist;

public interface IAimlLogArchiveHistService {

	long add(AimlLogArchiveHist aimlLogArchiveHist);
	
	boolean del(long id);
	
	boolean update(AimlLogArchiveHist aimlLogArchiveHist); 
	
	List<AimlLogArchiveHist> getByDataType(int dataType);
	
	AimlLogArchiveHist getById(long id);
	
	
	List<Map<String,Object>> getAll(Map<String,Object> whereEx);
	
	/**
	 * 功能说明：测试是否能连接成功
	 * @param transType
	 * @param ip
	 * @param userName
	 * @param password
	 * @return
	 */
	Map<String,Object> testLogin(Integer transType, String ip, String userName, String password);
	
	
	List<Map<String,Object>> getTaskLogList();
}
