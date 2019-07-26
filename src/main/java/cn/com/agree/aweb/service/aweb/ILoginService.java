package cn.com.agree.aweb.service.aweb;

import java.text.ParseException;

import tc.cama.aweb.model.AwebUser;

public interface ILoginService {

	/**
	 * 登录操作
	 * @return
	 * @throws Exception 
	 */
	public String signIn(String username, String password) throws Exception;
	
	/**
	 * 退出操作
	 * @param sid
	 */
	public void signOut(String sid);
	
	/**
	 * 修改密码
	 * @param username
	 * @throws ParseException 
	 */
	public String doEditUser(String oldPassword,String username, String password) throws ParseException;

	/**
	 * 判断用户是否存在
	 * @param username
	 * @return
	 * @throws Exception
	 */
	String userIfExist(String username) throws Exception;
	
	/**
	 * 根据用户ID获取用户
	 * @param id
	 * @return
	 */
	AwebUser getUserById(Integer id);
	
}
