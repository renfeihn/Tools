package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.bean.PageAppSummary;
import tc.cama.aweb.bean.PageAppView;
import tc.cama.aweb.model.AwebUserAttentionObj;
import tc.cama.aweb.service.IAppOverview;
import tc.cama.aweb.service.ISvgInfo;
/**
 * 应用总览
 * @author luotong
 *
 */
@Controller("AppOverviewActionBean")
@Scope("prototype")
public class AppOverviewAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	@Autowired
	private IAppOverview appOverview;
	
	@Autowired
	private ISvgInfo svgInfo;
	
	private String objId;
	
	public String getObjId() {
		return objId;
	}

	public void setObjId(String objId) {
		this.objId = objId;
	}

	/**
	 * 查询：
	 * 1.全部应用的数量
	 * 2.不同分组下应用的数量
	 * 3.预警、故障的数量
	 * 4.所有应用
	 * @return
	 * @throws Exception 
	 */
	public String getAppsData() throws Exception{
		PageAppView appView = appOverview.getAppsData(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appView", appView));
		return SUCCESS;
	}
	
	
	/**
	 * 查询所有应用列表
	 * @return
	 * @throws Exception
	 */
	public String getAllApps() throws Exception{
		List<PageAppSummary> appList = appOverview.getAllAppList(getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appList", appList));
		return SUCCESS;
	}
	
	/**
	 * 查询某个分组下的应用列表
	 * @return
	 * @throws Exception
	 */
	public String getAppForGroup() throws Exception{
		List<PageAppSummary> appList = appOverview.getAppForGroup(Long.parseLong(objId), getUsername());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appList", appList));
		return SUCCESS;
	}
	
	/**
	 * 添加应用关注
	 * @return
	 */
	public String addFocus(){
		String msg = "";
		AwebUserAttentionObj attObj = new AwebUserAttentionObj();
		attObj.setUsername(getUsername());
		attObj.setObjId(Integer.parseInt(objId));
		msg = appOverview.addUserAttentionObj(attObj);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 取消应用关注
	 * @return
	 */
	public String removeFocus(){
		String msg = "";
		msg = appOverview.cancelUserAttentionObj(getUsername(), Integer.parseInt(objId));
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 获取当前session中用户名
	 * @return
	 */
	private String getUsername(){
		return (String)getSession().getAttribute("username");
	}
	
	/**
	 * 获取StrutsMessage对象
	 * 
	 * @param msg
	 * @return
	 */
	private StrutsMessage getStrutsMessageBean(String msg) {
		return "".equals(msg) ? StrutsMessage.successMessage() : StrutsMessage.errorMessage(msg);
	}
	
	/**
	 * 生成应用访问关系SVG图
	 * 
	 * @param msg
	 * @return
	 */
	public String getAppSvgInfo(String msg) throws Exception{
		JSONObject ret = svgInfo.getSvgInfo(new JSONObject());
		setStrutsMessage(StrutsMessage.successMessage().addParameter("ret", ret));
		return SUCCESS;
	}
}