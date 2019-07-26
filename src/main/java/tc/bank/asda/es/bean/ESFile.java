package tc.bank.asda.es.bean;

import java.io.Serializable;
import java.util.Date;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.annotation.JSONField;

/**
 * ES文件信息
 * 
 * @author Zhang Qiang
 * @date 2018-10-30 下午4:37:00
 */
public class ESFile implements Serializable {

    private static final long serialVersionUID = -3633358845840246761L;
    
    /**
     * 索引名称
     */
    @JSONField(name = "_index")
    private String index;
    /**
     * 路由
     */
    @JSONField(name = "_routing")
    private String routing;
    @JSONField(name = "_head_.appid")
    private String appId;
    @JSONField(name = "_head_.appname")
    private String appName;
    @JSONField(name = "_head_.objectid")
    private String objectId;
    @JSONField(name = "_head_.category3")
    private String category3;
    /**
     * 设备ip
     */
    @JSONField(name = "_head_.hostip")
    private String hostIp;
    /**
     * 文件名称
     */
    @JSONField(name = "_head_.file")
    private String filename;
    /**
     * 文件大小
     */
    @JSONField(name = "_head_.filesize")
    private Long fileSize;
    /**
     * 文件修改时间
     */
    @JSONField(name = "_head_.filetime", format = "yyyy-MM-dd HH:mm:ss")
    private Date fileTime;
    /**
     * 日志序列号
     */
    @JSONField(name = "_head_.logsn")
    private String logSerialNo;
    
    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }

    public String getCategory3() {
        return category3;
    }

    public void setCategory3(String category3) {
        this.category3 = category3;
    }

    public String getHostIp() {
        return hostIp;
    }

    public void setHostIp(String hostIp) {
        this.hostIp = hostIp;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public Date getFileTime() {
        return fileTime;
    }

    public void setFileTime(Date fileTime) {
        this.fileTime = fileTime;
    }

    public String getLogSerialNo() {
        return logSerialNo;
    }

    public void setLogSerialNo(String logSerialNo) {
        this.logSerialNo = logSerialNo;
    }

    public String getRouting() {
        return routing;
    }

    public void setRouting(String routing) {
        this.routing = routing;
    }

    /**
     * @return
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}
