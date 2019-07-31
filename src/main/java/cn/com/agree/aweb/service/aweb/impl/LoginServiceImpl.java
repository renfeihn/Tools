package cn.com.agree.aweb.service.aweb.impl;

import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.service.aweb.ILoginService;
import cn.com.agree.aweb.session.HttpSessionContainer;
import cn.com.agree.aweb.util.CommonUtils;
import cn.com.agree.aweb.util.DES;
//import tc.bank.common.db.IDbService;
//import tc.cama.aweb.model.AwebUser;

public class LoginServiceImpl implements ILoginService {

	/**
	 * 
	 */
	private static final Logger log = LoggerFactory.getLogger(LoginServiceImpl.class);

//	private IDbService dbService;
//
//	public IDbService getDbService() {
//		return dbService;
//	}
//
//	public void setDbService(IDbService dbService) {
//		this.dbService = dbService;
//	}

	@Override
	public String signIn(String username, String password) throws Exception {
		JSONObject whereEx = new JSONObject();
		JSONObject updateData = new JSONObject();
		String errorMsg = "";
		String encPassword = DES.getEncString(password);

		HttpSession session = getRequest().getSession(true);
		HttpSessionContainer.putSession(session);

        return "";

		// 登陆成功时，检查该用户是否在别处登陆，若存在则登出原用户
//		AwebUser userVO;
//		if ((userVO = checkpassword(username, encPassword)) != null) {
//			if (userVO.getState().equals(Constants.DB_AGREEUSER_STATE_2)) {// 已被锁定时
//				errorMsg = "此帐号已锁定，请联系管理员解锁！ ";
//			} else {
//				// LoginEntryController.addUser(username, getRequest(),
//				// dbService);
////				HttpSession session = getRequest().getSession(true);
////				HttpSessionContainer.putSession(session);
//				updateLoginTime(userVO);
//				// AccessService.disposeUserAccess(userVO,dbOperation);
//				errorMsg = "";
//			}
//		} else {
//			// 此帐号一段时间错误次数判断
//			whereEx.put("username", username);
//			userVO = dbService.queryAsBean(AwebUser.class, whereEx);
//			if (userVO != null) {
//				if (userVO.getState() == Constants.DB_AGREEUSER_STATE_2) {// 已被锁定时
//					errorMsg = "此帐号已锁定，请联系管理员解锁！ ";
//				} else {
//					int olderrornum = userVO.getContinuousErrorNum();
//					updateData.put("continuousErrorNum", olderrornum + 1);
//					if (olderrornum + 1 >= Constants.USER_LOGIN_ERROR_MAX) { // 锁定
//						updateData.put("state", Constants.DB_AGREEUSER_STATE_2);
//						errorMsg = "您输入的用户名或密码错误，帐号已锁定，请联系管理员解锁！ ";
//					} else {
//						errorMsg = "您输入的用户名或密码错误，错误 " + (Constants.USER_LOGIN_ERROR_MAX - (olderrornum + 1))
//								+ " 次后，此帐号将被锁定。";
//					}
//					dbService.updateWithDict(AwebUser.class, updateData, whereEx);
//				}
//			} else {
//				errorMsg = "您输入的用户名不存在！ ";
//			}
//		}
//		return errorMsg;
	}

	@Override
	public String userIfExist(String username) throws Exception {
		String errorMsg = "";
		// 登陆成功时，检查该用户是否在别处登陆，若存在则登出原用户
//		AwebUser userVO;
//		if ((userVO = checkUserExist(username)) != null) {
//			if (userVO.getState().equals(Constants.DB_AGREEUSER_STATE_2)) {// 已被锁定时
//				errorMsg = "此帐号已锁定，请联系管理员解锁！ ";
//			} else {
//				// LoginEntryController.addUser(username, getRequest(),
//				// dbService);
//				HttpSession session = getRequest().getSession(true);
//				HttpSessionContainer.putSession(session);
//				updateLoginTime(userVO);
//				// AccessService.disposeUserAccess(userVO,dbOperation);
//				errorMsg = "";
//			}
//		} else {
//			errorMsg = "您输入的用户名不存在！ ";
//		}
		return errorMsg;
	}

	/**
	 * 获取HttpServletRequest
	 * 
	 * @return
	 */
	protected HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	/**
	 * 获取HttpServletResponse
	 * 
	 * @return
	 */
	protected HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * 获取本次会话HttpSession
	 * 
	 * @return
	 */
	protected HttpSession getSession() {
		return getRequest().getSession(false);
	}

	@Override
	public void signOut(String sid) {
		if (getSession() != null) {
			String sessionId = sid == null ? getSession().getId() : sid;
			HttpSession session = HttpSessionContainer.removeSession(sessionId);
			if (session != null)
				session.invalidate();
		} else {
			HttpSession session = HttpSessionContainer.removeSession(sid);
			if (session != null)
				session.invalidate();
		}
	}

	@Override
	public String doEditUser(String oldPassword, String username, String password) throws ParseException {
		JSONObject whereEx = new JSONObject();
		JSONObject updateData = new JSONObject();
		String errorMsg = "";
//		if (username != null && !username.equals("")) {
//			whereEx.put("username", username);
//			AwebUser vo = dbService.queryAsBean(AwebUser.class, whereEx);
//			if (vo != null) {
//				if (password != null && !username.equals("")) {
//					if (vo.getPassword().equals(DES.getEncString(oldPassword))) {
//						if (!vo.getPassword().equals(DES.getEncString(password))) {
//							updateData.put("password", DES.getEncString(password));
//							updateData.put("updateTime", CommonUtils.getDateTime());
//							if (dbService.updateWithDict(AwebUser.class, updateData, whereEx) == 0) {
//								errorMsg = "密码修改失败";
//							} else {
//								log.info("修改用户密码", username + "成功");
//							}
//						} else {
//							errorMsg = "密码不能和原密码相同！";
//						}
//					} else {
//						errorMsg = "旧密码输入有误";
//					}
//				} else {
//					errorMsg = "密码不符合格式";
//				}
//			} else {
//				errorMsg = "用户不存在！";
//			}
//		} else {
//			errorMsg = "用户不存在！";
//		}

		log.error("修改用户密码", username + "失败");
		return errorMsg;
	}

	/**
	 * 检查用户名密码
	 * 
	 * @param username
	 * @param encPassword
	 * @return
	 * @throws AWebException
	 * @throws Throwable
	 */
//	private AwebUser checkpassword(String username, String encPassword) throws AWebException {
//		JSONObject whereEx = new JSONObject();
//		whereEx.put("username", username);
//		whereEx.put("password", encPassword);
//		return dbService.queryAsBean(AwebUser.class, whereEx);
//	}

	/**
	 * 检查是否存在该用户
	 * 
	 * @param username
	 * @return
	 * @throws AWebException
	 */
//	private AwebUser checkUserExist(String username) throws AWebException {
//		JSONObject whereEx = new JSONObject();
//		whereEx.put("username", username);
//		return dbService.queryAsBean(AwebUser.class, whereEx);
//	}

	/**
	 * 更新最后登陆时间
	 * 
	 * @param userVO
	 * @throws ParseException
	 */
//	private void updateLoginTime(AwebUser userVO) throws ParseException {
//		JSONObject whereEx = new JSONObject();
//		JSONObject updateData = new JSONObject();
//		updateData.put("loginTime", CommonUtils.getDateTime());
//		updateData.put("continuousErrorNum", Constants.DB_AGREEUSER_CONTINUOUSERRORNUM_MIX);
//		whereEx.put("username", userVO.getUsername());
//		dbService.updateWithDict(AwebUser.class, updateData, whereEx);
//		// 将当前用户名存入session
//		getSession().setAttribute(Constants.SESSION_USERNAME, userVO.getUsername());
//		getSession().setAttribute(Constants.SESSION_USERVO, userVO);
//	}

//	@Override
//	public AwebUser getUserById(Integer id) {
//		JSONObject whereEx = new JSONObject(1);
//		whereEx.put("id", id);
//		return dbService.queryAsBean(AwebUser.class, whereEx);
//	}
}
