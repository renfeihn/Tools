package cn.com.agree.aweb.struts2.action.appmonitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.cama.aweb.esb.service.IEsbSyncSysCfgInfo;

@Controller("EsbSyncCfgActionBean")
@Scope("prototype")
public class EsbSyncCfgAction
extends StandardActionSupport
{
 /**
	 * 
	 */
	private static final long serialVersionUID = -6063891937378772483L;
@Autowired
	private IEsbSyncSysCfgInfo  esbSyncCfgManager;
    public String  getEsbCfgInfo(){
	  setStrutsMessage(StrutsMessage.successMessage().addParameter("EsbCfgInfo", esbSyncCfgManager.getEsbCfgInfo()));
	  return SUCCESS;
     }
     public String  getEsbSyncInfo(){
	  setStrutsMessage(StrutsMessage.successMessage().addParameter("EsbSyncInfo", esbSyncCfgManager.getEsbSyncInfo()));
	  return SUCCESS;
      }
}