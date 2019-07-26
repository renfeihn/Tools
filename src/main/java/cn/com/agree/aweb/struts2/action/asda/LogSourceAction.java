package cn.com.agree.aweb.struts2.action.asda;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.bean.AimConfigDictVO;
import tc.bank.asda.logconfig.bean.AimConfigInfo;
import tc.bank.asda.logconfig.bean.AimConfigInfoTab;
import tc.bank.asda.logconfig.bean.AimConfigSplitVO;
import tc.bank.asda.logconfig.model.AimlConfigSplitElement;
import tc.bank.asda.logconfig.service.IAimLogConfigService;

@Controller("LogSourceActionBean")
@Scope("prototype")
public class LogSourceAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -774339103279428853L;

	@Autowired
	private IAimLogConfigService aimLogConfigService;

	private String splittype;
	private String classname;
	private String elename;
	
	/**
	 * 一级分类
	 */
	private String category1;

	/**
	 * 二级分类
	 */
	private String category2;

	/**
	 * 三级分类
	 */
	private String category3;

	/**
	 * 对象ID
	 */
	private String objectId;

	/**
	 * 对象名称
	 */
	private String objectName;

	/**
	 * 应用系统ID
	 */
	private String applicationId;

	/**
	 * 应用系统名称
	 */
	private String applicationName;

	/**
	 * 对象ID
	 */
	private String serverIp;

	/**
	 * 日志源别名:r+序号
	 */
	private String logId;
	
	/**
	 * 日志源类型
	 */
	private String logSourceType;

	/**
	 * 是否从末尾开始扫描:false/true(初次使用时的扫描方式设置以及较长时间未进行文件采集时生效)
	 */
	private String skipToEnd;

	/**
	 * 是否在消息头追加文件名称:false/true
	 */
	private String fileHeader;

	/**
	 * 是否在消息头追加当前位置:false/true
	 */
	private String byteOffSetHeader;

	/**
	 * 是否缓存扫描目录配置:false/true
	 */
	private String cachePatternMatching;

	/**
	 * 消息头中文件名变量名称
	 */
	private String fileHeaderKey;

	/**
	 * 扫描目录缓存周期,单位:秒
	 */
	private String cachePatternInterval;

	/**
	 * 日志源使用通道
	 */
	private String channels;

	/**
	 * 日志源文件组名
	 */
	private String fileGroupsId;

	/**
	 * 日志源文件信息
	 */
	private String fileName;

	/**
	 * 日志源文件字符集
	 */
	private String encoding;

	/**
	 * 拦截器名称
	 */
	private String interceptorsId;

	/**
	 * 拦截器类型
	 */
	private String interceptorsType;

	/**
	 * 拦截表达式
	 */
	private String lineRegex;

	/**
	 * 是否生成流水号:false/true
	 */
	private String txGenerateFlowNo;

	/**
	 * 处理开始匹配表达式
	 */
	private String startRegex;

	/**
	 * 处理结束匹配表达式
	 */
	private String endRegex;

	/**
	 * 采集状态:true-开启,false-关闭
	 */
	private boolean logStatus;
	
	/**
	 * 日志描述
	 */
	private String filedesc;
	
	
	/**
	 * 所有报文分割器
	 */
	private String configInfoTabs;
	
	/**
	 * 功能分类
	 */
	private String functype;
	
	/**
	 * 功能描述
	 */
	private String funcdesc;
	
	/**
	 * 匹配规则
	 */
	private String logregex;
	
	/**
	 * 拆分脚本方式:1-可视化配置 2-python脚本 3-groovy脚本
	 */
	private String scripttype;
	
	/**
	 * 拆分脚本:脚本内容
	 */
	private String scriptcontext;

	public IAimLogConfigService getAimLogConfigService() {
		return aimLogConfigService;
	}

	public void setAimLogConfigService(IAimLogConfigService aimLogConfigService) {
		this.aimLogConfigService = aimLogConfigService;
	}
	
	public String getConfigInfoTabs() {
		return configInfoTabs;
	}

	public void setConfigInfoTabs(String configInfoTabs) {
		this.configInfoTabs = configInfoTabs;
	}

	public String getFunctype() {
		return functype;
	}

	public void setFunctype(String functype) {
		this.functype = functype;
	}

	public String getFuncdesc() {
		return funcdesc;
	}

	public void setFuncdesc(String funcdesc) {
		this.funcdesc = funcdesc;
	}

	public String getLogregex() {
		return logregex;
	}

	public void setLogregex(String logregex) {
		this.logregex = logregex;
	}

	public String getScripttype() {
		return scripttype;
	}

	public void setScripttype(String scripttype) {
		this.scripttype = scripttype;
	}

	public String getScriptcontext() {
		return scriptcontext;
	}

	public void setScriptcontext(String scriptcontext) {
		this.scriptcontext = scriptcontext;
	}

	public String getCategory1() {
		return category1;
	}

	public void setCategory1(String category1) {
		this.category1 = category1;
	}

	public String getCategory2() {
		return category2;
	}

	public void setCategory2(String category2) {
		this.category2 = category2;
	}

	public String getCategory3() {
		return category3;
	}

	public void setCategory3(String category3) {
		this.category3 = category3;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public String getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getServerIp() {
		return serverIp;
	}

	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public String getLogSourceType() {
		return logSourceType;
	}

	public void setLogSourceType(String logSourceType) {
		this.logSourceType = logSourceType;
	}

	public String getSkipToEnd() {
		return skipToEnd;
	}

	public void setSkipToEnd(String skipToEnd) {
		this.skipToEnd = skipToEnd;
	}

	public String getFileHeader() {
		return fileHeader;
	}

	public void setFileHeader(String fileHeader) {
		this.fileHeader = fileHeader;
	}

	public String getByteOffSetHeader() {
		return byteOffSetHeader;
	}

	public void setByteOffSetHeader(String byteOffSetHeader) {
		this.byteOffSetHeader = byteOffSetHeader;
	}

	public String getFileHeaderKey() {
		return fileHeaderKey;
	}

	public void setFileHeaderKey(String fileHeaderKey) {
		this.fileHeaderKey = fileHeaderKey;
	}

	public String getCachePatternInterval() {
		return cachePatternInterval;
	}

	public String getCachePatternMatching() {
		return cachePatternMatching;
	}

	public void setCachePatternMatching(String cachePatternMatching) {
		this.cachePatternMatching = cachePatternMatching;
	}

	public void setCachePatternInterval(String cachePatternInterval) {
		this.cachePatternInterval = cachePatternInterval;
	}

	public String getChannels() {
		return channels;
	}

	public void setChannels(String channels) {
		this.channels = channels;
	}

	public String getFileGroupsId() {
		return fileGroupsId;
	}

	public void setFileGroupsId(String fileGroupsId) {
		this.fileGroupsId = fileGroupsId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getEncoding() {
		return encoding;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public String getInterceptorsId() {
		return interceptorsId;
	}

	public void setInterceptorsId(String interceptorsId) {
		this.interceptorsId = interceptorsId;
	}

	public String getInterceptorsType() {
		return interceptorsType;
	}

	public void setInterceptorsType(String interceptorsType) {
		this.interceptorsType = interceptorsType;
	}

	public String getLineRegex() {
		return lineRegex;
	}

	public void setLineRegex(String lineRegex) {
		this.lineRegex = lineRegex;
	}

	public String getTxGenerateFlowNo() {
		return txGenerateFlowNo;
	}

	public void setTxGenerateFlowNo(String txGenerateFlowNo) {
		this.txGenerateFlowNo = txGenerateFlowNo;
	}

	public String getStartRegex() {
		return startRegex;
	}

	public void setStartRegex(String startRegex) {
		this.startRegex = startRegex;
	}

	public String getEndRegex() {
		return endRegex;
	}

	public void setEndRegex(String endRegex) {
		this.endRegex = endRegex;
	}
	
	public String getFiledesc() {
		return filedesc;
	}

	public void setFiledesc(String filedesc) {
		this.filedesc = filedesc;
	}

	public String getSplittype() {
		return splittype;
	}

	public void setSplittype(String splittype) {
		this.splittype = splittype;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getElename() {
		return elename;
	}

	public void setElename(String elename) {
		this.elename = elename;
	}

	public boolean isLogStatus() {
		return logStatus;
	}

	public void setLogStatus(boolean logStatus) {
		this.logStatus = logStatus;
	}

	/**
	 * 根据对象ID查询日志源信息
	 */
	public String getSourceConfig() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("sourceList", aimLogConfigService.getSourceConfigDesc(objectId)).addParameter("statistics", aimLogConfigService.sourceStatistic(objectId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 根据对象和日志源ID查找报文分割器
	 */
	public String getSplits() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimLogConfigService.getSplitBySource(objectId, logId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 新增日志源配置
	 */
	public String saveSourceConfig() {
		AimConfigInfo configInfo = new AimConfigInfo();
		configInfo.setCategory1(category1);
		configInfo.setCategory2(category2);
		configInfo.setCategory3(category3);
		configInfo.setObjectid(objectId);
		configInfo.setObjectName(objectName);
		configInfo.setApplicationId(applicationId);
		configInfo.setApplicationName(applicationName);
		configInfo.setChannelid(channels);
		configInfo.setSkipToEnd(skipToEnd);
		configInfo.setEncoding(encoding);
		configInfo.setStartRegex(startRegex);
		configInfo.setEndRegex(endRegex);
		configInfo.setFileName(fileName);
		configInfo.setLineRegex(lineRegex);
		configInfo.setFiledesc(filedesc);
		configInfo.setLogid(logId);
		configInfo.setServiceIP(serverIp);
		configInfo.setTxGenerateFlowNo(txGenerateFlowNo);
		configInfo.setCachePatternInterval(cachePatternInterval);
		try {
			aimLogConfigService.saveSourceConfig(configInfo);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	

	/**
	 * 新增日志源信息
	 */
	public String saveSplit() {
		JSONArray array = JSON.parseArray(configInfoTabs);
		if(array!=null && array.size()>0){
			List<AimConfigInfoTab> tabs = new ArrayList<AimConfigInfoTab>();
			for(Object o : array){
				AimConfigInfoTab tab = new AimConfigInfoTab();
				JSONObject jsonTab = (JSONObject)o;
				AimConfigSplitVO splitVo = new AimConfigSplitVO();
				splitVo.setLogid(logId);
				splitVo.setObjectid(objectId);
				splitVo.setApplicationId(applicationId);
				splitVo.setDictid(jsonTab.getString("dictId"));
				splitVo.setFuncdesc(jsonTab.getString("funcdesc"));
				splitVo.setFunctype(jsonTab.getString("functype"));
				splitVo.setLogregex(jsonTab.getString("logregex"));
				splitVo.setScripttype(jsonTab.getString("scripttype"));
				splitVo.setScriptcontext(jsonTab.getString("scriptcontext"));
				//组织所有的字段配置到split中
				JSONArray elements = jsonTab.getJSONArray("elements");
				if(elements!=null && elements.size()>0){
					List<AimlConfigSplitElement> aimEles = new ArrayList<AimlConfigSplitElement>();
					for(int i=0;i<elements.size();i++){
						JSONObject element = elements.getJSONObject(i);
						String elementname = element.getString("elementname");
						String systype = element.getString("systype");
						String scriptcontext = element.getString("scriptcontext");
						String classname = element.getString("classname");
						AimlConfigSplitElement e = new AimlConfigSplitElement();
						e.setClassname(classname);
						e.setScriptcontext(scriptcontext);
						e.setSystype(systype);
						e.setElementname(elementname);
						e.setObjectid(objectId);
						e.setLogid(logId);
						aimEles.add(e);
					}
					splitVo.setElementContexts(aimEles);
				}
				tab.setSplitVO(splitVo);
				
				JSONArray dictArray = jsonTab.getJSONArray("dictVOList");
				List<AimConfigDictVO> dicts = new ArrayList<AimConfigDictVO>();
				for(int i=0;i<dictArray.size();i++){
					JSONObject jsonDict = dictArray.getJSONObject(i);
					AimConfigDictVO dictVo = new AimConfigDictVO();
					dictVo.setCategory1(category1);
					dictVo.setCategory2(category2);
					dictVo.setCategory3(category3);
					dictVo.setDictdesc(jsonDict.getString("dictdesc"));
					dictVo.setFiledesc(jsonDict.getString("filedesc"));
					dictVo.setFilefield(jsonDict.getString("filefield"));
					dictVo.setFiletype(jsonDict.getString("filetype"));
					dictVo.setApplicationId(applicationId);
					dictVo.setObjectid(objectId);
					dictVo.setLogid(logId);
					dicts.add(dictVo);
				}
				if(dicts.size()>0){
					tab.setDictVOList(dicts);
				}
				tabs.add(tab);
			}
			try {
				aimLogConfigService.saveSplits(tabs);
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
				return SUCCESS;
			} catch (Exception e) {
				setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
				return ERROR;
			}
		}else{
			setStrutsMessage(StrutsMessage.errorMessage("configInfoTabs为空!"));
			return ERROR;
		}
		
	}
	
	/**
	 * 
	 * @return
	 */
	public String getSplitElements(){
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimLogConfigService.getSplitElements(splittype, classname, elename)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	
	/**
	 * 获取Eci公共配置
	 */
	public String getEciCommonConfig() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", aimLogConfigService.getEciCommonConfig()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**启动/停止某个对象下面的日志源配置
	 * @return
	 */
	public String enableSourceConfig() {
		try {
			aimLogConfigService.enableSourceConfig(objectId, logId, logStatus);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**删除日志源
	 * @return
	 */
	public String deleteSourceConfig() {
		try {
			aimLogConfigService.deleteSource(objectId, logId);
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
}
