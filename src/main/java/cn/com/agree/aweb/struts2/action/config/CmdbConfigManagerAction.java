package cn.com.agree.aweb.struts2.action.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.ExcelUtil;
import tc.bank.asda.logconfig.model.AimlCfgLogSource;
import tc.bank.asda.logconfig.service.IAimlCfgLogSourceService;
import tc.bank.common.date.DateUtils;
import tc.cama.aweb.service.ISvgInfo;
import tc.cama.aweb.service.cmdbconfig.ICmdbConfigManager;

@Scope("prototype")
@Controller("CmdbConfigManagerActionBean")
public class CmdbConfigManagerAction extends StandardActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private ISvgInfo svgInfo;
	
	@Autowired
	private ICmdbConfigManager cmdbConfigManager;
	
	@Autowired
	private IAimlCfgLogSourceService sourceService;
	
	private String pid;
	
	private String conf_id;
	
	private String updateData;
	
	private List<Long> objIds;
	
	private long objId;
	
	private long record_id;
	
	private long appId;
	
	private String topoContent;
	private String appName;
	
	private String toponame;
	
	private List<Long> soruce_objIds;
	
	private String soruce_cateId;
	
	private String target_cateId;
	
	private List<Long> target_objIds;
	
	private String fileName;
	
	private File file;
	
	private String cateId;
	
	private int flag;
	
	/*
	 * upFlag  1-添加下游关系；2-添加上游关系
	 */
	private String upFlag;
	
	private int limit;
	
	private String topoId;
	
	private int topoType;
	
	private String topoItems;
	
	private InputStream inStream;
	
	private String softwareName;
	
	private String nodeList;

	
	

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public long getRecord_id() {
		return record_id;
	}

	public void setRecord_id(long record_id) {
		this.record_id = record_id;
	}

	public String getUpFlag() {
		return upFlag;
	}

	public void setUpFlag(String upFlag) {
		this.upFlag = upFlag;
	}

	public String getNodeList() {
		return nodeList;
	}

	public void setNodeList(String nodeList) {
		this.nodeList = nodeList;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getConf_id() {
		return conf_id;
	}

	public void setConf_id(String conf_id) {
		this.conf_id = conf_id;
	}

	public String getUpdateData() {
		return updateData;
	}

	public void setUpdateData(String updateData) {
		this.updateData = updateData;
	}

	public List<Long> getObjIds() {
		return objIds;
	}

	public void setObjIds(List<Long> objIds) {
		this.objIds = objIds;
	}

	public long getObjId() {
		return objId;
	}

	public void setObjId(long objId) {
		this.objId = objId;
	}

	public List<Long> getSoruce_objIds() {
		return soruce_objIds;
	}

	public void setSoruce_objIds(List<Long> soruce_objIds) {
		this.soruce_objIds = soruce_objIds;
	}

	public String getSoruce_cateId() {
		return soruce_cateId;
	}

	public void setSoruce_cateId(String soruce_cateId) {
		this.soruce_cateId = soruce_cateId;
	}

	public String getTarget_cateId() {
		return target_cateId;
	}

	public void setTarget_cateId(String target_cateId) {
		this.target_cateId = target_cateId;
	}

	public List<Long> getTarget_objIds() {
		return target_objIds;
	}

	public void setTarget_objIds(List<Long> target_objIds) {
		this.target_objIds = target_objIds;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getCateId() {
		return cateId;
	}

	public void setCateId(String cateId) {
		this.cateId = cateId;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getTopoId() {
		return topoId;
	}

	public void setTopoId(String topoId) {
		this.topoId = topoId;
	}

	public long getAppId() {
		return appId;
	}

	public void setAppId(long appId) {
		this.appId = appId;
	}

	public String getTopoContent() {
		return topoContent;
	}

	public void setTopoContent(String topoContent) {
		this.topoContent = topoContent;
	}

	public String getToponame() {
		return toponame;
	}

	public void setToponame(String toponame) {
		this.toponame = toponame;
	}

	public int getTopoType() {
		return topoType;
	}

	public void setTopoType(int topoType) {
		this.topoType = topoType;
	}

	public String getTopoItems() {
		return topoItems;
	}

	public void setTopoItems(String topoItems) {
		this.topoItems = topoItems;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	public InputStream getInStream() {
		if (inStream != null) {
			return inStream;
		}
		String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
		try {
			inStream = new FileInputStream(path);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		deleteFile(path);
		return inStream;
	}
	
	public void setInStream(InputStream inStream) {
		this.inStream = inStream;
	}
	
	private boolean deleteFile(String filePath) {
		boolean flag = false;
		File file = new File(filePath);
		if (file.isFile() && file.exists()) {
			file.delete();
			flag = true;
		}
		return flag;
	}
	
	public String getSoftwareName() {
		return softwareName;
	}

	public void setSoftwareName(String softwareName) {
		this.softwareName = softwareName;
	}

	public String queryAlllevelCmdbConfig() throws Exception {
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("funs", cmdbConfigManager.queryAlllevelCmdbConfig(pid)));
		return SUCCESS;
	}

	public String queryAllCmdbObject() throws Exception {
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("funs", cmdbConfigManager.queryAllCmdbObject(conf_id)));
		return SUCCESS;
	}

	public String updateCmdbObject() throws Exception {
		@SuppressWarnings("unchecked")
		Map<String, Object> updateDataT = JSONObject.parseObject(updateData, Map.class);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs",
				cmdbConfigManager.updateCmdbObject(updateDataT, conf_id)));
		return SUCCESS;
	}

	public String removeObjs() throws Exception {
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("funs", cmdbConfigManager.removeObjs(objIds, conf_id)));
		return SUCCESS;
	}

	public String getObjInfo() throws Exception {
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("funs", cmdbConfigManager.getObjInfo(objId, conf_id)));
		return SUCCESS;
	}

	public String getRelation() throws Exception {
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs",
				cmdbConfigManager.getRelation(soruce_objIds, soruce_cateId, target_cateId)));
		return SUCCESS;
	}

	public String queryObjSummaryByCateId() throws Exception {
		setStrutsMessage(
				StrutsMessage.successMessage().addParameter("funs", cmdbConfigManager.queryObjSummaryByCateId(cateId)));
		return SUCCESS;
	}

	public String updateTopoCate() throws Exception {
		@SuppressWarnings("unchecked")
		Map<String, Object> topoData = JSONObject.parseObject(updateData, Map.class);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs",
				cmdbConfigManager.updateTopoCate(topoData, topoId, flag)));
		return SUCCESS;
	}

	@SuppressWarnings("unchecked")
	public String updateTopoContent() {
		Map<String, Object> topoData = new HashMap<String, Object>();
		topoData.put("create_user", getUserName());
		topoData.put("modi_time", new Date());
		topoData.put("app_id", appId);
		topoData.put("topo_name", toponame);
		topoData.put("topo_content", topoContent);
		topoData.put("topo_type", topoType);
		topoData.put("limit", limit);
		List<Map<String, Object>> topoItemsT = new ArrayList<Map<String, Object>>();
		if (topoItems != null) {
//			topoItemsT = (List<Map<String, Object>>) JSONObject.parseArray(topoItems,
//					new HashMap<String, Object>().getClass());
		}
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("funs",
					cmdbConfigManager.updateTopoContent(topoData, topoId, topoItemsT, flag, getUserName())));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage("请配置正确的依赖关系"));
			return ERROR;
		}
	}

	public String setRelation() throws Exception {
		cmdbConfigManager.setRelation(soruce_objIds, soruce_cateId, target_cateId, target_objIds);
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", "1"));
		return SUCCESS;
	}

	public String queryAllCate() throws Exception {
		setStrutsMessage(StrutsMessage.successMessage().addParameter("funs", cmdbConfigManager.queryAllCate()));
		return SUCCESS;
	}
	/**
	 * 下载CMDB模版
	 * @return
	 * @throws Exception
	 */
	public String getCmdbModule() throws Exception {
		List<Map<String, Object>> moduleDatas = cmdbConfigManager.getCmdbModule(conf_id);
		String moduleName = "";
		List<Object[]> enHeadName = new ArrayList<Object[]>();
		String[] rows = new String[moduleDatas.size()];
		String[] enHead1 = new String[moduleDatas.size()];
		String filePrName = "";
		if (moduleDatas != null && moduleDatas.size() > 0) {
			moduleName = moduleDatas.get(0).get("tabledesc") + "_module";
			filePrName = moduleDatas.get(0).get("tablename") + "_" + moduleName;
			for (int i = 0; i < moduleDatas.size(); i++) {
				rows[i] = moduleDatas.get(i).get("coldesc") + "";
				enHead1[i] = moduleDatas.get(i).get("colname") + "";
			}
		}
		enHeadName.add(enHead1);
		ExcelUtil util = new ExcelUtil(moduleName, rows, enHeadName);
		HSSFWorkbook workBook = util.export(filePrName);
		OutputStream out = null;
		this.fileName = "CMDB_MODEL_" + DateUtils.format(new Date(), "yyyyMMdd") + ".xls";
		File downFilePath = new File(ServletActionContext.getServletContext().getRealPath("download"));
		if (!downFilePath.exists()) {
			downFilePath.mkdirs();
		}
		String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
		File file = new File(path);
		if (!file.exists()) {
			file.createNewFile();
		}
		out = new FileOutputStream(file);
		workBook.write(out);
		if (null != out) {
			out.close();
		}
		return "stream";
	}
	
	/**
	 * CMDB数据导出
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String exportCmdbData() throws Exception {
		Map<String, Object> exportDataMap = cmdbConfigManager.exportCmdbData(conf_id);
		String moduleName = exportDataMap.get("moduleName") + "";
		String filePrName = exportDataMap.get("filePrName") + "_" + moduleName;
		List<JSONArray> result = (List<JSONArray>) exportDataMap.get("result");
		List<String> headList = (List<String>) exportDataMap.get("headList");
		if (headList != null && headList.size() > 0) {
			String[] headRow = new String[headList.size()];
			for (int i = 0; i < headList.size(); i++) {
				headRow[i] = headList.get(i);
			}
			List<Object[]> rows = new ArrayList<Object[]>();
			if (result != null && result.size() > 0) {
				for (JSONArray item : result) {
					rows.add(item.toArray());
				}
			}
			ExcelUtil util = new ExcelUtil(moduleName, headRow, rows);
			HSSFWorkbook workBook = util.export(filePrName);
			OutputStream out = null;
			fileName = "CMDB_" + moduleName + "_" + DateUtils.format(new Date(), "yyyyMMdd") + ".xls";
			fileName = new String(fileName.getBytes(), "ISO8859-1");//解决文件名中含有中文不显示的问题
			File downFilePath = new File(ServletActionContext.getServletContext().getRealPath("download"));
			if (!downFilePath.exists()) {
				downFilePath.mkdirs();
			}
			String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
			File file = new File(path);
			if (!file.exists()) {
				file.createNewFile();
			}
			out = new FileOutputStream(file);
			workBook.write(out);
			if (null != out) {
				out.close();
			}
			return "stream";
		} else {
			setStrutsMessage(StrutsMessage.errorMessage("excel标题栏没数据"));
			return SUCCESS;
		}
	}
	/**
	 * 导入CMDB数据
	 * @return
	 * @throws Exception
	 */
	public String importCmdbData() throws Exception {
		if(null == file) {
			setStrutsMessage(StrutsMessage.errorMessage("导入文件为空"));
			return ERROR;
		}
		String[][] result = ExcelUtil.getData(file, 3);
		int rowLength = result.length;
		List<Map<String, Object>> importDataMaps = new ArrayList<Map<String, Object>>();
		String[] keys = result[0];
		for (int i = 1; i < rowLength; i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			for (int j = 0; j < result[i].length; j++) {
				String key = keys[j];
				if (key != null && !key.equals("")) {
					map.put(key, result[i][j]);
				}
			}
			System.out.println(map);
			importDataMaps.add(map);
		}
		if (importDataMaps.size() < 1) {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "模板错误或者导入数据为空"));
		} else {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
					cmdbConfigManager.importCmdbData(importDataMaps, conf_id)));
		}
		return SUCCESS;
	}
	/**
	 * 添加软件
	 * @return
	 */
	public String addSoftware() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", cmdbConfigManager.addSoftWare(softwareName)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 删除添加的软件
	 * @return
	 */
	public String delSoftware() {
		try {
			Map<String,Object> whereEx = new HashMap<>(1);
			whereEx.put("cateoryId", cateId);
			List<AimlCfgLogSource> sources = sourceService.getAimlCfgLogSource(whereEx);
			if(null != sources && sources.size()>0) {
				setStrutsMessage(StrutsMessage.errorMessage("该软件在日志源已被引用，请先解除应用，再删除！"));
				return ERROR;
			}else {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", cmdbConfigManager.delSoftWare(cateId)));
			}
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	
	/**
	 * 按应用查询关联资源
	 * @return
	 */
	public String getAppRelaObjects() {
		try {
			JSONObject ret = cmdbConfigManager.getAppRelaObjs(appId);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", ret));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 按应用查询关联资源
	 * @return
	 */
	public String getObjRelData() {
		try {
			 List<Map<String, Object>> ret = cmdbConfigManager.getObjRelations(objId);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", ret));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 按应用查询关联资源
	 * @return
	 */
	public String getAppTopo() {
		try {
			 List<Map<String, Object>> ret = cmdbConfigManager.getAppTopo(appId);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", ret));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 添加对象上下游关系
	 * @return
	 */
	public String addObjRela() {
		try {
			 boolean ret = cmdbConfigManager.addObjRel(upFlag, objId, JSONArray.parseArray(nodeList));
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", ret));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 删除对象关系
	 * @return
	 */
	public String delObjRela() {
		try {
			 boolean ret = cmdbConfigManager.delObjRel(record_id);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", ret));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}


	/**
	 * 生成应用访问关系SVG图
	 * 
	 * @param msg
	 * @return
	 */
	public String getAppSvgInfo() {
		try {
			JSONObject ret = svgInfo.getSvgInfo(new JSONObject());
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", ret));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 生成应用源SVG图
	 * 
	 * @param msg
	 * @return
	 */
	public String getAppSourceSvgInfo() {
		try {
			 JSONObject ret = svgInfo.getAppSourceSvgInfo(appId, appName);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", ret));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
}
