package tc.bank.asda.logconfig.service;

import java.util.List;

import tc.bank.asda.logconfig.model.AimlSplitMethod;
import tc.bank.asda.logconfig.model.AimlSplitMethodParam;

public interface IAimlSplitMethodService {
	/**
	 * 获取方法列表
	 * @param type
	 * @return
	 */
	List<AimlSplitMethod> getMethod(int type);
	/**
	 * 获取方法参数
	 * @param methodId
	 * @return
	 */
	List<AimlSplitMethodParam> getMethodParams(long methodId);
	
	/**
	 * 字符串转正则
	 * @param str
	 * @return
	 */
	String analysisRegex(String str);
	/**
	 * 获取正则匹配结果
	 * @param regex
	 * @param str
	 * @param logEvent正则表达式
	 * @return
	 */
	List<String> getRegexMatch(String regex, String str,String logEventRegex);
	/**
	 * 获取手动编辑的拆分结果
	 * @param scriptName
	 * @param script
	 * @param str
	 * @param logEvent正则表达式
	 * @return
	 */
	List<String> getCodeMatch(String scriptName,String script, String str,String logEventRegex);
	/**
	 * 获取函数表达式
	 * @param methodId
	 * @param values
	 * @return
	 */
	String getFieldScript(long methodId,Object[] values);
}
