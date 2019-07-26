package cn.com.agree.aweb.util;

import org.apache.struts2.ServletActionContext;

import cn.com.agree.aweb.Constants;
import tc.cama.aweb.model.AwebUser;

/**
 * @Description:操作权限、实例权限工具类 
 * @Title: AccessUtil.java 
 * @Package cn.com.agree.aweb.util 
 * @author Athrun tang.pm@cfischina.com
 * @date 2015年9月16日 上午11:47:02 
 * @version V1.0
 */
public class AccessUtil {
	
	/**
	 * @Description:根据实例ID 判断此用户是否有权限 
	 * @author Athrun tang.pm@cfischina.com
	 * @date 2015年9月16日 下午3:26:20 
	 * @version V1.0
	 */
	public static boolean jugeInstanceAccess(String id) {
		AwebUser user = (AwebUser)ServletActionContext.getRequest().getSession().getAttribute(Constants.SESSION_USERVO);
		if(user.getUserType()==Constants.DB_AGREEUSER_TYPE_0){	
			//管理员
			return true;
		}else{
			String insIDS = (String) ServletActionContext.getRequest().getSession().getAttribute(Constants.SESSION_USER_INSTANCE_IDS);
			System.out.println(insIDS);
			if(insIDS.length()==0){
				return false;
			}else{
				String newinsIDS = ","+insIDS+",";
				return newinsIDS.indexOf(","+id+",")>=0 ;
			}
		}
	}
	
}
