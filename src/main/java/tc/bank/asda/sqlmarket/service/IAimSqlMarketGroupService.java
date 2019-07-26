package tc.bank.asda.sqlmarket.service;

import java.util.List;
import java.util.Map;

public interface IAimSqlMarketGroupService {
	
	public void addGroup(int sqlId, int... userId);

	void delOne(long id);

	void addComments(int sqlId, String comments, int fromUserId);

	List<Map<String, Object>> getAllComments(int sqlId, int userId);

	List<Map<String, Object>> getAllGroupMember(int sqlId, int userId);
	
	List<Map<String, Object>> getAddMemeber(int sqlId);
	
	void addAttachment(String attachmentUrl, int id);
	
	List<Map<String, Object>> getCommentsNum(int sqlId);
}
