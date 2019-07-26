package tc.bank.asda.dataclean.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "aiml_log_archive_hist")
public class AimlLogArchiveHist implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = 4335999296433282404L;
    /**
     * 主键ID
     */
    @Column(name = "id")
    private long id;

    /**
     * 应用ID
     */
    @Column(name = "object_id")
    private Long objectId;
    /**
     * 日志原服务器IP
     */
    @Column(name = "source_ip")
    private String sourceIp;

    /**
     * 传输方式  1:ftp 2:sftp 3:scp
     */
    @Column(name = "trans_type")
    private Integer transType;

    /**
     * 存储类型：1-存储归档 2-文件归档
     */
    @Column(name = "data_type")
    private int dataType;
    /**
     * 备份服务器IP
     */
    @Column(name = "back_server_ip")
    private String backServerIp;
    /**
     * 备份路径
     */
    @Column(name = "back_file_path")
    private String backFilePath;
    /**
     * 备份名称
     */
    @Column(name = "back_file_name")
    private String backFileName;

    /**
     * 备份文件大小
     */
    @Column(name = "back_file_size")
    private Long backFileSize;

    /**
     * 备份耗时
     */
    @Column(name = "back_duration")
    private Long backDuration;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;
    /**
     * 备份状态 0:失败  1：成功
     */
    @Column(name = "back_state")
    private String backState;

    /**
     * 清理状态 0:失败  1：成功
     */
    @Column(name = "clean_state")
    private String cleanState;

    /**
     * 清理耗时
     */
    @Column(name = "clean_duration")
    private Long cleanDuration;

    /**
     * 描述
     */
    @Column(name = "remark")
    private String remark;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getObjectId() {
        return objectId;
    }

    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }

    public String getSourceIp() {
        return sourceIp;
    }

    public void setSourceIp(String sourceIp) {
        this.sourceIp = sourceIp;
    }

    public Integer getTransType() {
        return transType;
    }

    public void setTransType(Integer transType) {
        this.transType = transType;
    }

    public int getDataType() {
        return dataType;
    }

    public void setDataType(int dataType) {
        this.dataType = dataType;
    }

    public String getBackServerIp() {
        return backServerIp;
    }

    public void setBackServerIp(String backServerIp) {
        this.backServerIp = backServerIp;
    }

    public String getBackFilePath() {
        return backFilePath;
    }

    public void setBackFilePath(String backFilePath) {
        this.backFilePath = backFilePath;
    }

    public String getBackFileName() {
        return backFileName;
    }

    public void setBackFileName(String backFileName) {
        this.backFileName = backFileName;
    }

    public Long getBackFileSize() {
        return backFileSize;
    }

    public void setBackFileSize(Long backFileSize) {
        this.backFileSize = backFileSize;
    }

    public Long getBackDuration() {
        return backDuration;
    }

    public void setBackDuration(Long backDuration) {
        this.backDuration = backDuration;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getBackState() {
        return backState;
    }

    public void setBackState(String backState) {
        this.backState = backState;
    }

    public String getCleanState() {
        return cleanState;
    }

    public void setCleanState(String cleanState) {
        this.cleanState = cleanState;
    }

    public Long getCleanDuration() {
        return cleanDuration;
    }

    public void setCleanDuration(Long cleanDuration) {
        this.cleanDuration = cleanDuration;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


}
