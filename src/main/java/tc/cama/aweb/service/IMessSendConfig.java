package tc.cama.aweb.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IMessSendConfig {
	/**
	 * 新增用户
	 * @param username
	 * @param telPhone
	 * @param mail
	 * @param gid
	 * @param roleId
	 * @return
	 * @throws SQLException 
	 */
     int  addUser(String username,String telPhone,String mail,List<String> gids,String roleId) throws SQLException;
     /**
      * 删除用户
      * @param userId
      * @return
      */
     int  delUser(String userId);
     /**
      * 修改用户
      * @param userId
      * @param username
      * @param telPhone
      * @param mail
      * @param gid
      * @param roleId
      * @return
     * @throws SQLException 
      */
     int updateUser(String userId,String username,String telPhone,String mail,List<String> gids,String roleId) throws SQLException;
     /**
      * 新增组
      * @param platform
      * @param gname
      * @param gid
      * @return
     * @throws SQLException 
      */
     int addGroup(String platform,String gname,String gid,String roleId) throws SQLException;
     /**
      * 删除组
      * @param gid
      * @return
     * @throws SQLException 
      */
     int delGroup(String gid) throws SQLException;
     /**
      * 修改组
      * @param gid
      * @param platform
      * @param gname
      * @return
     * @throws SQLException 
      */
     int updateGroup(String gid,String platform,String gname,String roleId) throws SQLException;
     /**
      * 查询所有应用
      * @return
      */
     List<Map<String,Object>> queryAllApp();
     /**
      * 给用户新增应用
      * @param userId
      * @param appIds
      * @return
     * @throws SQLException 
      */
     int setUserApp(String userId,List<String> appIds) throws SQLException;
     /**
      * 给组绑定接收信息的用户
      * @param gid
      * @param roleId
      * @param userIds
      * @return
      */
     int setGroupUsers(String gid,String roleId,List<String> userIds);
     /**
      * 
      * @param gid
      * @return
      */
     List<Map<String,Object>> queryGroup(String gid);
     /**
      * 查询用户信息
      * @param userId
      * @return
      */
     Map<String, Object>  queryUserInfo(String userId);
     /**
      * 查询用户负责的系统
      * @param userId
      * @return
      */
     List<Map<String,Object>> queryUserAppInfo(String userId);
     /**
      * 给分组启动或者停止发短信
      * @param gid
      * @param flag 1open 0stop
      * @return
      */
     int groupSendOrStop(String gid,int flag);
      
}
