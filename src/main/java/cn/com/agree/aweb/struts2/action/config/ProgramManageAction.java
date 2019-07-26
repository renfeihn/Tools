package cn.com.agree.aweb.struts2.action.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.cama.cmdb.model.table.extention.CmdbLogicalServer;
import tc.bank.cama.cmdb.model.table.extention.CmdbProcessPort;
import tc.bank.cama.cmdb.model.view.CmdbAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbPortAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbProcessAppSoftware;
import tc.bank.cama.cmdb.model.view.CmdbProcessPortCount;
import tc.cama.aweb.service.IProgramManage;

/**
 * 应用程序管理
 * 
 * @author luotong
 *
 */
@Controller("ProgramManageActionBean")
@Scope("prototype")
public class ProgramManageAction extends StandardActionSupport{

	private static final long serialVersionUID = 1L;
	
	@Autowired
	private IProgramManage programManage;
	
	private Long procRecordId;//进程id
	
	private String processName;
	
	private String processDescription;
	
	private Long swObjectId;//软件id
	
	private int port;
	
	private Long appId;

	private String portDescription;
	
	private Long portRecordId;//端口id
	
	private Long cateId;
	
	private	Long appObjectId;
	
	private	String softwareName;
	
	private	Long srvObjectId;
	
	private	String swAttributes;
	
	private String ipAddr;
	
	private String processCmd;
	
	public String getProcessCmd() {
		return processCmd;
	}

	public void setProcessCmd(String processCmd) {
		this.processCmd = processCmd;
	}

	public String getIpAddr() {
		return ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public Long getPortRecordId() {
		return portRecordId;
	}

	public Long getCateId() {
		return cateId;
	}

	public Long getAppObjectId() {
		return appObjectId;
	}

	public String getSoftwareName() {
		return softwareName;
	}

	public Long getSrvObjectId() {
		return srvObjectId;
	}

	public String getSwAttributes() {
		return swAttributes;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}
	
	public void setPortRecordId(Long portRecordId) {
		this.portRecordId = portRecordId;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
	}

	public void setAppObjectId(Long appObjectId) {
		this.appObjectId = appObjectId;
	}

	public void setSoftwareName(String softwareName) {
		this.softwareName = softwareName;
	}

	public void setSrvObjectId(Long srvObjectId) {
		this.srvObjectId = srvObjectId;
	}

	public void setSwAttributes(String swAttributes) {
		this.swAttributes = swAttributes;
	}

	
	public Long getProcRecordId() {
		return procRecordId;
	}

	public void setProcRecordId(Long procRecordId) {
		this.procRecordId = procRecordId;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getProcessDescription() {
		return processDescription;
	}

	public void setProcessDescription(String processDescription) {
		this.processDescription = processDescription;
	}

	public Long getSwObjectId() {
		return swObjectId;
	}

	public void setSwObjectId(Long swObjectId) {
		this.swObjectId = swObjectId;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getPortDescription() {
		return portDescription;
	}

	public void setPortDescription(String portDescription) {
		this.portDescription = portDescription;
	}

	public IProgramManage getProgramManage() {
		return programManage;
	}

	public void setProgramManage(IProgramManage programManage) {
		this.programManage = programManage;
	}
	
	

	/**
	 * 获取所有应用程序
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllSoftwares() throws Exception{
		List<CmdbAppSoftware> appList = programManage.getAllSoftwares();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appList", appList));
		return SUCCESS;
	}
	
	/**
	 * 获取所有应用程序
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getAllSoftware() throws Exception{
		List<CmdbAppSoftware> appList = programManage.getAllFirstCategorySoftwares(appId+"");
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appList", appList));
		return SUCCESS;
	}
	
	/**
	 * 查询软件下的所有进程, 以及每个进程包含的监听端口数量
	 * @return
	 * @throws Exception
	 */
	public String getSoftwarePortCount() throws Exception{
		List<CmdbProcessPortCount> processList = programManage.getSoftwarePortCount(swObjectId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("processList", processList));
		return SUCCESS;
	}
	
	/**
	 * 查询软件对象某个进程的所有端口信息
	 * @return
	 * @throws Exception
	 */
	public String getSoftwarePortInfo() throws Exception{
		List<CmdbProcessPort> portList = programManage.getSoftwarePortInfo(swObjectId, procRecordId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("portList", portList));
		return SUCCESS;
	}
	
	/**
	 * 修改软件的进程信息
	 * @return
	 * @throws Exception
	 */
	public String modifyPro() throws Exception{
		String msg = programManage.modifySoftwareProcess(procRecordId, processName, processDescription,processCmd);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}	
	/**
	 * 删除软件的进程
	 * @return
	 * @throws Exception
	 */
	public String removePro() throws Exception{
		String msg = programManage.removeSoftwareProcess(procRecordId);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	/**
	 * 新增软件的进程
	 * @return
	 * @throws Exception
	 */
	public String newPro() throws Exception{
		String msg = programManage.newSoftwareProcess(swObjectId, processName, processDescription,processCmd);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	/**
	 * 新增软件进程的端口
	 * @return
	 * @throws Exception
	 */
	public String newPort() throws Exception{
		String msg = programManage.newSoftwareProcessPort(swObjectId, procRecordId, port, portDescription);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	/**
	 * 修改软件进程的端口信息
	 * @return
	 * @throws Exception
	 */
	public String modifyPort() throws Exception{
		String msg = programManage.modifySoftwareProcessPort(portRecordId, port, portDescription);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	/**
	 * 删除软件进程的端口信息
	 * @return
	 * @throws Exception
	 */
	public String removePort() throws Exception{
		String msg = programManage.removeSoftwareProcessPort(portRecordId);
		setStrutsMessage(getStrutsMessageBean(msg));
		return SUCCESS;
	}
	
	/**
	 * 新增应用程序
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public String newSoftware() throws Exception {
		Map<String,Object> swAttributesMap=null;
		if(null==swAttributes || "".equals(swAttributes)){
			swAttributesMap=new HashMap<String, Object>();
		}else{
			swAttributesMap=(Map<String,Object>) JSONArray.parse(swAttributes);
		}
		boolean result=programManage.newSoftware(cateId, appObjectId, softwareName, srvObjectId, swAttributesMap);
		if(result==true)
			setStrutsMessage(StrutsMessage.successMessage());
		else
			setStrutsMessage(StrutsMessage.errorMessage("新增应用程序失败"));
		return SUCCESS;	
	}
	
	/**
	 * 根据应用程序ID, 删除与其相关的信息
	 * @return
	 * @throws Exception
	 */
	public String removeSoftware() throws Exception{
		programManage.removeSoftware(appObjectId, swObjectId);
		setStrutsMessage(StrutsMessage.successMessage());
		return SUCCESS;	
	}
	
	
	/**
	 * 修改应用程序自身的属性
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String modifySoftwareDetail() throws Exception{
		Map<String,Object> swAttributesMap=(Map<String,Object>) JSONArray.parse(swAttributes);
		Integer modifySw=programManage.modifySoftwareDetail(swObjectId, swAttributesMap);
		if(modifySw==null || modifySw==0)
			setStrutsMessage(StrutsMessage.errorMessage("修改应用程序失败"));
		else
			setStrutsMessage(StrutsMessage.successMessage());
		return SUCCESS;	
	}
	
	
	
	/**
	 * 获取IP地址关联的逻辑服务器
	 * @return
	 * @throws Exception
	 */
	public String getIPRelatedServers() throws Exception{
		CmdbLogicalServer logicalServer=programManage.getIPRelatedServers(ipAddr);
		if(logicalServer==null)
			logicalServer=new CmdbLogicalServer();	
		setStrutsMessage(StrutsMessage.successMessage().addParameter("logicalServer", logicalServer));
		return SUCCESS;	
	}
	
	/**
	 * 获取进程管理相关信息
	 * @return
	 * @throws Exception
	 */
	public String getProcessRelatedInfo() throws Exception{
		List<CmdbProcessAppSoftware> processAppSoftwares=programManage.getProcessRelatedInfo();
		if(processAppSoftwares==null)
			processAppSoftwares=new ArrayList<CmdbProcessAppSoftware>();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("processAppSoftwares", processAppSoftwares));
		return SUCCESS;	
	}
	
	/**
	 * 获取端口管理相关信息
	 * @return
	 * @throws Exception
	 */
	public String getPortRelatedInfo() throws Exception{
		List<CmdbPortAppSoftware> portAppSoftwares=programManage.getPortRelatedInfo();
		if(portAppSoftwares==null)
			portAppSoftwares=new ArrayList<CmdbPortAppSoftware>();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("processAppSoftwares", portAppSoftwares));
		return SUCCESS;	
	}
	
	
	/**
	 * 获取应用系统下的软件
	 * @return
	 * @throws Exception
	 */
	public String getAppRelatedSoftwares() throws Exception{
		List<Object> softwares=programManage.getAppRelatedSoftwares(appId);
		if(softwares==null)
			softwares=new ArrayList<Object>();
		setStrutsMessage(StrutsMessage.successMessage().addParameter("softwares", softwares));
		return SUCCESS;
	}
	
	/**
	 * 应用系统与软件筛选进程
	 * @return
	 * @throws NumberFormatException
	 * @throws Exception
	 */
	public String getProcessAppSw() throws NumberFormatException, Exception{
		List<CmdbProcessAppSoftware> processAppSoftwares=programManage.getProcessRelatedInfo(appObjectId+"", swObjectId+"");
		setStrutsMessage(StrutsMessage.successMessage().addParameter("processAppSoftwares", processAppSoftwares));
		return SUCCESS;
	}
	/**
	 * 应用系统与软件筛选端口
	 * @return
	 * @throws Exception
	 */
	public String getPortAppSw() throws Exception{
		List<CmdbPortAppSoftware> portAppSoftwares = programManage.getPortRelatedInfo(appObjectId+"", swObjectId+"");
		setStrutsMessage(StrutsMessage.successMessage().addParameter("processAppSoftwares", portAppSoftwares));
		return SUCCESS;
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
}