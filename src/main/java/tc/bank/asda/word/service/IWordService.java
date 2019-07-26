package tc.bank.asda.word.service;

import java.util.List;

import com.aim.alibaba.fastjson.JSONArray;

import tc.bank.asda.word.modle.Word;

public interface IWordService {

	/**
	 * 获取SPL及SQL关键字提示
	 * @param module
	 * @return
	 */
	List<Word> getWord(String module);
	/**
	 * 查询结构化字段
	 * @param user
	 * @return
	 */
	JSONArray getStructWords(String user);
}
