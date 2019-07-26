package tc.bank.asda.report.model;

import javax.persistence.*;
import java.util.Map;

/**
 * 报表
 * Created by wangch on 2018/9/15.
 */
@Table(name = "aiml_report")
public class DashBoardReport {

    public enum StatisticFrequency{
        /*按天统计*/
        day,
        /*按周统计*/
        week,
        /*按月统计*/
        month,
        /*按年统计*/
        year
    }
    /**
     * 报表ID
     */
    @Id
    @SequenceGenerator(name = "global", sequenceName = " REPORT")
    @Column(name = "report_id")
    private Long reportId;
    /**
     * 报表名称
     */
    @Column(name = "report_name")
    private String reportName;
    /**
     * 报表说明
     */
    @Column(name = "remark")
    private String remark;
    /**
     * 执行周期 day/week/month/year
     */
    @Column(name = "`interval`")
    private String frequency;
    /**
     * 用户
     */
    @Column(name = "user_id")
    private Integer userId;
    
    private String username;

    /**
     * 报表定时统计历史,历史总条数。
     */
    @Transient
    private Map<String,Object> reportHistoryCount;

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Map<String, Object> getReportHistoryCount() {
        return reportHistoryCount;
    }

    public void setReportHistoryCount(Map<String, Object> reportHistoryCount) {
        this.reportHistoryCount = reportHistoryCount;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
