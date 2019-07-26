package cn.com.agree.aweb.struts2.action.asda;

import cn.com.agree.aweb.exception.ExceptionTypes;
import cn.com.agree.aweb.service.aweb.ILoginService;
import cn.com.agree.aweb.struts2.action.support.StandardActionSupport;
import cn.com.agree.aweb.struts2.action.support.StrutsMessage;
import cn.com.agree.aweb.util.SFTPUtil;
import com.aim.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import tc.bank.asda.dbmanager.model.DbExecuteRet;
import tc.bank.asda.dbmanager.model.DbManager;
import tc.bank.asda.dbmanager.service.IDbManagerService;
import tc.bank.asda.logconfig.service.IAimlCfgLogSourceService;
import tc.bank.asda.toolset.service.IToolsetService;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * 功能说明：工具集使用的aciton
 * Created by Renfei on 2019/6/25.
 */
@Controller("ToolsetActionBean")
@Scope("prototype")
public class ToolsetAction extends StandardActionSupport {

    /**
     * 数据库连接信息JSON串
     */
    private String manager;

    /**
     * 密码
     */
    private String passwd;
    /**
     * 执行SQL
     */
    private String sql;

    /**
     * 一页最大行数
     */
    private int pageSize;

    /**
     * 当前页
     */
    private int pageNum = 1;


    /**
     * 上传文件使用
     * fromIp：源文件代理端IP
     * fromPath：源路径
     * toIp：目标代理端IP
     * toPath：源路径
     */
    private String fromIp, fromPath, toIp, toPath ,content;

    /**
     * 上传的文件
     */
    private File file;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 三级分类
     */
    private String nodeAttr;

    /**
     * 实例ID，三级分类_实例ID
     */
    private String instanceIds;

    /**
     * 历史记录ID
     */
    private Long fileHistId;


    /**
     * 数据库服务
     */
    @Autowired
    private IDbManagerService dbManagerService;
//    @Autowired
//    private ILoginService loginServer;
    @Autowired
    private IAimlCfgLogSourceService sourceService;
    @Autowired
    private IToolsetService toolsetService;


    /**
     * 功能说明：工具集中使用查询数据库表名
     *
     * @return
     */
    public String getToolsetDbTables() {
        try {
            DbManager dbManager = JSONObject.parseObject(manager, DbManager.class);
            setStrutsMessage(
                    StrutsMessage.successMessage().addParameter("result", dbManagerService.getDbTables(dbManager, passwd)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }


    /**
     * 功能说明：工具集中根据连接配置执行SQL
     *
     * @return
     */
    public String executeSQL() {
        try {
            DbManager dbManager = JSONObject.parseObject(manager, DbManager.class);
            List<DbExecuteRet> result = dbManagerService.executeSQL(dbManager, passwd, sql, pageNum, pageSize);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", result));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(e.getMessage().split("ServiceFailException:")[1]));
            return ERROR;
        }
    }


    /**
     * 功能说明：请求代理服务，如果成功返回代理拥有的目录权限及文件
     *
     * @return
     */
    public String getAgentService() {
        try {
            // 树形结构数据模型
            Map<String, Map> data = new HashMap<>();

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", data));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(e.getMessage().split("ServiceFailException:")[1]));
            return ERROR;
        }
    }


    /**
     * 功能说明：服务端对服务器上传文件
     *
     * @return
     */
    public String ac2acUpload() {
        try {

            Map<String, Object> map = toolsetService.ac2acUpload(fromIp, fromPath,
                    toIp, toPath, fileName);

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", map));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(e.getMessage().split("ServiceFailException:")[1]));
            return ERROR;
        }
    }


    /**
     * 功能说明：服务端对服务器上传文件
     *
     * @return
     */
    public String s2acUpload() {
        InputStream is = null;
        try {

            // 文件先通过ftp上传到AIM服务器
            if (null == file || StringUtils.isEmpty(fileName)) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "缺少参数"));
            } else if (file.length() / 1024 / 1024 > 100) {
                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", "文件大小超过100M"));
            } else {
                // 系统中，AIM FTP共享信息
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
                // FTP 上传到服务端成功，后在将文件上传到本AIM agent server中
                // 路径：defaultFilePath 文件名：fileName  toIp
                Map<String, Object> map = toolsetService.s2acUpload(defaultFilePath, fileName, toIp, toPath);

                setStrutsMessage(StrutsMessage.successMessage().addParameter("result", map));
            }
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
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
     * 功能说明：获取左边配置文件树
     *
     * @return
     */
    public String getConfTreeList() {
        try {
//            Map<String, List<String>> map = new LinkedHashMap<>();
//            List<String> list = new ArrayList<>();
//            list.add("platform.xml");
//            list.add("platform.xsd");
//
//            map.put("platform", list);
//
//            list = new ArrayList<>();
//            list.add("log4j.properties");
//            list.add("logback.xml");
//            map.put("server", list);

            Map<String,Object> map = toolsetService.getCfgFileByNodeAttr(nodeAttr);

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", JSONObject.toJSON(map)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }


    /**
     * 功能说明：获取左边选中文件的内容
     *
     * @return
     */
    public String getFileContent() {
        try {
//            Map<String, Object> map = toolsetService.getFileContent(instanceIds, fromPath, fileName);
            Map<String, Object> map = new HashMap<>();
            String content = "<ssl>\n" +
                    "<useable>false</useable>\n" +
                    "<sslType>TLS</sslType>\n" +
                    "<clientAuth>false</clientAuth>\n" +
                    "<storePath></storePath>\n" +
                    "<storePassword>123456</storePassword>\n" +
                    "<trustRoot></trustRoot>\n" +
                    "<keyAlgorithm></keyAlgorithm>\n" +
                    "<storeType></storeType>\n" +
                    "<cipers></cipers>\n" +
                    "<trustCertificateType></trustCertificateType>\n" +
                    "<trustKeyAlgorithm></trustKeyAlgorithm>\n" +
                    "<trustStoreType></trustStoreType>\n" +
                    "<sslSessionCacheSize></sslSessionCacheSize>\n" +
                    "<sslSessionTimeout></sslSessionTimeout>\n" +
                    "</ssl>";

            map.put("content",content);
            map.put("state",1);
            map.put("msg","成功");

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", JSONObject.toJSON(map)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }


    public String editFile(){
        try {
            Map<String, Object> map = toolsetService.editFile(instanceIds, fromPath, fileName, content);

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", JSONObject.toJSON(map)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    public String cancelEditFile(){
        try {
            Map<String, Object> map = toolsetService.cancelEditFile(fileHistId);

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", JSONObject.toJSON(map)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }

    /**
     * 功能说明：获取左边选中文件的内容
     *
     * @return
     */
    public String writeFile() {
        try {
            Map<String, Object> map = toolsetService.writeFile(fileHistId, toPath, fileName, content);
//            Map<String, Object> map = new HashMap<>();
//            map.put("state",1);
//            map.put("msg","成功");

            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", JSONObject.toJSON(map)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }



    /**
     * 功能说明：获取左边选中文件的内容
     *
     * @return
     */
    public String getFileHists() {
        try {
            Map<String, Object> map = toolsetService.getFileHists(instanceIds, fromPath, fileName);
            setStrutsMessage(StrutsMessage.successMessage().addParameter("result", JSONObject.toJSON(map)));
            return SUCCESS;
        } catch (Exception e) {
            setStrutsMessage(StrutsMessage.errorMessage(ExceptionTypes.AWEB.AWEB99, e));
            return ERROR;
        }
    }


    public void setManager(String manager) {
        this.manager = manager;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public void setFromIp(String fromIp) {
        this.fromIp = fromIp;
    }

    public void setFromPath(String fromPath) {
        this.fromPath = fromPath;
    }

    public void setToIp(String toIp) {
        this.toIp = toIp;
    }

    public void setToPath(String toPath) {
        this.toPath = toPath;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setNodeAttr(String nodeAttr) {
        this.nodeAttr = nodeAttr;
    }

    public void setInstanceIds(String instanceIds) {
        this.instanceIds = instanceIds;
    }

    public void setFileHistId(Long fileHistId) {
        this.fileHistId = fileHistId;
    }
}
