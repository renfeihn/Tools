package cn.com.agree.aweb.struts2.action.appmonitor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;

import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.common.core.Page;
import tc.cama.aweb.model.AimCommandView;
import tc.cama.aweb.model.AimObjectCommandView;
import tc.cama.aweb.service.IAppCommandConfig;

@Controller("AppCommandConfigActionBean")
@Scope("prototype")
public class AppCommandConfigActionBean extends StandardActionSupport {

	private static final long serialVersionUID = 1L;

	@Autowired
	IAppCommandConfig appCommandConfig;

	Long id;					// 配置记录ID(aim_config_command_execute)		
	Long mobjId;				// 监控对象
	String executeGrp;			// 执行分组
	Integer executeCmd;			// 采集命令ID
	Integer executeInterval;	// 采集间隔
	Long appId;					// 应用系统ID
	String metricCate;			// 指标分组
	String metricItem;			// 指标项
	Integer page;				// 当前分页(base on 0)
	Integer pageSize;			// 分页大小
	Long cateId;				// CMDB三级分类ID
	
	/*
	 * keys
	 * > executeGrp
	 * > executeCmd
	 * > executeInterval
	 */
	String commands;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMobjId() {
		return mobjId;
	}

	public void setMobjId(Long mobjId) {
		this.mobjId = mobjId;
	}

	public String getExecuteGrp() {
		return executeGrp;
	}

	public void setExecuteGrp(String executeGrp) {
		this.executeGrp = executeGrp;
	}

	public Integer getExecuteCmd() {
		return executeCmd;
	}

	public void setExecuteCmd(Integer executeCmd) {
		this.executeCmd = executeCmd;
	}

	public Integer getExecuteInterval() {
		return executeInterval;
	}

	public void setExecuteInterval(Integer executeInterval) {
		this.executeInterval = executeInterval;
	}

	public IAppCommandConfig getAppCommandConfig() {
		return appCommandConfig;
	}

	public void setAppCommandConfig(IAppCommandConfig appCommandConfig) {
		this.appCommandConfig = appCommandConfig;
	}
	
	public String getMetricItem() {
		return metricItem;
	}

	public void setMetricItem(String metricItem) {
		this.metricItem = metricItem;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public String getMetricCate() {
		return metricCate;
	}

	public void setMetricCate(String metricCate) {
		this.metricCate = metricCate;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Long getCateId() {
		return cateId;
	}

	public void setCateId(Long cateId) {
		this.cateId = cateId;
	}

	public String getCommands() {
		return commands;
	}

	public void setCommands(String commands) {
		this.commands = commands;
	}

	public String queryAllCommands() throws Exception {
		try {
			List<AimCommandView> results = this.appCommandConfig.queryAllCommands();
			this.success(results);
		} catch (Exception e) {
			this.fail("查询采集命令列表异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryObjectCommands() throws Exception {
		try {
			List<AimObjectCommandView> results = this.appCommandConfig.queryObjectCommands(this.mobjId);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询对象采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryObjectCommandsByFilters() throws Exception {
		try {
			Page<AimObjectCommandView> page = this.appCommandConfig.queryObjectCommandsByFilters(this.appId, this.mobjId, this.metricCate,
					this.page, this.pageSize);
			this.success(page.getContent(), page.getTotal());
		} catch (Exception e) {
			this.fail("查询对象采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryMetricTags() throws Exception {
		try {
			List<Map<String,String>> results = this.appCommandConfig.queryMetricTags(this.metricCate, this.metricItem);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询指标标签异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryMetricTagValues() throws Exception {
		try {
			Map<String, List<Object>> results = this.appCommandConfig.queryMetricTagValues(this.appId, this.mobjId, this.metricCate, this.metricItem);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询对象指标标签内容异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryCommandResultItems() throws Exception {
		try {
			List<Map<String, Object>> results = this.appCommandConfig.queryCommandResultItems(new Long(this.executeCmd));
			this.success(results);
		} catch (Exception e) {
			this.fail("查询命令结果集字段定义异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	public String queryObjectCommandCollectStatus() throws Exception {
		try {
			List<Map<String, Object>> results = this.appCommandConfig.queryObjectCommandCollectStatus(this.mobjId, this.cateId);
			this.success(results);
		} catch (Exception e) {
			this.fail("查询对象采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}

	public String newObjectCommand() throws Exception {
		try {
			AimObjectCommandView command = new AimObjectCommandView();
			command.setObjectId(this.mobjId);
			command.setExecuteGroup(this.executeGrp);
			command.setCmdId(this.executeCmd.longValue());
			command.setExecuteInterval(this.executeInterval.longValue());
			if (null != this.appId) {
				command.setAppId(this.appId);
			}
			this.appCommandConfig.newObjectCommand(command);
			this.success("新增采集命令成功");
		} catch (Exception e) {
			this.fail("新增采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String newObjectCommands() throws Exception {
		try {
			
			List<AimObjectCommandView> newCommands = new ArrayList<AimObjectCommandView>();
			List<Map> cmdList = JSON.parseArray(this.commands, Map.class);
			
			if (null == this.appId) {
				this.appId = 0L;
			}
			
			for (Map<String,Object> map: cmdList) {
				
				AimObjectCommandView command = new AimObjectCommandView();
				
				command.setExecuteGroup((String) map.get("executeGrp"));
				
				Integer cmdId = (Integer) map.get("executeCmd");
				command.setCmdId(new Long(cmdId));
				
				Integer interval = (Integer) map.get("executeInterval");
				command.setExecuteInterval(new Long(interval));
				
				command.setAppId(this.appId);

				newCommands.add(command);
			}
			
			this.appCommandConfig.newObjectCommands(this.mobjId, newCommands);
			
			this.success("新增采集命令成功");

		} catch (Exception e) {
			e.printStackTrace();
			this.fail("新增采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}

	public String modifyObjectCommand() throws Exception {
		try {
			AimObjectCommandView command = new AimObjectCommandView();
			command.setId(this.id);
			command.setObjectId(this.mobjId);
			command.setExecuteGroup(this.executeGrp);
			command.setCmdId(this.executeCmd.longValue());
			command.setExecuteInterval(this.executeInterval.longValue());
			this.appCommandConfig.modifyObjectCommand(command);
			this.success("修改采集命令成功");
		} catch (Exception e) {
			this.fail("修改采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}

	public String removeObjectCommand() throws Exception {
		try {
			this.appCommandConfig.removeObjectCommand(this.mobjId, this.id);
			this.success("删除采集命令成功");
		} catch (Exception e) {
			this.fail("删除采集命令异常", e.getMessage());
		}
		return SUCCESS;
	}
	
	private void success(Object data) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "0")
				.addParameter("data", data));
	}

	private void success(Object data, long total) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "0")
				.addParameter("data", data)
				.addParameter("total", total));
	}
	
	private void fail(String errMsg, String exceptionMsg) {
		setStrutsMessage(StrutsMessage.successMessage()
				.addParameter("retCode", "1")
				.addParameter("exception", exceptionMsg)
				.addErrorMsg(errMsg));
	}
}
