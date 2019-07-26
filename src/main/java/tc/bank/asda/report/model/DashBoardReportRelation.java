package tc.bank.asda.report.model;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Created by wangch on 2018/9/15.
 */
@Table(name = "aiml_report_relation")
public class DashBoardReportRelation{

    @Id
    @SequenceGenerator(name = "", sequenceName = "report_relation")
    @Column(name = "id")
    private Long id;
    /**
     * 报表id
     */
    @Column(name = "report_id")
    private Long reportId;
    /**
     * 仪表盘id
     */
    @Column(name = "board_id")
    private Long boardId;
    /**
     * 宽度
     */
    @Column(name = "width")
    private String width;
    /**
     * 高度
     */
    @Column(name = "height")
    private String height;
    /**
     * 页面x坐标
     */
    @Column(name = "x")
    private String x;
    /**
     * 页面y坐标
     */
    @Column(name = "y")
    private String y;

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

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }
}
