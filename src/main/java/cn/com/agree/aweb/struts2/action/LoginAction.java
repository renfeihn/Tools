/*package cn.com.agree.aweb.struts2.action;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.cluster.login.LoginEntryController;
import cn.com.agree.aweb.exception.AWebException;
import cn.com.agree.aweb.exception.DBSupportException;
import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.hibernate.dao.AWebUserVO;
import cn.com.agree.aweb.platform.access.AccessService;
import cn.com.agree.aweb.session.HttpSessionContainer;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.CommonUtils;
import cn.com.agree.aweb.util.DES;

*//**
 * 处理用户登陆登出操作
 *
 * @author lihao lihao01@cfischina.com
 * Jul 23, 2015
 *//*
@Component("LoginActionBean")
public class LoginAction extends StandardActionSupport {

	private static final long serialVersionUID = -8533108998596715258L;
	
	private String username;
	private String password;
	private String sid;
	private String errortime;
	private StrutsMessage strutsMessage;
	
	*//**
	 * 登陆操作
	 * @return
	 * @throws Throwable 
	 *//*
	public String signIn() {
		
		HttpSession session = getRequest().getSession(true);
		HttpSessionContainer.putSession(session);
		strutsMessage = StrutsMessage.successMessage();
		return SUCCESS;

//
//		String encPassword = DES.getEncString(password);
//		
//		//登陆成功时，检查该用户是否在别处登陆，若存在则登出原用户
//		AWebUserVO userVO;
//		try {
//			if ((userVO = checkpassword(username, encPassword)) != null) {
//				
//				if(userVO.getState().equals(Constants.DB_AGREEUSER_STATE_2)){
//					//已被锁定时
//					strutsMessage = StrutsMessage.errorMessage("此帐号已锁定，请联系管理员解锁！ ");
//				}else{
//					LoginEntryController.addUser(username, getRequest(), dbOperation);
//					HttpSession session = getRequest().getSession(true);
//					HttpSessionContainer.putSession(session);
//					
//					updateLoginTime(userVO);
//					
////					AccessService.disposeUserAccess(userVO,dbOperation);
//					strutsMessage = StrutsMessage.successMessage();
//				}
//			} else {
//				//此帐号一段时间错误次数判断
//				userVO = (AWebUserVO) this.dbOperation.queryDataById(AWebUserVO.class, username);
//				if(userVO!=null){
//					if(userVO.getState().equals(Constants.DB_AGREEUSER_STATE_2)){
//						//已被锁定时
//						strutsMessage = StrutsMessage.errorMessage("此帐号已锁定，请联系管理员解锁！ ");
//					}else{
//						int olderrornum = Integer.valueOf(userVO.getContinuouserrornum()==null?"0":userVO.getContinuouserrornum());
//						userVO.setContinuouserrornum(String.valueOf((olderrornum+1)));
//						if(olderrornum+1>=Constants.USER_LOGIN_ERROR_MAX){	//锁定
//							userVO.setState(Constants.DB_AGREEUSER_STATE_2);
//							strutsMessage = StrutsMessage.errorMessage("您输入的用户名或密码错误，帐号已锁定，请联系管理员解锁！ ");
//						}else{
//							strutsMessage = StrutsMessage.errorMessage("您输入的用户名或密码错误，错误 "+(Constants.USER_LOGIN_ERROR_MAX-(olderrornum+1))+" 次后，此帐号将被锁定。");
//						}
//						this.dbOperation.updateSingleData(userVO);
//					}
//				}else{
//					strutsMessage = StrutsMessage.errorMessage("您输入的用户名不存在！ ");
//				}
//			}
//		} catch (AWebException e) {
//			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
//		} catch (DBSupportException e) {
//			strutsMessage = StrutsMessage.errorMessage(e.getMessage());
//		}
//		
//		return SUCCESS;
	}
	
	
	*//**
	 * 更新最后登陆时间
	 * @param userVO
	 *//*
	private void updateLoginTime(AWebUserVO userVO) {
		userVO.setLoginTime(CommonUtils.getNowTime());
		userVO.setContinuouserrornum(Constants.DB_AGREEUSER_CONTINUOUSERRORNUM_MIX);
		try {
			dbOperation.updateSingleData(userVO);
			
			//将当前用户名存入session
			getSession().setAttribute(Constants.SESSION_USERNAME, userVO.getUsername());
			getSession().setAttribute(Constants.SESSION_USERVO, userVO);
		} catch (DBSupportException e) {
        }
	}

	*//**
	 * 检查用户名密码
	 * @param username
	 * @param encPassword
	 * @return
	 * @throws AWebException 
	 * @throws Throwable 
	 *//*
	@SuppressWarnings("unchecked")
	private AWebUserVO checkpassword(String username, String encPassword) throws AWebException {
		List<AWebUserVO> userList = null;
		try {
			userList = (List<AWebUserVO>) dbOperation.queryDataByClass(AWebUserVO.class, 
					new String[]{"username","password"}, 
					new String[]{username, encPassword});
			
			if (userList.size() == 1) {
				return userList.get(0);
			}
		} catch (DBSupportException e) {
			handleException(ExceptionTypes.AWEB.AWEB50, e);
		}
		
		return null;
	}
	
	*//**
	 * 登出操作
	 * @return
	 *//*
	public String signOut() {
		if (getSession() != null) {
			String sessionId = sid == null ? getSession().getId() : sid;
			HttpSession session = HttpSessionContainer.removeSession(sessionId);
			if (session != null) 
				session.invalidate();
			
//			LoginEntryController.removeUser(sessionId, dbOperation);
		}else{
		    HttpSession session = HttpSessionContainer.removeSession(sid);
            if (session != null) 
                session.invalidate();
            
//            LoginEntryController.removeUser(sid, dbOperation);
		}
		
		strutsMessage = StrutsMessage.successMessage();
		
		return SUCCESS;
	}
	
	*//**
	 * 重定向
	 * @return
	 *//*
	public String redirect() {
		if (getSession() != null && HttpSessionContainer.contains(getSession())){
			return "redirect";
		}
		
		return "login";
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public StrutsMessage getStrutsMessage() {
		return strutsMessage;
	}

	public void setStrutsMessage(StrutsMessage strutsMessage) {
		this.strutsMessage = strutsMessage;
	}

	public String getErrortime() {
		return errortime;
	}

	public void setErrortime(String errortime) {
		this.errortime = errortime;
	}
}
*/