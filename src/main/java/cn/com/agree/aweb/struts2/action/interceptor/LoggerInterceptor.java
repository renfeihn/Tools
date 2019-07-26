/**
 * 
 */
package cn.com.agree.aweb.struts2.action.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

import cn.com.agree.aweb.struts2.action.support.AimStandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.bean.SerialBean;
import cn.com.agree.logging.Logger;
import cn.com.agree.logging.LoggerFactory;

/**
 * 打印action日志
 * @author liyuansheng liyuansheng@agree.com.cn
 * 2016年10月21日
 */
public class LoggerInterceptor implements Interceptor{
	private static final long serialVersionUID = -6019345283404657246L;
	private static final Logger logger = LoggerFactory.getLogger(LoggerInterceptor.class);
	@Override
	public void destroy() {
		System.out.println("++++++++++++++++++++++++++日志拦截器销毁++++++++++++++++++++++++++");
		
	}
	@Override
	public void init() {
		System.out.println("++++++++++++++++++++++++++日志拦截器初始化++++++++++++++++++++++++++");
		
	}
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		AimStandardActionSupport action = (AimStandardActionSupport) invocation.getAction();
		SerialBean serialBean = action.getSerialBean();
		
		logger.info(serialBean.getSerialNoSdf()+"========================================action start========================================");
		logger.info(serialBean.getSerialNoSdf()+"java类路径为："+serialBean.getActionPath());
		logger.info(serialBean.getSerialNoSdf()+"请求的uri为："+serialBean.getActionURI());
		invocation.invoke();
		serialBean.setActionEndTime(System.currentTimeMillis());
		logger.info(serialBean.getSerialNoSdf()+"action stop:本次请求总耗时为"+(serialBean.getActionEndTime()-serialBean.getActionBeginTime())+"ms");
		return null;
	}
}
