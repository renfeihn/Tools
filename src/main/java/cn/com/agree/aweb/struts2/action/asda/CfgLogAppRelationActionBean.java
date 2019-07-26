package cn.com.agree.aweb.struts2.action.asda;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.model.AimlCfgLogAppRelation;
import tc.bank.asda.logconfig.service.IAimlCfgLogAppRelationService;

@Controller("CfgLogAppRelationActionBean")
@Scope("prototype")
public class CfgLogAppRelationActionBean extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3094090846705374552L;

	@Autowired
	private IAimlCfgLogAppRelationService cfgLogAppRelationService;
	
	private long appid;
	private long objectid;
	private String relations;
	/**
	 * 增加关联关系集合
	 * 
	 * @return
	 */
	public String addCfglogAppRelations() {
		try {
			List<AimlCfgLogAppRelation> relationList = JSONArray.parseArray(relations, AimlCfgLogAppRelation.class);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					cfgLogAppRelationService.addCfglogAppRelations(relationList)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 根据关联关系查询应用下所有日志解析配置
	 * 
	 * @return
	 */
	public String queryCfgloginfoByAppid() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					cfgLogAppRelationService.queryCfgloginfoByAppid(appid, objectid)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
			return ERROR;
		}
	}
	public long getAppid() {
		return appid;
	}
	public void setAppid(long appid) {
		this.appid = appid;
	}
	public long getObjectid() {
		return objectid;
	}
	public void setObjectid(long objectid) {
		this.objectid = objectid;
	}
	public String getRelations() {
		return relations;
	}
	public void setRelations(String relations) {
		this.relations = relations;
	}
	
}
