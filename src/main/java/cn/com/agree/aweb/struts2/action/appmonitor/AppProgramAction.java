package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.model.AimlKeywordsCount;
import tc.bank.asda.model.AimlKeywordsLogs;
import tc.bank.cama.agentmgr.model.AimAdmAgentReg;
import tc.bank.common.core.Page;
import tc.bank.common.core.Pageable;
import tc.bank.common.db.Sort;
import tc.cama.aweb.bean.PageProgramBase;
import tc.cama.aweb.esb.model.EsbSystem;
import tc.cama.aweb.service.IAppProgram;

/**
 * 应用程序
 */
@Controller("AppProgramActionBean")
@Scope("prototype")
public class AppProgramAction extends StandardActionSupport {

	private static final long serialVersionUID = 1L;

	@Autowired
	private IAppProgram appProgram;
    Long programId;
	Long appId;
	int time;
	int interval;
	/**
	 * 应用程序id
	 */
	long mobjId;
	/**
	 * 进程名
	 */
	String procName;
	/**
	 * 系统码
	 */
	String appCode;
	String keyword;
	/**
	 * 页码，从0开始
	 */
	private int page;
	/**
	 * 每页记录数
	 */
	private int size;
	/**
	 * 起始行
	 */
	private int offset;
	/**
	 * 要排序的字段
	 */
	List<String> pros;
	/**
	 * 升序or降序 ASC升序 DESC降序 
	 */
	String orderType;
	/**
	 * 日志文件
	 */
	private String logfile;
	/**
	 * 代理类型 1-主机代理 2-web代理 3-日志代理
	 */
	String agentType;
	
	public IAppProgram getAppProgram() {
		return appProgram;
	}

	
	public void setAppProgram(IAppProgram appProgram) {
		this.appProgram = appProgram;
	}

	public Long getProgramId() {
		return programId;
	}


	public void setProgramId(Long programId) {
		this.programId = programId;
	}


	public Long getAppId() {
		return appId;
	}


	public void setAppId(Long appId) {
		this.appId = appId;
	}


	public int getTime() {
		return time;
	}

	public int getInterval() {
		return interval;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public long getMobjId() {
		return mobjId;
	}


	public void setMobjId(long mobjId) {
		this.mobjId = mobjId;
	}


	public String getProcName() {
		return procName;
	}


	public void setProcName(String procName) {
		this.procName = procName;
	}


	public String getAppCode() {
		return appCode;
	}


	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}


	public String getKeyword() {
		return keyword;
	}


	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}


	public int getPage() {
		return page;
	}


	public void setPage(int page) {
		this.page = page;
	}


	public int getSize() {
		return size;
	}


	public void setSize(int size) {
		this.size = size;
	}


	public int getOffset() {
		return offset;
	}


	public void setOffset(int offset) {
		this.offset = offset;
	}


	public List<String> getPros() {
		return pros;
	}


	public void setPros(List<String> pros) {
		this.pros = pros;
	}


	public String getOrderType() {
		return orderType;
	}


	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}


	public String getLogfile() {
		return logfile;
	}


	public void setLogfile(String logfile) {
		this.logfile = logfile;
	}


	public String getAgentType() {
		return agentType;
	}


	public void setAgentType(String agentType) {
		this.agentType = agentType;
	}


	/**
	 * 获取应用程序基本信息，包括指标、事件和健康度
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getProgramBaseInfo() throws Exception {
		PageProgramBase programBase = appProgram.getProgramBaseInfo(programId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("programBase", programBase));
		return SUCCESS;
	}
	
	/**
	 * 查询关键进程信息
	 * @return
	 * @throws Exception
	 */
	
	public String getProcess() throws Exception{
		List<Map<String, Object>> process=appProgram.getProcessList(appId,programId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("process", process));
		return SUCCESS;
	}
	/**
	 * 查询指定进程端口信息
	 * @return
	 * @throws Exception
	 */
	public String getPorts() throws Exception{
	
		List<Map<String, Object>> process=appProgram.getPortList(appId,mobjId,procName);
		
		setStrutsMessage(StrutsMessage.successMessage().addParameter("process", process));
		return SUCCESS;
	}
	/**
	 *  统计当日关键字信息
	 * @return
	 * @throws Exception
	 */
	public String statCurrentDayKeywords() throws Exception{
		List<AimlKeywordsCount> statKeywords=appProgram.statCurrentDayKeywords(appCode);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("statKeywords", statKeywords));
		return SUCCESS;
	}
	/**
	 * 查询当日关键字日志
	 * @return
	 * @throws Exception
	 */
	public String pageQueryCurrentDayKeywordsLogs() throws Exception{
		Pageable pageable=new Pageable(page,size);
		Sort sort=new Sort(orderType,pros);
		Page<AimlKeywordsLogs> keywordsLogs=appProgram.pageQueryCurrentDayKeywordsLogs(appCode, keyword, logfile, pageable, sort);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("keywordsLogs", keywordsLogs));
		return SUCCESS;
	}
	/**
	 * 查询代理运行信息
	 * @return
	 * @throws Exception
	 */
	public String queryAgentByType() throws Exception{
		Pageable pageable=new Pageable(page,size);
		Sort sort=new Sort(orderType,pros);
		Page<AimAdmAgentReg> keywordsLogs=appProgram.queryAgentByType(agentType, pageable, sort);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("keywordsLogs", keywordsLogs));
		return SUCCESS;
	}
	/**
	 * 根据 appId得到系统码，系统类型等信息。
	 * @return
	 * @throws Exception
	 */
	public String getSysInfoByAppId() throws Exception{
		EsbSystem esbSystem=appProgram.getSysInfoByAppId(appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("esbSystem", esbSystem));
		return SUCCESS;
	}
}
