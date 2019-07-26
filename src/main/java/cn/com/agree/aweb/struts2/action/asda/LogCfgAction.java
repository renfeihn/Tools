package cn.com.agree.aweb.struts2.action.asda;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.struts2.ServletActionContext;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import tc.bank.asda.logconfig.model.AimlCfgLogInfo;
import tc.bank.asda.logconfig.model.AimlCfgLogPrivateField;
import tc.bank.asda.logconfig.model.AimlCfgLogPublicField;
import tc.bank.asda.logconfig.model.AimlCfgLogSplitField;
import tc.bank.asda.logconfig.service.IAimlCfgLogService;
import tc.bank.asda.logconfig.service.IAimlSplitMethodService;
import tc.cama.aweb.model.AwebUser;

@Controller("LogCfgActionBean")
@Scope("prototype")
public class LogCfgAction extends StandardActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7697873254410542368L;

	@Autowired
	private IAimlCfgLogService logService;
	
	@Autowired
	private IAimlSplitMethodService splitMethodService;

	private long logId;

	private String typeName;

	private long typeId;

	private String cfgLogInfo;
	
	private String cate;

	private String publicFields;

	private String privateFields;
	
	private File file;
	
	private String fileName;
	
	private InputStream inStream;
	
	private int methodType;
	
	private long methodId;
	
	private String str;
	/**
	 * 脚本类型 regex/groovy/python
	 */
	private String scriptName;
	/**
	 * 脚本
	 */
	private String script;
	/**
	 * 选方法参数按照入参顺序
	 */
	private Object[] values;
	/**
	 * logEvent正则表达式
	 */
	private String logEventRegex;
	
	
	
	public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public void setInStream(InputStream inStream) {
	   this.inStream = inStream;
	}
	
	public int getMethodType() {
		return methodType;
	}

	public void setMethodType(int methodType) {
		this.methodType = methodType;
	}

	public long getMethodId() {
		return methodId;
	}

	public void setMethodId(long methodId) {
		this.methodId = methodId;
	}

	public InputStream getInStream(){
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
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public long getTypeId() {
		return typeId;
	}

	public void setTypeId(long typeId) {
		this.typeId = typeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public long getLogId() {
		return logId;
	}

	public void setLogId(long logId) {
		this.logId = logId;
	}

	public String getCfgLogInfo() {
		return cfgLogInfo;
	}

	public void setCfgLogInfo(String cfgLogInfo) {
		this.cfgLogInfo = cfgLogInfo;
	}

	public String getPublicFields() {
		return publicFields;
	}

	public void setPublicFields(String publicFields) {
		this.publicFields = publicFields;
	}

	public String getPrivateFields() {
		return privateFields;
	}

	public void setPrivateFields(String privateFields) {
		this.privateFields = privateFields;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}
	
	public String getStr() {
		return str;
	}

	public void setStr(String str) {
		this.str = str;
	}

	public String getScriptName() {
		return scriptName;
	}

	public void setScriptName(String scriptName) {
		this.scriptName = scriptName;
	}

	public String getScript() {
		return script;
	}

	public void setScript(String script) {
		this.script = script;
	}

	public Object[] getValues() {
		return values;
	}

	public void setValues(Object[] values) {
		this.values = values;
	}

	public String getLogEventRegex() {
		return logEventRegex;
	}

	public void setLogEventRegex(String logEventRegex) {
		this.logEventRegex = logEventRegex;
	}

	/**
	 * 获取所有的配置分类
	 * 
	 * @return
	 */
	public String getCfgLogStatistics() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logService.getCfgLogStatistics()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 添加配置分类
	 * 
	 * @param
	 */
	public String addCfgLogType() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logService.addCfgLogType(typeName)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 修改配置分类
	 * 
	 * @param
	 * @param
	 */
	public String updateCfgLogType() {
		try {
			if (logService.updateCfgLogType(typeId, typeName)) {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
				return SUCCESS;
			}
			return ERROR;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 根据分类ID获取日志配置信息列表
	 * 
	 * @param
	 * @return
	 */
	public String getCfgLogInfoByTypeId() {
		try {
			setStrutsMessage(
					StrutsMessage.successMessage().addParameter("result", logService.getCfgLogInfoByTypeId(typeId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 添加/修改日志配置信息
	 * 
	 * @param
	 * @param
	 * @param
	 * @return
	 */
	public String addCfgLogInfo() {
		try {
			AimlCfgLogInfo info = JSONObject.parseObject(cfgLogInfo, AimlCfgLogInfo.class);
			List<AimlCfgLogPublicField> pubFields = JSONObject.parseArray(publicFields, AimlCfgLogPublicField.class);
			List<AimlCfgLogPrivateField> priFields = JSONObject.parseArray(privateFields, AimlCfgLogPrivateField.class);
			if (logService.addCfgLogInfo(info, pubFields, priFields)) {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
				return SUCCESS;
			}
			return ERROR;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 获取日志配置信息
	 * 
	 * @param
	 * @param
	 * @param
	 * @return
	 */
	public String getCfgLogInfoById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",logService.getCfgLogInfo(logId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	public String getCfgLogInfoNewById() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",logService.getCfgLogInfoNew()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	
	
	public String getCfgLogInfoByCate() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result",logService.getCfgLogInfoSource(cate)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 删除日志配置信息
	 * 
	 * @param
	 * @return
	 */
	public String delCfgLogInfo() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logService.delCfgLogInfo(logId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}

	/**
	 * 删除配置分类（包含下面的配置信息）
	 * 
	 * @param
	 * @return
	 */
	public String delCfgLogType() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logService.delCfgLogType(typeId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 导出文件
	 * 
	 * @param
	 * @return
	 */
	public String exportFile() {
		FileOutputStream fos = null;
		try {
			fileName = "Aim日志采集配置_"+logId+".xml";
			fileName = new String(fileName.getBytes(), "ISO8859-1");//解决文件名中含有中文不显示的问题
			String xml = logService.exportFile(logId);
			String path = ServletActionContext.getServletContext().getRealPath("download" + File.separator + fileName);
			File downFilePath = new File(ServletActionContext.getServletContext().getRealPath("download"));
			if(!downFilePath.exists()) {
				downFilePath.mkdirs();
			}
		    File file = new File(path);
		    if(file.exists()) {
		    		file.delete();
		    }
		    file.createNewFile();
		    fos = new FileOutputStream(file);
		    fos.write(xml.getBytes("UTF-8"));
		    return "stream";
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		} finally {
			try {
				if(null != fos) {
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 导入文件
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String importFile() {
		try {
			SAXReader read = new SAXReader();
			Document documen = read.read(file);
			if (null == documen) {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "文件解析失败"));
				return ERROR;
			}
			Element root = documen.getRootElement();
			String rootName = root.getName();
			if(!"logInfo".equals(rootName)) {
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "文件解析失败"));
				return ERROR;
			}else {
				AimlCfgLogInfo info = new AimlCfgLogInfo();
				Attribute logNameAtt =root.attribute("logName");
				if(null != logNameAtt) {
					info.setLogName(logNameAtt.getText());
				}
				Attribute typeIdAtt =root.attribute("typeId");
				if(null != typeIdAtt) {
					info.setTypeId(Long.valueOf(typeIdAtt.getText()));
				}
				Attribute typeName =root.attribute("typeName");
				if(null != typeName) {
					info.setTypeName(typeName.getText());
				}
				Attribute logCoding =root.attribute("logCoding");
				if(null != logCoding) {
					info.setLogCoding(logCoding.getText());
				}
				Attribute logType =root.attribute("logType");
				if(null != logType) {
					info.setLogType(logType.getText());
				}
				Attribute lineFlag =root.attribute("lineFlag");
				if(null != lineFlag) {
					info.setLineFlag(lineFlag.getText());
				}
				Attribute dirExample =root.attribute("dirExample");
				if(null != dirExample) {
					info.setDirExample(dirExample.getText());
				}
				Attribute logEventRegex =root.attribute("logEventRegex");
				if(null != logEventRegex) {
					info.setLogEventRegex(logEventRegex.getText());
				}
				Attribute mulitiLineType =root.attribute("mulitiLineType");
				if(null != mulitiLineType) {
					info.setMulitiLineType(mulitiLineType.getText());
				}
				Element dataExampleElement = root.element("dataExample");
				if(null != dataExampleElement) {
					info.setDataExample(StringEscapeUtils.escapeXml(dataExampleElement.getText()));
				}
				
				List<AimlCfgLogPublicField> publicFields = new ArrayList<>();;
				Element publicFieldsElement = root.element("publicFields");
				if(null != publicFieldsElement) {
					List<Element> publicFieldsElements = publicFieldsElement.elements("publicField");
					if(null != publicFieldsElements && publicFieldsElements.size()>0) {
						for(Element element : publicFieldsElements) {
							AimlCfgLogPublicField publicField = new AimlCfgLogPublicField();
							Attribute fieldKey = element.attribute("fieldKey");
							if(null != fieldKey) {
								publicField.setFieldKey(fieldKey.getText());
							}
							Attribute fieldName = element.attribute("fieldName");
							if(null != fieldName) {
								publicField.setFieldName(fieldName.getText());
							}
						
							Attribute dataSource = element.attribute("dataSource");
							if(null != dataSource) {
								publicField.setDataSource(dataSource.getText());
							}
							Attribute fieldRegex = element.attribute("fieldRegex");
							if(null != fieldRegex) {
								publicField.setFieldRegex(fieldRegex.getText());
							}
							publicFields.add(publicField);
						}
					}
				}
				
				List<AimlCfgLogPrivateField> privateFields = new ArrayList<>();;
				Element privateFieldsElement = root.element("privateFields");
				if(null != privateFieldsElement) {
					List<Element> privateFieldsElements = privateFieldsElement.elements("privateField");
					if(null != privateFieldsElements && privateFieldsElements.size()>0) {
						for(Element element : privateFieldsElements) {
							AimlCfgLogPrivateField privateField = new AimlCfgLogPrivateField();
							Attribute splitFlag = element.attribute("splitFlag");
							if(null != splitFlag) {
								privateField.setSplitFlag(splitFlag.getText());
							}
							Element splitScript = element.element("splitScript");
							if(null != splitScript) {
								privateField.setSplitScript(splitScript.getText());
							}
							Element splitFieldsElement = element.element("splitFields");
							if(null != splitFieldsElement) {
								List<Element> splitFieldElements = splitFieldsElement.elements("splitField");
								if(null != splitFieldElements) {
									List<AimlCfgLogSplitField> splitFields = new ArrayList<>();
									for(Element temp : splitFieldElements) {
										AimlCfgLogSplitField splitField = new AimlCfgLogSplitField();
										Attribute fieldKey = temp.attribute("fieldKey");
										if(null != fieldKey) {
											splitField.setFieldKey(fieldKey.getText());
										}
										Attribute defaultKey = temp.attribute("defaultKey");
										if(null != defaultKey) {
											splitField.setDefaultKey(defaultKey.getText());
										}
										Attribute fieldDesc = temp.attribute("fieldDesc");
										if(null != fieldDesc) {
											splitField.setFieldDesc(fieldDesc.getText());
										}
										Attribute fieldType = temp.attribute("fieldType");
										if(null != fieldType) {
											splitField.setFieldType(fieldType.getText());
										}
										Attribute isLink = temp.attribute("isLink");
										if(null != isLink) {
											splitField.setIsLink(Integer.valueOf(isLink.getText()));
										}
										Attribute splitParam = temp.attribute("splitParam");
										if(null != splitParam) {
											splitField.setSplitParam(splitParam.getText());
										}
										Attribute splitMethod = temp.attribute("splitMethod");
										if(null != splitMethod) {
											splitField.setSplitMethod(Long.valueOf(splitMethod.getText()));
										}
										Attribute fieldCheck = temp.attribute("fieldCheck");
										if(null != fieldCheck) {
											splitField.setFieldCheck(fieldCheck.getText());
										}
										Attribute checkValue = temp.attribute("checkValue");
										if(null != checkValue) {
											splitField.setCheckValue(checkValue.getText());
										}
										Attribute fieldScript = temp.attribute("fieldScript");
										splitField.setFieldScript(fieldScript != null ? fieldScript.getText():null);
										splitFields.add(splitField);
									}
									privateField.setSplitFields(splitFields);
								}
							}
							privateFields.add(privateField);
						}
					}
				}
				if (logService.addCfgLogInfo(info, publicFields, privateFields)) {
					setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
					return SUCCESS;
				}else{
					setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "文件导入失败"));
					return ERROR;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		} 
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
	/**
	 * 获取配置文件的结构化字段
	 * 
	 * @param logId
	 * @return
	 */
	public String getCfgLogFields() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logService.getCfgLogFields(logId)));
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
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logService.getEciCommonConfig()));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	/**
	 * 获取方法列表
	 * 
	 * @param logId
	 * @return
	 */
	public String getMethod() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", splitMethodService.getMethod(methodType)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取方法参数
	 */
	public String getMethodParams() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", splitMethodService.getMethodParams(methodId)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 字符串转正则
	 */
	public String analysisRegex() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", splitMethodService.analysisRegex(str)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取函数表达式
	 * @return
	 */
	public String getFieldScript() {
		try {
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", splitMethodService.getFieldScript(methodId, values)));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	/**
	 * 获取字段拆分
	 * @return
	 */
	public String getMatch() {
		try {
			List<String> matchResult = null;
			if(scriptName.equals("regex")) {
				matchResult = splitMethodService.getRegexMatch(script, str,logEventRegex);
			}else{
				matchResult = splitMethodService.getCodeMatch(scriptName, script, str,logEventRegex);
			}
			setStrutsMessage(StrutsMessage.successMessage().addParameter("result", matchResult));
			return SUCCESS;
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String addCfgLogInfoNew() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				AimlCfgLogInfo info = JSONObject.parseObject(cfgLogInfo, AimlCfgLogInfo.class);
				List<AimlCfgLogPublicField> pubFields = JSONObject.parseArray(publicFields, AimlCfgLogPublicField.class);
				if (logService.addCfgLogInfoNew(info, pubFields)) {
					setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
					return SUCCESS;
				}
				return ERROR;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
	public String delCfgLogInfoNew() {
		try {
			AwebUser userVO = this.getUserVO();
			if (null == userVO) {
				setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
				return ERROR;
			} else {
				if(logId <= 0) {
					setStrutsMessage(StrutsMessage.errorMessage("参数错误"));
					return ERROR;
				}
				setStrutsMessage(StrutsMessage.successMessage().addParameter("result", logService.delCfgLogInfoNew(logId)));
				return SUCCESS;
			}
		} catch (Exception e) {
			setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
			return ERROR;
		}
	}
	
}
