package tc.bank.asda.es.bean.dto;

import java.io.Serializable;
import java.util.List;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.annotation.JSONField;

import tc.bank.asda.es.bean.ESFile;

/**
 * ES文件摘要信息
 * 
 * @author Zhang Qiang
 * @date 2018-10-29 上午11:54:18
 */
public class ESSummaryFileDTO implements Serializable {

    private static final long serialVersionUID = -7885433125325326267L;

    /**
     * 总记录数
     */
    @JSONField(ordinal = 1)
    private Long totalRecords;
    /**
     * 总页数
     */
    @JSONField(ordinal = 2)
    private Long totalPage;
    /**
     * 当前页
     */
    @JSONField(ordinal = 3)
    private Integer page;
    /**
     * 每页记录数
     */
    @JSONField(ordinal = 4)
    private Integer pageSize;
    /**
     * 文件信息
     */
    @JSONField(ordinal = 5)
    private List<ESFile> files;

    public Long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(Long totalRecords) {
        this.totalRecords = totalRecords;
    }

    public Long getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Long totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public List<ESFile> getFiles() {
        return files;
    }

    public void setFiles(List<ESFile> files) {
        this.files = files;
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
