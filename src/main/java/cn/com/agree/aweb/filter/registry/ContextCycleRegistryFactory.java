package cn.com.agree.aweb.filter.registry;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.DocumentException;
import org.dom4j.Element;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.util.XMLUtil;

/**
 * Registry工厂类
 *
 * @author lihao lihao01@cfischina.com
 * Apr 24, 2015
 */
public class ContextCycleRegistryFactory {
	
	/**
	 * 创建Registry
	 * 
	 * @param in
	 * @return
	 * @throws DocumentException
	 */
	public static ContextCycleRegistry createRegistry(InputStream in) throws DocumentException {
		Element root = XMLUtil.getRootElement(in);
		
		Element startupEle = root.element(Constants.REGISTRY_STARTUP);
		List<String> classLst = disposeClassesXML(startupEle);
		
		Element globalEle = root.element(Constants.REGISTRY_GLOBAL);
		Map<String, String> paramMap = disposeParamLst(globalEle);
		
		ContextCycleRegistry registry = new ContextCycleRegistry(classLst, paramMap);
		return registry;
	}
	
	/**
	 * 解析出全局参数list
	 * 
	 * @param globalEle
	 * @return
	 */
	private static Map<String, String> disposeParamLst(Element globalEle) {
		Map<String, String> paramMap = new HashMap<String, String>();
		
		@SuppressWarnings("unchecked")
		List<Element> paramEles = globalEle.elements(Constants.REGISTRY_INIT_PARAM);
		for(int i = 0, size = paramEles.size(); i < size; i++) {
			Element paramEle = paramEles.get(i);
			
			String name = paramEle.elementText(Constants.REGISTRY_PARAM_NAME);
			String value = paramEle.elementText(Constants.REGISTRY_PARAM_VALUE);
			
			paramMap.put(name, value);
		}
		
		return paramMap;
	}
	
	/**
	 * web服务器启动时加载执行的类
	 * 
	 * @param startupEle
	 * @return
	 */
	private static List<String> disposeClassesXML(Element startupEle) {
		List<String> classLst = new ArrayList<String>();
		
		@SuppressWarnings("unchecked")
		List<Element> classEles = startupEle.elements(Constants.REGISTRY_CLASS);
		for(int i = 0, size = classEles.size(); i < size; i++) {
			Element classEle = classEles.get(i);
			String className = classEle.attributeValue(Constants.REGISTRY_NAME);
			
			if(className != null && !className.trim().isEmpty()) {
				classLst.add(className);
			}
		}
		
		return classLst;
	}
	
}
