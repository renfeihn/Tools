package cn.com.agree.aweb.session;

import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

/**
 * 存储当前web容器中的会话
 *
 * @author lihao lihao01@cfischina.com
 * Jul 28, 2015
 */
public class HttpSessionContainer {
	
	/**
	 * 
	 */
	private static ConcurrentHashMap<String, HttpSession> sessions = new ConcurrentHashMap<String, HttpSession>();
	
	
	private HttpSessionContainer() {}
	
	/**
	 * 
	 * @param session
	 */
	public static void putSession(HttpSession session) {
		if (session == null)
			return;
		
		if (sessions.containsKey(session.getId()))
			return;
		
		sessions.put(session.getId(), session);
	}
	
	/**
	 * 
	 * @param id
	 */
	public static HttpSession removeSession(String id) {
		if (id != null && sessions.containsKey(id)) {
			return sessions.remove(id);
		}
		return null;
	}
	
	/**
	 * 
	 * @param session
	 */
	public static HttpSession removeSession(HttpSession session) {
		if (session != null) 
			return removeSession(session.getId());
		return null;
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	public static HttpSession getSession(String id) {
		if (id == null || !sessions.containsKey(id)) 
			return null;
		
		return sessions.get(id);
	}
	
	/**
	 * 
	 * @return
	 */
	public static int size() {
		return sessions.size();
	}
	
	/**
	 * 
	 * @param session
	 * @return
	 */
	public static boolean contains(HttpSession session) {
		return sessions.containsKey(session.getId());
	}
	
}
