package cn.com.agree.aweb.cluster.login;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.session.HttpSessionContainer;

/**
 * 用户登陆控制
 * 
 * 当用户登录时检测到该用户已在登陆状态，则强制签退上一次登陆会话
 * 支持多节点集群
 *
 * @author lihao lihao01@cfischina.com
 * Jul 23, 2015
 */
public class LoginEntryController {

	private final static String HTTPHEAD = "http://";
	private final static String REQUEST_URI = "LoginAction_signOut.do";
	
	private static final Logger log = LoggerFactory.getLogger(LoginEntryController.class);
	
//	/**
//	 * 
//	 * @param username
//	 * @param httpServletRequest 
//	 */
//	public static void addUser(String username, HttpServletRequest request, StandardDbSupport dbOperation) {
//		
//		AWebUserLoginVO userOnline = null;
//		try {
//			userOnline = (AWebUserLoginVO) dbOperation.queryDataById(AWebUserLoginVO.class, username);
//		} catch (DBSupportException e) {
//			log.error("", e);
//			return;
//		}
//		
//		//若无在线用户，则直接入库
//		if (userOnline == null) {
//			userOnline = new AWebUserLoginVO();
//			userOnline.setUsername(username);
//			userOnline.setSessionId(request.getSession().getId());
//			userOnline.setLastHost(getServerAddr());
//			
//			try {
//				dbOperation.saveSingleData(userOnline);
//			} catch (DBSupportException e) {
//				log.error("", e);
//			}
//			
//			return;
//		}
//		
//		String serverAddr = getServerAddr();
//		//如果本次登陆和上次登陆在同一台服务器
//		if (userOnline.getLastHost().equals(serverAddr)) {
//			HttpSession session = HttpSessionContainer.removeSession(userOnline.getSessionId());
//			
//			if (session != null) 
//				session.invalidate();
//		} else {
//		    String contextName = request.getServletContext().getServletContextName();
//			String requestURL = HTTPHEAD + userOnline.getLastHost() + "/" + contextName + "/" +
//					REQUEST_URI + "?" + Constants.AWEB_SESSIONID + "=" + userOnline.getSessionId();
//			new AsyncHttpService(requestURL).start();
//		}
//		
//		userOnline.setSessionId(request.getSession().getId());
//		userOnline.setLastHost(getServerAddr());
//		try {
//			dbOperation.updateSingleData(userOnline);
//		} catch (DBSupportException e) {
//			;
//		}
//	}
//	
//	/**
//	 * 
//	 * @param sid
//	 * @param dbOperation
//	 */
//	@SuppressWarnings("unchecked")
//	public static void removeUser(String sid, StandardDbSupport dbOperation) {
//		List<AWebUserLoginVO> stateList;
//		try {
//			stateList = (List<AWebUserLoginVO>) dbOperation.queryDataByClass(AWebUserLoginVO.class, 
//					new String[] {"sessionId"}, 
//					new String[] {sid});
//			
//			if (stateList.size() > 0) 
//				dbOperation.deleteDatasByCollection(stateList);
//		} catch (DBSupportException e) {
//			log.error("", e);
//		}
//		
//	}

	/**
	 * 获取
	 * @return
	 */
	private static String getServerAddr() {
	    
	    String ServerAddr = (String) Constants.getGlobalParam("ServerAddr");
	    String ServerPort = (String) Constants.getGlobalParam("ServerPort");
		return (ServerAddr == null?"localhost":ServerAddr) + ":" + (ServerPort == null?"8080":ServerPort);
		
	}
}
