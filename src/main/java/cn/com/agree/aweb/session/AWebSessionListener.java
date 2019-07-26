package cn.com.agree.aweb.session;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * 监听web容器的会话，实现HttpSessionListener接口
 *
 * @author lihao lihao01@cfischina.com
 * Jul 23, 2015
 */
public class AWebSessionListener implements HttpSessionListener {

	/*
	 * (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionCreated(javax.servlet.http.HttpSessionEvent)
	 */
	@Override
	public void sessionCreated(HttpSessionEvent event) {
	}

	/*
	 * (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionDestroyed(javax.servlet.http.HttpSessionEvent)
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		//监听到session销毁时，检查Container中是否还存在该session，有则移除
		HttpSessionContainer.removeSession(session);
	}

}
