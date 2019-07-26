package tc.bank.asda.report.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Map;

/**
 * 定时任务执行的统计结果
 * Created by wangch on 2018/9/15.
 */
@Table(name = "aiml_report_exe")
public class DashBoardReportEXE {
    /**
     * 主键id
     */
    @Id
    @SequenceGenerator(name = "global", sequenceName = " REPORT")
    private Long id;
    /**
     * 报表id
     */
    @Column(name = "report_id")
    private Long reportId;
    @Column(name = "board_id")
    private Long boardId;
    /**
     * 执行结果
     */
    @Column(name = "`result`")
    private String result;
    /**
     * 执行时间
     */
    @Column(name = "exe_time")
    private String executeTime;

    @Transient
    private Map<String, Object> boardRelationInfo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }


    public String getExecuteTime() {
        return executeTime;
    }

    public void setExecuteTime(String executeTime) {
        this.executeTime = executeTime;
    }

    public Map<String, Object> getBoardRelationInfo() {
        return boardRelationInfo;
    }

    public void setBoardRelationInfo(Map<String, Object> boardRelationInfo) {
        this.boardRelationInfo = boardRelationInfo;
    }
}
