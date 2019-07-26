package cn.com.agree.aweb.struts2.action.asda;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.dashboard.model.DashBoardAppRelation;
import tc.bank.asda.dashboard.model.Panel;
import tc.bank.asda.dashboard.service.IDashBoardAppRelationService;
import tc.bank.asda.dashboard.service.IPanelService;
import tc.cama.aweb.model.AwebUser;

@Controller("PanelActionBean")
@Scope("prototype")
public class PanelAction extends StandardActionSupport{

	private static final long serialVersionUID = -3356872317181538913L;
	
	@Autowired
	private IPanelService panelService;
	
	/**
	 * 仪表盘id
	 */
	private long id;
	
	/**
	 * 仪表盘名称
	 */
	private String name;
	
	/**
	 * 仪表盘状态	1 自己创建 0 别人分享
	 */
	private Integer status;
	
	/**
	 * 关联资源ID
	 */
	private long objectId;
	
	/**
	 * 所属用户ID
	 */
	private long userId;
	
	/**
	 * panelBean
	 */
	private String panelBean;
	
	/**
	 * whereEx
	 */
	private String whereEx;

	/**
	 * 发布到首页的路径
	 */
	private String path;

	public String add(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				Panel panel = JSONObject.parseObject(panelBean, Panel.class);
				panel.setUserId(userVO.getId());
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelService.add(panel)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String update(){
		try {
			Panel panel = JSONObject.parseObject(panelBean, Panel.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelService.update(panel)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getAll(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelService.getAll(userVO.getId())));
			}
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String delById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelService.delById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String getById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelService.getById(id)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String uploadPage () {
    	try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						panelService.uploadPage(path, name, id, userVO.getUsername())));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }
    
	public String addDashBoardPannel () {
    	try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						panelService.addDashBoardPannel(path, name, id, userVO.getUsername())));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }
	
	public String delDashBoardPannel () {
    	try {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						panelService.delDashBoardPannel(id)));
				return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }
	
	public String getDashBoardPannelList() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelService.getDashBoardPannelList( userVO.getUsername())));
			return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
    public String  getAllByWhereEx(){
		try {
			JSONObject obj = JSONObject.parseObject(whereEx);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", panelService.getAllByWhereEx(obj)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }
	


	@Autowired
	private IDashBoardAppRelationService idashBoardAppRelationService;
	
	private String relations;
	private long relationId;
	private long appId;
	private long panelId;
    
    public String addRelation(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				JSONArray relationsArray = JSONArray.parseArray(relations);
				List<DashBoardAppRelation> list = new ArrayList<>();
				for(Object temp : relationsArray){
					JSONObject json = (JSONObject) temp;
					DashBoardAppRelation relation = new DashBoardAppRelation();
					relation.setUserId(userVO.getId());
					relation.setAppBoradName(json.getString("appBoradName"));
					relation.setPanelId(json.getLongValue("panelId"));
					relation.setSourceId(json.getLongValue("sourceId"));
					list.add(relation);
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						idashBoardAppRelationService.addOrUpdateRelation(list, panelId)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }
    
    public String delRelation(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						idashBoardAppRelationService.delRelation(relationId)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }
    
    
    public String queryByAppId(){
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", 
						idashBoardAppRelationService.queryByAppId(userVO.getId(),appId)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public long getObjectId() {
		return objectId;
	}

	public void setObjectId(long objectId) {
		this.objectId = objectId;
	}

	public long getPanelId() {
		return panelId;
	}

	public void setPanelId(long panelId) {
		this.panelId = panelId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getPanelBean() {
		return panelBean;
	}

	public void setPanelBean(String panelBean) {
		this.panelBean = panelBean;
	}

	public String getWhereEx() {
		return whereEx;
	}

	public void setWhereEx(String whereEx) {
		this.whereEx = whereEx;
	}

	public String getRelations() {
		return relations;
	}

	public void setRelations(String relations) {
		this.relations = relations;
	}

	public long getRelationId() {
		return relationId;
	}

	public void setRelationId(long relationId) {
		this.relationId = relationId;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	
}
