package tc.cama.aweb.service;

import java.util.List;
import java.util.Map;

import tc.cama.aweb.model.AimComponentPages;
import tc.cama.aweb.model.AwebUser;
import tc.cama.aweb.model.AwebUserGroup;
public interface IComponentPage {
	/**
	 * 查询自己创建的页面
	 * @param username
	 * @return
	 */
    public Object queryListNew(String username);
    /**
	 * 查询所有的页面
	 * @param username
	 * @return
	 */
    public Object queryList(String username,String groupId);
    /**
     * 查询所有用户组
     * @return
     */
    public List<AwebUserGroup> getGroups();
    /**
     *新增配置
     * @return
     */
    public String save(AimComponentPages page);
    /**
     *刪除配置
     * @return
     */
    public String delete(String id);
    /**
     * 查询分享列表
     * @param username
     * @return
     */
    public List<Map<String,Object>> getShareList(AwebUser user);
    /**
     * 新增或者删除分享列表
     * @param pageId
     * @param flag
     * @param usernames
     * @return
     */
    public String saveOrDeleteShare(List<String> addPageIds,List<String> delPageIds,String username);
    /**
     * 查询单个配置页面
     * @param pageId
     * @return
     */
    public AimComponentPages querySinglePage(String pageId);
    /**
     * 修改或者分享给组
     * @param groupId
     * @return
     */
    public String  saveShare(String pageId,String groupId);
}
