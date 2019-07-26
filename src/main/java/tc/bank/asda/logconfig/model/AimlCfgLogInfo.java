package tc.bank.asda.logconfig.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

/**
 * 日志基本信息表
 *
 * @author parry
 */
@Entity
@Table(name = "aim_cfg_log_info")
public class AimlCfgLogInfo implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 7175033015602890705L;
    /**
     * 日志ID
     */
    @Column(name = "logid")
    private long logId;
    /**
     * 日志名
     */
    @Column(name = "logname")
    private String logName;
    /**
     * 日志分类ID
     */
    @Column(name = "typeid")
    private long typeId;
    /**
     * 日志分类名称
     */
    private String typeName;

    /**
     * 日志编码
     */
    @Column(name = "logcoding")
    private String logCoding;
    /**
     * 日志类型
     */
    @Column(name = "logtype")
    private String logType;

    /**
     * 单行标识 0：否 1：是
     */
    @Column(name = "lineflag")
    private String lineFlag;
    /**
     * 日志路径示例
     */
    @Column(name = "direxample")
    private String dirExample;
    /**
     * 日志模板示例
     */
    @Column(name = "dataexample")
    private String dataExample;
    /**
     * 日志事件
     */
    @Column(name = "logeventregex")
    private String logEventRegex;
    /**
     * 多行模式 0：否 1：是
     */
    @Column(name = "mulitilinetype")
    private String mulitiLineType;

    /**
     * 分组开始字符串，1..n  多个值用\n分割
     */
    @Column(name = "group_start")
    private String groupStart;

    /**
     * 分组结束字符串，1
     */
    @Column(name = "group_end")
    private String groupEnd;
    /**
     * 向kafka发送数据是否进行数据压缩 0 否 1是
     */
    @Column(name = "compress")
    private int compress;

    private List<AimlCfgLogPublicField> publicFields;

    private List<AimlCfgLogPrivateField> privateFields;

    private int objectid;


    public long getLogId() {
        return logId;
    }

    public void setLogId(long logId) {
        this.logId = logId;
    }

    public String getLogName() {
        return logName;
    }

    public void setLogName(String logName) {
        this.logName = logName;
    }

    public long getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getLogCoding() {
        return logCoding;
    }

    public void setLogCoding(String logCoding) {
        this.logCoding = logCoding;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public String getLineFlag() {
        return lineFlag;
    }

    public void setLineFlag(String lineFlag) {
        this.lineFlag = lineFlag;
    }

    public String getDirExample() {
        return dirExample;
    }

    public void setDirExample(String dirExample) {
        this.dirExample = dirExample;
    }

    public String getDataExample() {
        return dataExample;
    }

    public void setDataExample(String dataExample) {
        this.dataExample = dataExample;
    }

    public String getLogEventRegex() {
        return logEventRegex;
    }

    public void setLogEventRegex(String logEventRegex) {
        this.logEventRegex = logEventRegex;
    }

    public String getMulitiLineType() {
        return mulitiLineType;
    }

    public void setMulitiLineType(String mulitiLineType) {
        this.mulitiLineType = mulitiLineType;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public void setTypeId(long typeId) {
        this.typeId = typeId;
    }

    public List<AimlCfgLogPublicField> getPublicFields() {
        return publicFields;
    }

    public void setPublicFields(List<AimlCfgLogPublicField> publicFields) {
        this.publicFields = publicFields;
    }

    public List<AimlCfgLogPrivateField> getPrivateFields() {
        return privateFields;
    }

    public void setPrivateFields(List<AimlCfgLogPrivateField> privateFields) {
        this.privateFields = privateFields;
    }

    public String getGroupStart() {
        return groupStart;
    }

    public void setGroupStart(String groupStart) {
        this.groupStart = groupStart;
    }

    public String getGroupEnd() {
        return groupEnd;
    }

    public void setGroupEnd(String groupEnd) {
        this.groupEnd = groupEnd;
    }

    public int getCompress() {
        return compress;
    }

    public void setCompress(int compress) {
        this.compress = compress;
    }


    public int getObjectid() {
        return objectid;
    }

    public void setObjectid(int objectid) {
        this.objectid = objectid;
    }
}
