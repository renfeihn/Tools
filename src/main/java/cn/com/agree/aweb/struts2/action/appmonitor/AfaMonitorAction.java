package cn.com.agree.aweb.struts2.action.appmonitor;

import java.io.ByteArrayInputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import cn.com.agree.afa.core.ModuleType;
import cn.com.agree.afa.core.device.DeviceFactory;
import cn.com.agree.afa.core.device.VDModule;
import cn.com.agree.afa.core.device.VDService;
import cn.com.agree.afa.core.scoreboard.DeviceState;
import cn.com.agree.afa.omi.IOperationsManager;
import cn.com.agree.aim4.core.convert.ConvertUtils;
import cn.com.agree.aweb.exception.AfaConfigException;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.AfaCommonUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import tc.cama.aweb.bean.AFAMonBean;
import tc.cama.aweb.bean.AfaDeviceType;
import tc.cama.aweb.bean.AfaTableStructure;
import tc.cama.aweb.bean.IsolateState;
import tc.cama.aweb.bean.ItemJson;
import tc.cama.aweb.bean.PageJson;
import tc.cama.aweb.bean.PageJson.GroupJson;
import tc.cama.aweb.model.AfaInstanceVO;
import tc.cama.aweb.model.AfaRegistryVO;
import tc.cama.aweb.service.IAfaMonitor;
import tc.cama.aweb.utils.AFAContainer;
import tc.cama.aweb.utils.ConfigManager;
import tc.cama.aweb.utils.ConfigNodeFactory;
import tc.cama.aweb.utils.ConfigNodeSupport;
import tc.cama.aweb.utils.SchemaManager;

@Controller("AfaMonitorActionBean")
@Scope("prototype")
public class AfaMonitorAction extends StandardActionSupport {
	private static final long serialVersionUID = 3378916897733026018L;
	private String host;
	private int port;
	private int gid;
	private int mid;
	private ModuleType moduleType;
	private int sid;
	private String serviceType;
	private Long appId;
	@Autowired
	IAfaMonitor afaMonitor;

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public Integer getPort() {
		return port;
	}

	public void setPort(Integer port) {
		this.port = port;
	}

	public Integer getGid() {
		return gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public ModuleType getModuleType() {
		return moduleType;
	}

	public void setModuleType(ModuleType moduleType) {
		this.moduleType = moduleType;
	}

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public Long getAppId() {
		return appId;
	}

	public void setAppId(Long appId) {
		this.appId = appId;
	}

	public String getTradeInfo() throws Exception {
		List<AFAMonBean> list = afaMonitor.getAfaFlowStatistic(appId);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("tradeList", list));
		return SUCCESS;
	}

	public String afaInsList() throws Exception {
		List<JSONObject> instanceList = new ArrayList<JSONObject>();

		List<AfaInstanceVO> list = afaMonitor.getAfaInstance();
		List<AfaRegistryVO> list1 = afaMonitor.getRegistrys();
		AFAContainer ac = new AFAContainer(list, list1);
		if (list != null) {

			for (AfaInstanceVO vo : list) {
//				if (vo.getSchemaVersion() != null) {
					JSONObject obj = new JSONObject();
					obj.put("id", vo.getId());
					obj.put("host", vo.getHost());
					obj.put("port", Integer.valueOf(vo.getPort()));
					obj.put("name", vo.getName());
					obj.put("clustername", vo.getClustername());
					obj.put("schVersion", vo.getSchemaVersion());
					@SuppressWarnings("static-access")
					IOperationsManager manager = ac.getExistManager(vo.getHost(), vo.getPort());
					obj.put("state", AFAContainer.getManagerState(manager));
					// obj.put("state", manager);
					// 获取是否隔离状态
					obj.put("isolateState",
							AFAContainer.getDvcIsolateState(manager, AfaDeviceType.PLATFORM, new String[0]));
					instanceList.add(obj);
//				}

			}
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("aaData", instanceList));
		return SUCCESS;
	}

	public String pageJson() throws Exception {
		List<AfaInstanceVO> list = afaMonitor.getAfaInstance();
		List<AfaRegistryVO> list1 = afaMonitor.getRegistrys();
		AFAContainer ac = new AFAContainer(list, list1);
		@SuppressWarnings("static-access")
		IOperationsManager manager = ac.getExistManager(this.host, this.port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到当前实例的运维管理器，请确认实例已连接"));
			return SUCCESS;
		}

		byte[] configContents = ConfigManager.getConfigContents(manager);
		ConfigNodeSupport configNode = ConfigNodeFactory.getGlobalNode(configContents);
		SchemaManager schema = AfaCommonUtil.getSchemaManager(manager);
		PageJson pageJson = configNode.getPageJson(schema);
		// JsonConfig jc = new JsonConfig();
		@SuppressWarnings("unchecked")
		LinkedHashMap<String, GroupJson> groups = pageJson.getGroups();
		LinkedHashMap<String, Object> groups1 = new LinkedHashMap<String, Object>();
		for (String key : groups.keySet()) {
			JSONObject json = ConvertUtils.convert(groups.get(key), JSONObject.class);
			groups1.put(key, json);
		}
		setStrutsMessage(StrutsMessage.successMessage().addParameter("appendNodes", pageJson.getAppendNodes())
				.addParameter("base", pageJson.getBase()).addParameter("catch", pageJson.getCaches())
				.addParameter("codec", pageJson.getCodec()).addParameter("core", pageJson.getCore())
				.addParameter("dateSource", pageJson.getDataSources()).addParameter("factorys", pageJson.getFactorys())
				.addParameter("groups", groups1).addParameter("lists", pageJson.getLists())
				.addParameter("monitor", pageJson.getMonitor()).addParameter("switches", pageJson.getSwitches())
				.addParameter("tasks", pageJson.getTasks())

		);
		return SUCCESS;
	}

	public String workPageJson() throws Exception {
		IOperationsManager manager = AFAContainer.getExistManager(this.host, this.port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到实例,请检查"));
			return SUCCESS;
		}

		byte[] schemaContents = ConfigManager.getSchemaContents(manager);
		String schemaVersion = disposeSchemaVersion(schemaContents);

		ConfigNodeSupport configNode = ConfigNodeFactory.getWorkgroupNode(ConfigManager.getConfigContents(manager),
				this.gid);
		SchemaManager schema = SchemaManager.getSchemaManager(schemaVersion);
		schema = schema == null ? SchemaManager.createSchemaManager(schemaContents) : schema;

		PageJson pageJson = configNode.getPageJson(schema);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("pageJson", pageJson));
		return SUCCESS;

	}

	public String instanceStructure() throws Exception {
		IOperationsManager manager = AFAContainer.getExistManager(this.host, this.port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到实例,请检查"));
			return SUCCESS;
		}

		JSONArray aaData = AfaTableStructure.instance(manager).getWorkgroupNodes();

		if (true) {
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("state", AFAContainer.getManagerState(manager));
			jsonObj.put("parentState", DeviceState.Running);
			jsonObj.put("isolateState",
					AFAContainer.getDvcIsolateState(manager, AfaDeviceType.PLATFORM, new String[0]));
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("aaData", aaData == null ? new JSONArray() : aaData)
							.addParameter("VDScore", jsonObj));
		}
		return SUCCESS;
	}

	public String workgroupStructure()
			throws AfaConfigException, UnsupportedEncodingException, DocumentException, Exception {
		IOperationsManager manager = AFAContainer.getExistManager(this.host, this.port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到实例,请检查"));
			return SUCCESS;
		}

		JSONArray aaData = AfaTableStructure.instance(manager).getWorkgroupNode(this.gid);
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("aaData", aaData == null ? new JSONArray() : aaData));

		return SUCCESS;
	}

	@SuppressWarnings("incomplete-switch")
	public String servicePageJson() throws Exception {
		IOperationsManager manager = AFAContainer.getExistManager(this.host, this.port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到实例,请检查"));
			return "success";
		}
		try {
			byte[] schemaContents = ConfigManager.getSchemaContents(manager);
			String schemaVersion = AfaCommonUtil.getSchemaVersion(schemaContents);

			SchemaManager schema = SchemaManager.getSchemaManager(schemaVersion);
			schema = schema == null ? SchemaManager.createSchemaManager(schemaContents) : schema;

			ConfigNodeSupport configNode = ConfigNodeFactory.getServiceNode(ConfigManager.getConfigContents(manager),
					this.gid, this.mid, this.moduleType, this.sid, this.serviceType);
			PageJson pageJson = configNode.getPageJson(schema);
			switch (this.moduleType) {
			case DCM:
				boolean canIsolate = schema.getDevIsolatedFlag(AfaDeviceType.LSRSERVICE,
						new String[] { this.serviceType });
				if (!canIsolate) {
					@SuppressWarnings("unchecked")
					Map<String, ItemJson> baseItemMap = pageJson.getBase();
					if (baseItemMap.containsKey("isolation")) {
						((ItemJson) baseItemMap.get("isolation")).setType("xs:ignore");
					}
				}
				break;
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("pageJson", pageJson));
		} catch (AfaConfigException e) {

		}
		return "success";
	}

	public String serviceStructure() throws Exception {
		IOperationsManager manager = AFAContainer.getExistManager(this.host, this.port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到实例,请检查"));
			return SUCCESS;
		}

		ConfigManager configManager = ConfigManager.createConfigManager(manager);
		IsolateState pIsolateState = configManager.getIsolateState(manager, AfaDeviceType.WORKGROUP,
				new String[] { "" + this.gid });
		JSONArray aaData = AfaTableStructure.instance(manager).getServiceNode(this.gid, this.mid, this.moduleType,
				this.sid, pIsolateState);
		VDService service = DeviceFactory.getVDService(this.gid, this.mid, this.moduleType, this.sid);
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("aaData", aaData == null ? new JSONArray() : aaData)
						.addParameter("VDScore", AFAContainer.getServiceScore(this.host, this.port, service)));
		return SUCCESS;

	}

	public String moduleStructure() throws Exception {
		IOperationsManager manager = AFAContainer.getExistManager(this.host, this.port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到实例,请检查"));
			return SUCCESS;
		}

		ConfigManager configManager = ConfigManager.createConfigManager(manager);
		IsolateState pIsolateState = configManager.getIsolateState(manager, AfaDeviceType.WORKGROUP,
				new String[] { "" + this.gid });
		JSONArray aaData = AfaTableStructure.instance(manager).getModuleNode(this.gid, this.mid, this.moduleType,
				pIsolateState);
		VDModule module = DeviceFactory.getVDModule(this.gid, this.mid, this.moduleType);
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("aaData", aaData == null ? new JSONArray() : aaData)
						.addParameter("VDScore", AFAContainer.getModuleScore(this.host, this.port, module)));
		return SUCCESS;
	}

	public String modulePageJson() throws Exception {
		IOperationsManager manager = AFAContainer.getExistManager(host, port);
		if (manager == null) {
			setStrutsMessage(StrutsMessage.errorMessage("未找到当前模块的运维管理器，请确认实例已正常连接"));
			return "success";
		}

		byte schemaContents[] = ConfigManager.getSchemaContents(manager);
		String schemaVersion = disposeSchemaVersion(schemaContents);
		// SchemaManager.createSchemaManager( );
		SchemaManager schema = SchemaManager.getSchemaManager(schemaVersion);
		schema = schema != null ? schema : SchemaManager.createSchemaManager(schemaContents);
		ConfigNodeSupport configNode = ConfigNodeFactory.getModuleNode(ConfigManager.getConfigContents(manager), gid,
				mid, moduleType);
		PageJson pageJson = configNode.getPageJson(schema);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("pageJson", pageJson != null ? pageJson : ""));
		return SUCCESS;
	}

	private String disposeSchemaVersion(byte[] schemaContents) throws Exception {
		SAXReader reader = new SAXReader();
		Document document = reader.read(new ByteArrayInputStream(schemaContents));
		Element root = document.getRootElement();
		return root.attributeValue("version");
	}
}