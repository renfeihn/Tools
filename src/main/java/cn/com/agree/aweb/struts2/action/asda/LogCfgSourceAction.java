package cn.com.agree.aweb.struts2.action.asda;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.aim.alibaba.fastjson.JSONArray;
import com.aim.alibaba.fastjson.JSONObject;

import cn.com.agree.aweb.exception.ExceptionTypes.AWEB;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.SFTPUtil;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceAgent;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceHttp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceJDBC;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceKafka;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceManualUp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceServiceIn;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceSnmp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceSnmpKey;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceSyslog;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceTcp;
import tc.bank.asda.logconfig.model.AimlCfgLogSourceTrap;
import tc.bank.asda.logconfig.model.AimlCfgLogSplitFieldV1;
import tc.bank.asda.logconfig.service.IAimlCfgLogSourceService;
import tc.cama.aweb.model.AwebUser;

@Controller("LogCfgSourceActionBean")
@Scope("prototype")
public class LogCfgSourceAction extends StandardActionSupport {

    /**
     *
     */
    private static final long serialVersionUID = -774339103279428853L;

    @Autowired
    private IAimlCfgLogSourceService sourceService;

    //数据源分类
    private String sourceType;
    //数据源ID
    private long sourceId;
    //日志源
    private String source;
    //日志源状态
    private String runStatus;
    //日志源名称
    private String sourceName;
    //AIM服务器当前路径
    private String dir;
    //上传的文件
    private File file;
    //文件名
    private String fileName;
    //日志源id集合
    private String sourceids;

    private String appid;
    private String cate;

    private String querytype;

    private String queryvalue;
    //手工上传-ftp地址
    private String ip;
    //手工上传-ftp端口
    private int port;
    //手工上传-ftp用户
    private String user;
    //手工上传-ftp密码
    private String pass;
    //手工上传-ftp文件名/目录
    private String ftpFile;
    //手工上传-本地下载目录名
    private String filePath;

    private boolean judgeBatch;
    /**
     * 私有字段
     */
    private String privateFields;

    private List<Long> sourceIds;

    public boolean isJudgeBatch() {
        return judgeBatch;
    }

    public void setJudgeBatch(boolean judgeBatch) {
        this.judgeBatch = judgeBatch;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
    

    public String getCate() {
		return cate;
	}

	public void setCate(String cate) {
		this.cate = cate;
	}

	public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getFtpFile() {
        return ftpFile;
    }

    public void setFtpFile(String ftpFile) {
        this.ftpFile = ftpFile;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getQuerytype() {
        return querytype;
    }

    public void setQuerytype(String querytype) {
        this.querytype = querytype;
    }

    public String getQueryvalue() {
        return queryvalue;
    }

    public void setQueryvalue(String queryvalue) {
        this.queryvalue = queryvalue;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getSourceids() {
        return sourceids;
    }

    public void setSourceids(String sourceids) {
        this.sourceids = sourceids;
    }

    public String getSourceType() {
        return sourceType;
    }

    public void setSourceType(String sourceType) {
        this.sourceType = sourceType;
    }

    public long getSourceId() {
        return sourceId;
    }

    public void setSourceId(long sourceId) {
        this.sourceId = sourceId;
    }

    public String getRunStatus() {
        return runStatus;
    }

    public void setRunStatus(String runStatus) {
        this.runStatus = runStatus;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getDir() {
        return dir;
    }

    public void setDir(String dir) {
        this.dir = dir;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getPrivateFields() {
        return privateFields;
    }

    public void setPrivateFields(String privateFields) {
        this.privateFields = privateFields;
    }

    public List<Long> getSourceIds() {
        return sourceIds;
    }

    public void setSourceIds(List<Long> sourceIds) {
        this.sourceIds = sourceIds;
    }

    public enum LogSourceType {

        Agent("Agent采集"),
        ManualUp("本地上传"),
        ServiceUP("服务端上传"),
        ServiceInUDP("UDP服务"),
        ServiceInTCP("TCP服务"),
        ServiceInHTTP("HTTP服务"),
        ServiceInSNMP("SNMP服务"),
        ServiceInJdbc("JDBC接入"),
        ServiceInKafka("Kafka接入"),
    	ServiceInSyslog("Syslog接入"),
    	ServiceInTcp("TCP接入"),
    	ServiceInHttp("HTTP接入"),
    	ServiceInTrap("Trap接入");

        private String name;

        public String getName() {
            return name;
        }

        private LogSourceType(String name) {
            this.name = name;
        }
    }

    /**
     * 获取日志配置源统计信息
     *
     * @return
     */
    public String getLogSourceStatistics() {
        try {
            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", sourceService.getLogSourceStatistics()));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 获取日志源分类下的日志列表
     *
     * @return
     */
    public String getLogSources() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (sourceType.equals(LogSourceType.Agent.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getSourceAgentLog()));
            } else if (sourceType.equals(LogSourceType.ManualUp.getName()) || sourceType.equals(LogSourceType.ServiceUP.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getSourceManualUp(sourceType)));
            } else if (sourceType.equals(LogSourceType.ServiceInUDP.getName())
                    || sourceType.equals(LogSourceType.ServiceInTCP.getName())
                    || sourceType.equals(LogSourceType.ServiceInHTTP.getName())
                    || sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getSourceServiceIn(sourceType)));
            } else if (sourceType.equals(LogSourceType.ServiceInJdbc.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getSourceJDBC()));
            } else if (sourceType.equals(LogSourceType.ServiceInKafka.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getSourceKafka()));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 删除日志源
     *
     * @return
     */
    public String delCfgLogSource() {
        try {
            if (sourceService.delSource(sourceId)) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", "删除成功"));
            } else {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", "删除失败"));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 添加日志源
     *
     * @return
     */
    public String addCfgLogSource() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (sourceType.equals(LogSourceType.Agent.getName())) {
                AimlCfgLogSourceAgent agent = JSONObject.parseObject(source, AimlCfgLogSourceAgent.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceAgent(agent)));
            } else if (sourceType.equals(LogSourceType.ManualUp.getName()) || sourceType.equals(LogSourceType.ServiceUP.getName())) {
                AimlCfgLogSourceManualUp manualUp = JSONObject.parseObject(source, AimlCfgLogSourceManualUp.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceManualUp(manualUp)));
            } else if (sourceType.equals(LogSourceType.ServiceInUDP.getName())
                    || sourceType.equals(LogSourceType.ServiceInTCP.getName())
                    || sourceType.equals(LogSourceType.ServiceInHTTP.getName())
                    || sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
                AimlCfgLogSourceServiceIn serviceIn = JSONObject.parseObject(source, AimlCfgLogSourceServiceIn.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceServiceIn(serviceIn)));
            } else if (sourceType.equals(LogSourceType.ServiceInJdbc.getName())) {
                AimlCfgLogSourceJDBC jdbcSource = JSONObject.parseObject(source, AimlCfgLogSourceJDBC.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceJDBC(jdbcSource)));
            } else if (sourceType.equals(LogSourceType.ServiceInKafka.getName())) {
                AimlCfgLogSourceKafka kafkaSource = JSONObject.parseObject(source, AimlCfgLogSourceKafka.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceKafka(kafkaSource)));
            }
            return SUCCESS;
        } catch (Exception e) {
            String[] error = e.getMessage().split("RuntimeException:");
            if (error.length == 2) {
                setStrutsMessage(StrutsMessage.errorMessage(error[1]));
            } else {
                setStrutsMessage(StrutsMessage.errorMessage(e.getMessage()));
            }
            return ERROR;
        }
    }

    /**
     * 新添加日志源及私有字段
     *
     * @return
     */
    public String addCfgLogSourceNew() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (sourceType.equals(LogSourceType.Agent.getName())) {
                AimlCfgLogSourceAgent agent = JSONObject.parseObject(source, AimlCfgLogSourceAgent.class);
                List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceAgentNew(agent, priFields)));
            } else if (sourceType.equals(LogSourceType.ManualUp.getName()) || sourceType.equals(LogSourceType.ServiceUP.getName())) {
                AimlCfgLogSourceManualUp manualUp = JSONObject.parseObject(source, AimlCfgLogSourceManualUp.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceManualUp(manualUp)));
//            } else if (sourceType.equals(LogSourceType.ServiceInUDP.getName())
//                    || sourceType.equals(LogSourceType.ServiceInTCP.getName())
//                    || sourceType.equals(LogSourceType.ServiceInHTTP.getName())
//                    || sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
//                AimlCfgLogSourceServiceIn serviceIn = JSONObject.parseObject(source, AimlCfgLogSourceServiceIn.class);
//                setStrutsMessage(
//                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceServiceIn(serviceIn)));
            } else if (sourceType.equals(LogSourceType.ServiceInJdbc.getName())) {
                AimlCfgLogSourceJDBC jdbcSource = JSONObject.parseObject(source, AimlCfgLogSourceJDBC.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceJDBC(jdbcSource)));
            } else if (sourceType.equals(LogSourceType.ServiceInKafka.getName())) {
                AimlCfgLogSourceKafka kafkaSource = JSONObject.parseObject(source, AimlCfgLogSourceKafka.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceKafka(kafkaSource)));
            }else if (sourceType.equals(LogSourceType.ServiceInSyslog.getName())) {
            	AimlCfgLogSourceSyslog syslogSource = JSONObject.parseObject(source, AimlCfgLogSourceSyslog.class);
            	String ips = syslogSource.getIps();
            	String ip = "";
            	if(ips.startsWith("[")) {
            		JSONArray ip_list = JSONArray.parseArray(ips);
            		for (Object o : ip_list) {
						ip += String.valueOf(o)+",";
					}
            		syslogSource.setIps(ip);
            	}
            	List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
            	setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceSyslog(syslogSource,priFields)));
            }else if (sourceType.equals(LogSourceType.ServiceInHttp.getName())) {
            	AimlCfgLogSourceHttp httpSource = JSONObject.parseObject(source, AimlCfgLogSourceHttp.class);
                
            	String ips = httpSource.getIps();
            	String ip = "";
            	if(ips.startsWith("[")) {
            		JSONArray ip_list = JSONArray.parseArray(ips);
            		for (Object o : ip_list) {
						ip += String.valueOf(o)+",";
					}
            		httpSource.setIps(ip);
            	}
            	List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
            	setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceHttp(httpSource,priFields)));
            }else if (sourceType.equals(LogSourceType.ServiceInTcp.getName())) {
            	AimlCfgLogSourceTcp tcpSource = JSONObject.parseObject(source, AimlCfgLogSourceTcp.class);
            	String ips = tcpSource.getIps();
            	String ip = "";
            	if(ips.startsWith("[")) {
            		JSONArray ip_list = JSONArray.parseArray(ips);
            		for (Object o : ip_list) {
						ip += String.valueOf(o)+",";
					}
            		tcpSource.setIps(ip);
            	}
            	List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
            	setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceTcp(tcpSource,priFields)));
            }else if (sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
            	AimlCfgLogSourceSnmp snmpSource = JSONObject.parseObject(source, AimlCfgLogSourceSnmp.class);
            	String ips = snmpSource.getIps();
            	String ip = "";
            	if(ips.startsWith("[")) {
            		JSONArray ip_list = JSONArray.parseArray(ips);
            		for (Object o : ip_list) {
						ip += String.valueOf(o)+",";
					}
            		snmpSource.setIps(ip);
            	}
            	
            	List<String> keyStringList = snmpSource.getKeyStringList();
            	for (String str : keyStringList) {
            		AimlCfgLogSourceSnmpKey snmpKeySource = JSONObject.parseObject(str, AimlCfgLogSourceSnmpKey.class);
            		snmpSource.addSnmpKey(snmpKeySource);
				}
            	
            	List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
            	setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceSnmp(snmpSource,priFields)));
            }else if (sourceType.equals(LogSourceType.ServiceInTrap.getName())) {
            	AimlCfgLogSourceTrap trapSource = JSONObject.parseObject(source, AimlCfgLogSourceTrap.class);
            	String ips = trapSource.getIps();
            	String ip = "";
            	if(ips.startsWith("[")) {
            		JSONArray ip_list = JSONArray.parseArray(ips);
            		for (Object o : ip_list) {
						ip += String.valueOf(o)+",";
					}
            		trapSource.setIps(ip);
            	}
            	
            	List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
            	setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.addSourceTrap(trapSource,priFields)));
            }
            return SUCCESS;
        } catch (Exception e) {
            String[] error = e.getMessage().split("RuntimeException:");
            if (error.length == 2) {
                setStrutsMessage(StrutsMessage.errorMessage(error[1]));
            } else {
                setStrutsMessage(StrutsMessage.errorMessage(e.getMessage()));
            }
            return ERROR;
        }
    }

    /**
     * 新增私有字段
     *
     * @return
     */
    public String addPrivateFields() {
        try {

            List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
            if (sourceService.newAddPrivateField(priFields, sourceId)) {
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
     * 修改私有字段
     *
     * @return
     */
    public String updatePrivateFields() {
        try {
            List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
            if (sourceService.newUpdatePrivateFields(priFields)) {
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
     * 删除私有字段
     *
     * @return
     */
    public String deletePrivateFields() {
        try {
            if (sourceService.newDeletePrivateField(sourceIds)) {
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
     * 根据sourceId查询私有字段
     *
     * @return
     */
    public String getPrivateFieldsBySourceId() {
        try {
            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", sourceService.getPrivateFields(sourceId)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }


    /**
     * 添加手工日志源
     *
     * @return
     */
    public String addAutoCfgLogSource() {
        try {
            if (StringUtils.isEmpty(sourceType) || StringUtils.isEmpty(source)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            }
            AimlCfgLogSourceAgent agent = JSONObject.parseObject(source, AimlCfgLogSourceAgent.class);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result",
                    sourceService.addFileBySource(judgeBatch, ip, port, user, pass, ftpFile, agent, filePath)));

            return SUCCESS;
        } catch (Exception e) {
            String[] error = e.getMessage().split("RuntimeException:");
            if (error.length == 2) {
                setStrutsMessage(StrutsMessage.errorMessage(error[1]));
            } else {
                setStrutsMessage(StrutsMessage.errorMessage(e.getMessage()));
            }
            return ERROR;
        }
    }

    /**
     * 修改日志源
     *
     * @return
     */
    public String updateLogCfgSource() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (sourceType.equals(LogSourceType.Agent.getName())) {
                AimlCfgLogSourceAgent agent = JSONObject.parseObject(source, AimlCfgLogSourceAgent.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceAgent(agent)));
            } else if (sourceType.equals(LogSourceType.ManualUp.getName()) || sourceType.equals(LogSourceType.ServiceUP.getName())) {
                AimlCfgLogSourceManualUp manualUp = JSONObject.parseObject(source, AimlCfgLogSourceManualUp.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceManualUp(manualUp)));
            } else if (sourceType.equals(LogSourceType.ServiceInUDP.getName())
                    || sourceType.equals(LogSourceType.ServiceInTCP.getName())
                    || sourceType.equals(LogSourceType.ServiceInHTTP.getName())
                    || sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
                AimlCfgLogSourceServiceIn serviceIn = JSONObject.parseObject(source, AimlCfgLogSourceServiceIn.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceServiceIn(serviceIn)));
            } else if (sourceType.equals(LogSourceType.ServiceInJdbc.getName())) {
                AimlCfgLogSourceJDBC jdbcSource = JSONObject.parseObject(source, AimlCfgLogSourceJDBC.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceJDBC(jdbcSource)));
            } else if (sourceType.equals(LogSourceType.ServiceInKafka.getName())) {
                AimlCfgLogSourceKafka kafkaSource = JSONObject.parseObject(source, AimlCfgLogSourceKafka.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceKafka(kafkaSource)));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 新修改日志源
     *
     * @return
     */
    public String updateLogCfgSourceNew() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (sourceType.equals(LogSourceType.Agent.getName())) {
                AimlCfgLogSourceAgent agent = JSONObject.parseObject(source, AimlCfgLogSourceAgent.class);
                List<AimlCfgLogSplitFieldV1> priFields = JSONObject.parseArray(privateFields, AimlCfgLogSplitFieldV1.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceAgentNew(agent, priFields)));
            } else if (sourceType.equals(LogSourceType.ManualUp.getName()) || sourceType.equals(LogSourceType.ServiceUP.getName())) {
                AimlCfgLogSourceManualUp manualUp = JSONObject.parseObject(source, AimlCfgLogSourceManualUp.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceManualUp(manualUp)));
            } else if (sourceType.equals(LogSourceType.ServiceInUDP.getName())
                    || sourceType.equals(LogSourceType.ServiceInTCP.getName())
                    || sourceType.equals(LogSourceType.ServiceInHTTP.getName())
                    || sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
                AimlCfgLogSourceServiceIn serviceIn = JSONObject.parseObject(source, AimlCfgLogSourceServiceIn.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceServiceIn(serviceIn)));
            } else if (sourceType.equals(LogSourceType.ServiceInJdbc.getName())) {
                AimlCfgLogSourceJDBC jdbcSource = JSONObject.parseObject(source, AimlCfgLogSourceJDBC.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceJDBC(jdbcSource)));
            } else if (sourceType.equals(LogSourceType.ServiceInKafka.getName())) {
                AimlCfgLogSourceKafka kafkaSource = JSONObject.parseObject(source, AimlCfgLogSourceKafka.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceKafka(kafkaSource)));
            } else if (sourceType.equals(LogSourceType.ServiceInSyslog.getName())) {
                AimlCfgLogSourceSyslog syslogSource = JSONObject.parseObject(source, AimlCfgLogSourceSyslog.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceSyslog(syslogSource)));
            } else if (sourceType.equals(LogSourceType.ServiceInTrap.getName())) {
                AimlCfgLogSourceTrap trapSource = JSONObject.parseObject(source, AimlCfgLogSourceTrap.class);
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.updateSourceTrap(trapSource)));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 修改日志源运行状态
     *
     * @return
     */
    public String updateRunStatus() {
        try {
            if (sourceService.updateSourceRunStatus(sourceId, runStatus)) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", "修改成功"));
            } else {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", "修改失败"));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 获取日志数据源
     *
     * @return
     */
    public String getSource() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (sourceType.equals(LogSourceType.Agent.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getAgentSource(sourceId)));
            } else if (sourceType.equals(LogSourceType.ManualUp.getName()) || sourceType.equals(LogSourceType.ServiceUP.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getManualUpSource(sourceId)));
            } else if (sourceType.equals(LogSourceType.ServiceInUDP.getName())
                    || sourceType.equals(LogSourceType.ServiceInTCP.getName())
                    || sourceType.equals(LogSourceType.ServiceInHTTP.getName())
                    || sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getServiceInSource(sourceId)));
            } else if (sourceType.equals(LogSourceType.ServiceInJdbc.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getJDBCSource(sourceId)));
            } else if (sourceType.equals(LogSourceType.ServiceInKafka.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getKafkaSource(sourceId)));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 新获取日志数据源详情
     *
     * @return
     */
    public String getSourceNew() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (sourceType.equals(LogSourceType.Agent.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getAgentSourceNew(sourceId)));
            } else if (sourceType.equals(LogSourceType.ManualUp.getName()) || sourceType.equals(LogSourceType.ServiceUP.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getManualUpSource(sourceId)));
//            } else if (sourceType.equals(LogSourceType.ServiceInUDP.getName())
//                    || sourceType.equals(LogSourceType.ServiceInTCP.getName())
//                    || sourceType.equals(LogSourceType.ServiceInHTTP.getName())
//                    || sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
//                setStrutsMessage(
//                        StrutsMessage.successMessage().addParameter("result", sourceService.getServiceInSource(sourceId)));
            } else if (sourceType.equals(LogSourceType.ServiceInJdbc.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getJDBCSource(sourceId)));
            } else if (sourceType.equals(LogSourceType.ServiceInKafka.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getKafkaSource(sourceId)));
            }else if (sourceType.equals(LogSourceType.ServiceInSyslog.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getSyslogSource(sourceId)));
            }else if (sourceType.equals(LogSourceType.ServiceInTrap.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getTrapSource(sourceId)));
            }else if (sourceType.equals(LogSourceType.ServiceInTcp.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getTcpSource(sourceId)));
            }else if (sourceType.equals(LogSourceType.ServiceInHttp.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getHttpSource(sourceId)));
            }else if (sourceType.equals(LogSourceType.ServiceInSNMP.getName())) {
                setStrutsMessage(
                        StrutsMessage.successMessage().addParameter("result", sourceService.getSnmpSource(sourceId)));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    
    /**
     * 获取日志源私有字段
     *
     * @return
     */
    public String getSourceField() {
        try {
            if (sourceId < 0) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getSourceField(sourceId)));
            } 
            return SUCCESS;
        }catch(	Exception e){
		setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
		return ERROR;
        }
    }

    
    /**
     * 判断数据源名称是否已存在
     *
     * @return
     */
    public String judgmentSourceName() {
        try {
            if (StringUtils.isEmpty(sourceName)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.judgmentSourceName(sourceName)));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 获取本地服务地址
     *
     * @return
     */
    public String getServices() {
        try {
            if (StringUtils.isEmpty(sourceType)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getServices(sourceType)));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 获取服务器目录列表
     *
     * @return
     */
    public String getHostDirs() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getHostDirs(dir)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 上传文件
     *
     * @return
     */
    public String uploadFile() {
        InputStream is = null;
        try {
            if (null == file || StringUtils.isEmpty(fileName)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (file.length() / 1024 / 1024 > 20) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "文件大小超过20M"));
            } else {
                Map<String, String> variables = sourceService.getSysConfigVariables("AIM");
                if (null == variables) {
                    setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "服务器参数未配置"));
                }
                String host = variables.get("host");
                String user = variables.get("user");
                String password = variables.get("password");
                String defaultFilePath = variables.get("default_file_path");
                if (StringUtils.isEmpty(host) || StringUtils.isEmpty(user) || StringUtils.isEmpty(password) || StringUtils.isEmpty(defaultFilePath)) {
                    setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "服务器参数未配置数据"));
                }
                SFTPUtil sftp = new SFTPUtil(user, password, host, 22);
                sftp.login();
                is = new FileInputStream(file);
                sftp.upload(defaultFilePath, fileName, is);
                sftp.logout();
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "OK"));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        } finally {
            try {
                if (null != is) {
                    is.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 根据应用系统app分类获取分类下的日志源列表
     *
     * @return [
     * {
     * appid:appid,
     * appname:appname,
     * sourceIds:[sourceId],
     * sourceNames:[sourceName]
     * }
     * ]
     */
    public String getSourcesGroupByApp() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getSourcesGroupByApp()));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 根据日志源id集合查询日志列表
     *
     * @return
     */
    public String getSourcesBySourceIds() {
        JSONArray sources = JSONArray.parseArray(sourceids);
        if (sources == null || sources.isEmpty()) {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少sources参数"));
        }
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getByIds(sources)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    public String getSouceListByCfg() {
        if (querytype == null || querytype.isEmpty()) {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少querytype参数"));
        }

        if (queryvalue == null || queryvalue.isEmpty()) {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少queryvalue参数"));
        }

        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getSourceList(querytype, queryvalue)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 刷新所有
     *
     * @return
     */
    public String refresh() {
        try {
            sourceService.refresh();
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "刷新完成"));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 暂停所有
     *
     * @return
     */
    public String stopAll() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.stopBySourceType(querytype, queryvalue)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 启动所有
     *
     * @return
     */
    public String startAll() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.startBySourceType(querytype, queryvalue)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 根据应用和分类查询数据
     *
     * @return
     */
    public String getObjectsByAppAndCate() {
        try {
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getAppObjects(appid, cate)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
    /**
     * 启动所有
     *
     * @return
     */
    public String getAllSourceIdSourceName() {
        try {
            AwebUser userVO = this.getUserVO();
            if (null == userVO) {
                setStrutsMessage(StrutsMessage.errorMessage("当前用户过期！"));
                return ERROR;
            } else {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", sourceService.getAllSourceIdSourceName()));
                return SUCCESS;
            }
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(AWEB.AWEB99, e));
            return ERROR;
        }
    }
}
