package cn.com.agree.aweb.struts2.action.appmonitor;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ModelDriven;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.service.IAimlCfgLogSourceService;
import tc.bank.cama.cmdb.model.table.CmdbObjectCategory;
import tc.bank.cama.cmdb.model.table.CmdbObjectSummary;
import tc.bank.cama.cmdb.model.table.extention.CmdbApplication;
import tc.cama.aweb.bean.EventInFo;
import tc.cama.aweb.bean.PageCfgObjectSummary;
import tc.cama.aweb.bean.PageCfgSoftDeploy;
import tc.cama.aweb.service.IAppConfigOverview;
@Scope("prototype")
@Controller("AppConfigOverviewActionBean")
public class AppConfigOverviewAction extends StandardActionSupport implements ModelDriven<CmdbObjectSummary> {
	
	private CmdbObjectSummary object;
	private Long appId;
	private Long objId;
	private String levelOneName;
	private String levelTwoName;
	private String levelThreeName;
	private Long logicServerId;
	private String username;
	
	private static final long serialVersionUID = -4752095898823191775L;
	
	@Autowired
	private IAppConfigOverview appConfigOverview;
	
	@Autowired
	private IAimlCfgLogSourceService sourceService;

	public CmdbObjectSummary getObject() {
		return object;
	}

	public void setObject(CmdbObjectSummary object) {
		this.object = object;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public Long getObjId() {
		return objId;
	}

	public void setObjId(Long objId) {
		this.objId = objId;
	}

	public String getLevelOneName() {
		return levelOneName;
	}

	public void setLevelOneName(String levelOneName) throws UnsupportedEncodingException {
		//levelOneName =new String(levelOneName.getBytes("ISO-8859-1"),"utf-8");
		this.levelOneName = levelOneName;
	}

	public String getLevelTwoName() {
		return levelTwoName;
	}

	public void setLevelTwoName(String levelTwoName) throws UnsupportedEncodingException {
		this.levelTwoName = levelTwoName;
	}

	public String getLevelThreeName() {
		return levelThreeName;
	}

	public void setLevelThreeName(String levelThreeName) throws UnsupportedEncodingException {
		this.levelThreeName = levelThreeName;
	}

	public Long getLogicServerId() {
		return logicServerId;
	}

	public void setLogicServerId(Long logicServerId) {
		this.logicServerId = logicServerId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * 查询全部三级分类
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllCategories() throws Exception {
		List<CmdbObjectCategory> cates = appConfigOverview.getAllCategories();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("cates", cates));
		return SUCCESS;
	}

	/**
	 * 查询对象自身的明细
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getObjectDetail() throws Exception {
		Object obj = appConfigOverview.getObjectDetail(objId);
		System.out.println(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("obj", obj));
		return SUCCESS;
	}

	/**
	 * 查询指定系统一级分类下所有对象概要
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getFirstCategoryObjects() throws Exception {
		List<PageCfgObjectSummary> cate1Objects = appConfigOverview.getFirstCategoryObjects(appId,levelOneName,
				(String) getSession().getAttribute("username"));
		if("应用群组".equals(levelOneName)) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("cate1Objects", getObjectByUser(cate1Objects)));
		}else {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("cate1Objects", cate1Objects));
		}
		return SUCCESS;
	}

	/**
	 * 查询指定系统二级分类下所有对象概要
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getSecondCategoryObjects() throws Exception {

		List<PageCfgObjectSummary> cate2Objects = appConfigOverview.getSecondCategoryObjects(appId, levelOneName,
				levelTwoName, (String) getSession().getAttribute("username"));
		if("应用群组".equals(levelOneName)) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("cate2Objects", getObjectByUser(cate2Objects)));
		}else {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("cate2Objects", cate2Objects));
		}
		return SUCCESS;
	}

	/**
	 * 查询指定系统三级分类下所有对象概要
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getThirdCategoryObjects() throws Exception {
		List<PageCfgObjectSummary> cate3Objects = appConfigOverview.getThirdCategoryObjects(appId, levelOneName,
				levelTwoName, levelThreeName, (String) getSession().getAttribute("username"));
		if("应用群组".equals(levelOneName)) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("cate3Objects", getObjectByUser(cate3Objects)));
		}else {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("cate3Objects", cate3Objects));
		}
		return SUCCESS;
	}

	/**
	 * 根据用户数据权限进行筛选
	 * @param objects
	 * @return
	 * @throws Exception
	 */
	private List<PageCfgObjectSummary> getObjectByUser(List<PageCfgObjectSummary> objects) throws Exception{
		List<PageCfgObjectSummary> set = new ArrayList<>();
		List<Long> objIds = sourceService.getUserDataRole((String) getSession().getAttribute("username"), "1");
		for(PageCfgObjectSummary tmp : objects) {
			long objectId = tmp.getObjectSummary().getObjectId();
			for(Long id : objIds) {
				if(id == objectId) {
					set.add(tmp);
				}
			}
		}
		return set;
	}
	/**
	 * 查询逻辑服务器关联的应用系统明细
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getLogicServerRelatedApps() throws Exception {
		List<CmdbApplication> appList = appConfigOverview.getLogicServerRelatedApps(logicServerId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appList", appList));
		return SUCCESS;
	}

	/**
	 * 查询对象关联的系统明细
	 * 
	 *  对象ID
	 * @return
	 * @throws Exception
	 */
	public String getObjectRelatedApps() throws Exception {
		List<CmdbApplication> applist = appConfigOverview.getObjectRelatedApps(logicServerId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("applist", applist));
		return SUCCESS;
	}

	/**
	 * 原子服务 1根据逻辑服务器ID查询关联软件详细信息， 2根据软件ID查询进程数和端口数 1和2返回 List
	 * <PageCfgSoftwares> 3根据逻辑服务器ID查操作系统的版本 4获取逻辑服务器ID关联的二级分类数量统计
	 * 返回单条PageCfgSoftDeploy
	 * 
	 * @throws Exception
	 */
	public String getSoftwareDeploy() throws Exception {
		PageCfgSoftDeploy softDeploy = appConfigOverview.getSoftwareDeploy(logicServerId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("softDeployList", softDeploy));
		return SUCCESS;
	}

	public String getPortPross() throws Exception {
		List<Long> procprot=appConfigOverview.getPortPross(logicServerId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("procprot", procprot));
		return SUCCESS;
	}
	public String getAppCfgEventByObjectId() throws Exception {
		EventInFo eventInfo=appConfigOverview.getAppCfgEventByObjectId(objId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("eventInfo",  eventInfo));
		return SUCCESS;
	}
	@Override
	public CmdbObjectSummary getModel() {
		return this.object;
	}
}
