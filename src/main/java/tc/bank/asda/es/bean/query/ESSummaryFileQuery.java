package tc.bank.asda.es.bean.query;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.annotation.JSONField;

/**
 * ES文件摘要信息查询条件
 * 
 * @author Zhang Qiang
 * @date 2018-10-30 上午10:46:48
 */
public class ESSummaryFileQuery implements Serializable {

    private static final long serialVersionUID = 4869360249470974209L;

    /**
     * 文件开始时间
     */
    @JSONField(ordinal = 1, format = "yyyy-MM-dd HH:mm:ss")
    private Date fileStartTime;
    /**
     * 文件结束时间
     */
    @JSONField(ordinal = 2, format = "yyyy-MM-dd HH:mm:ss")
    private Date fileEndTime;
    /**
     * 最小文件大小
     */
    @JSONField(ordinal = 3)
    private Long minFileSize;
    /**
     * 最大文件大小
     */
    @JSONField(ordinal = 4)
    private Long maxFileSize;
    /**
     * 文件名
     */
    @JSONField(ordinal = 5)
    private String filename;
    /**
     * 当前页码
     */
    @JSONField(ordinal = 6)
    private Integer page;
    /**
     * 每页记录数
     */
    @JSONField(ordinal = 7)
    private Integer size;
    /**
     * 排序字段
     */
    @JSONField(ordinal = 8)
    private Map<String, Object> sortedFields;
    /**
     * 预留条件，_head_.开头的字段
     */
    @JSONField(ordinal = 9)
    private Map<String, List<Object>> reserves;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Date getFileStartTime() {
        return fileStartTime;
    }

    public void setFileStartTime(Date fileStartTime) {
        this.fileStartTime = fileStartTime;
    }

    public Date getFileEndTime() {
        return fileEndTime;
    }

    public void setFileEndTime(Date fileEndTime) {
        this.fileEndTime = fileEndTime;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Long getMaxFileSize() {
        return maxFileSize;
    }

    public void setMaxFileSize(Long maxFileSize) {
        this.maxFileSize = maxFileSize;
    }

    public Long getMinFileSize() {
        return minFileSize;
    }

    public void setMinFileSize(Long minFileSize) {
        this.minFileSize = minFileSize;
    }

    public Map<String, Object> getSortedFields() {
        return sortedFields;
    }

    public void setSortedFields(Map<String, Object> sortedFields) {
        this.sortedFields = sortedFields;
    }

    public Map<String, List<Object>> getReserves() {
        return reserves;
    }

    public void setReserves(Map<String, List<Object>> reserves) {
        this.reserves = reserves;
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
