package tc.bank.asda.sqlmarket.service;

import java.util.List;
import java.util.Map;

public interface IAimSqlMarketHotWordsService {
	
	public void add(int userId, String words);

	List<Map<String, Object>> getHotWords(int size);
	
}
