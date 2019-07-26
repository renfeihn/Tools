package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.Constants;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.model.AimComponentPages;
import tc.cama.aweb.model.AwebUser;
import tc.cama.aweb.model.AwebUserGroup;
import tc.cama.aweb.service.IComponentPage;

@Controller("ComponentPageBean")
@Scope("prototype")
public class ComponentPageAction extends StandardActionSupport implements ModelDriven<AimComponentPages> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String pageId;
	private AimComponentPages aimComponentPages=new AimComponentPages();
	private String flag;
	private List<String> usernames=new ArrayList<String>();
	private String groupId;
	private String groupIds;
	private List<String> pageIds=new ArrayList<String>();
	private List<String> addPageIds=new ArrayList<String>();
	private List<String> delPageIds=new ArrayList<String>();
	@Autowired
	IComponentPage componentPage;
  
	

	public String getPageId() {
		return pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public AimComponentPages getAimComponentPages() {
		return aimComponentPages;
	}

	public void setAimComponentPages(AimComponentPages aimComponentPages) {
		this.aimComponentPages = aimComponentPages;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public List<String> getUsernames() {
		return usernames;
	}

	public void setUsernames(List<String> usernames) {
		this.usernames = usernames;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public List<String> getPageIds() {
		return pageIds;
	}

	public void setPageIds(List<String> pageIds) {
		this.pageIds = pageIds;
	}

	public String getGroupIds() {
		return groupIds;
	}

	public void setGroupIds(String groupIds) {
		this.groupIds = groupIds;
	}

	public List<String> getAddPageIds() {
		return addPageIds;
	}

	public void setAddPageIds(List<String> addPageIds) {
		this.addPageIds = addPageIds;
	}

	public List<String> getDelPageIds() {
		return delPageIds;
	}

	public void setDelPageIds(List<String> delPageIds) {
		this.delPageIds = delPageIds;
	}

	public String queryListNew() {
		AwebUser user = (AwebUser) (this.getSession().getAttribute(Constants.SESSION_USERVO));
		Object pagesNew = componentPage.queryListNew(user.getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("pagesNew", pagesNew));
		return SUCCESS;
	}

	public String groups() {
		AwebUser user = (AwebUser) (this.getSession().getAttribute(Constants.SESSION_USERVO));
		List<AwebUserGroup> groups = componentPage.getGroups();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("groups", groups).addParameter("curGroupid",
				user.getUsergroup()));
		return SUCCESS;
	}

	public String delete() {
		// AwebUser
		// user=(AwebUser)(this.getSession().getAttribute(Constants.SESSION_USERVO));
		String result = componentPage.delete(pageId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
	}

	public String save() {
		 AwebUser
		 user=(AwebUser)(this.getSession().getAttribute(Constants.SESSION_USERVO));
		aimComponentPages.setCreateuser(user.getCreateUser());
		this.aimComponentPages.setUpdatetime(new Date());
		this.aimComponentPages.setNickname(user.getNickname());
		String result = componentPage.save(aimComponentPages);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result).addParameter("pageId", aimComponentPages.getId()));
		return SUCCESS;
	}

	public String getShareList() {
		AwebUser user = (AwebUser) (this.getSession().getAttribute(Constants.SESSION_USERVO));
		List<Map<String, Object>> shareList = componentPage.getShareList(user);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("shareList", shareList));
		return SUCCESS;
	}
	public String queryList() {
		AwebUser user = (AwebUser) (this.getSession().getAttribute(Constants.SESSION_USERVO));
		Object list = componentPage.queryList(user.getUsername(),user.getUsergroup());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("list", list));
		return SUCCESS;
	}
   public String saveOrDeleteShare(){
	   AwebUser user = (AwebUser) (this.getSession().getAttribute(Constants.SESSION_USERVO));
	   String result="操作成功";
//	  pageIds.add("4");
//	  pageIds.add("5");
	   if((addPageIds!=null&&addPageIds.size()>0)||(delPageIds!=null&&delPageIds.size()>0)){
		  // for(String pageID:pageIds){
			   componentPage.saveOrDeleteShare(addPageIds, delPageIds, user.getUsername());
		  // }
	   }
	   //String result=
	   setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
		return SUCCESS;
   }
   public String querySinglePage(){
	    AimComponentPages result=componentPage.querySinglePage(pageId);
	    setStrutsMessage(StrutsMessage.successMessage().addParameter("page", result));
		return SUCCESS;
   }
   public String queryShareGroup(){
	   List<AwebUserGroup> groupss= componentPage.getGroups();
	   List<AwebUserGroup> hasGroupss= new ArrayList<AwebUserGroup>();
	   AimComponentPages result=componentPage.querySinglePage(pageId);
	   String gs=result.getSharegroup();
	   if(gs!=null){
		   String [] arg=gs.split(",");
		   if(arg!=null&&arg.length>0){
		   for(String s:arg){
			   for(AwebUserGroup grp:groupss){
			        if(s.equals(grp.getGroupid()+"")){
			        	hasGroupss.add(grp);
			       }
			   }
		   }
		   }
	   }
	   setStrutsMessage(StrutsMessage.successMessage().addParameter("hasGroupss", hasGroupss));
		return SUCCESS;
   }
   public String saveShare(){
	   String result="操作成功";
	  // groupIds="1,2,3";
//	   for(String gid:groupIds){
	    String r=componentPage.saveShare(pageId, groupIds);
	    if(!r.equals("1")){
	    	result="操作失败";
	    	//break;
	    //}
	   }
	   setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
	   
		return SUCCESS;
   }
	@Override
	public AimComponentPages getModel() {
		// TODO Auto-generated method stub
		return this.getAimComponentPages();
	}
}
