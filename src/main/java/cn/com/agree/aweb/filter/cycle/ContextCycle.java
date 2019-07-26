package cn.com.agree.aweb.filter.cycle;

import javax.servlet.ServletContext;

/**
 * 周期
 *
 * @author lihao lihao01@cfischina.com
 * Apr 24, 2015
 */
public interface ContextCycle {
	/**
	 * 初始化
	 * 
	 * @param servletContext
	 */
	public void initialize(ServletContext servletContext);
	
	/**
	 * 销毁
	 * 
	 * @param servletContext
	 */
	public void destroy(ServletContext servletContext);
}
