package cn.com.agree.aweb.filter.registry;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.filter.cycle.ContextCycle;

/**
 * 注册器
 *
 * @author lihao lihao01@cfischina.com
 * Apr 24, 2015
 */
public class ContextCycleRegistry {
	
	private List<ContextCycle> cycleLst;
	private ServletContext servletContext;
	private List<String> classLst;
	private Map<String, String> paramMap;
	
	public ContextCycleRegistry(List<String> classLst, Map<String, String> paramMap) {
		this.classLst = classLst;
		this.paramMap = paramMap;
	}
	
	/**
	 * 创建并执行实例
	 * 
	 * @param servletContext
	 */
	public void regist(ServletContext servletContext) {
		this.servletContext = servletContext;
		
		if(cycleLst == null) {
			cycleLst = new ArrayList<ContextCycle>();
		}
		
		Set<String> paramKeySet = paramMap.keySet();
		for(Iterator<String> iterator = paramKeySet.iterator(); iterator.hasNext();) {
			String name = iterator.next();
			
			Constants.setGlobalParam(name, paramMap.get(name));
		}
		
		for(int i = 0, size = classLst.size(); i < size; i++) {
			invokeCycle(classLst.get(i));
		}
	}
	
	/**
	 * invokeCycle
	 * 
	 * @param className
	 */
	private void invokeCycle(String className) {
		try {
			Class<?> cls = Class.forName(className);
			
			boolean isCycleImpl = isImpl(cls.getInterfaces(), ContextCycle.class);
			if(!isCycleImpl) {
				return;
			}
			
			ContextCycle cycle = (ContextCycle) cls.newInstance();
			cycle.initialize(servletContext);
			
			cycleLst.add(cycle);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 销毁所有已注册的ContextCycle
	 * 
	 * @param servletContext
	 */
	public void destroyAll(ServletContext servletContext) {
		if(cycleLst == null) {
			return;
		}
		for(ContextCycle cycle: cycleLst) {
			cycle.destroy(servletContext);
		}
	}
	
	/**
	 * isImpl
	 * 
	 * @param interfaces
	 * @param cls
	 * @return
	 */
	private boolean isImpl(Class<?>[] interfaces, Class<?> cls) {
		for(int i = 0, length = interfaces.length; i < length; i++) {
			if(interfaces[i] == cls) {
				return true;
			}
		}
		return false;
	}
	
}
