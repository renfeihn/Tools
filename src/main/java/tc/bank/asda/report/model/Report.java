package tc.bank.asda.report.model;

import java.util.Date;

import tc.bank.asda.dashboard.model.DashBoard;

public class Report extends DashBoardReportRelation {

	/**
	 * 仪表盘详细信息
	 */
	private DashBoard dashBoard;

	private Date startTime;

	private Date endTime;

	public DashBoard getDashBoard() {
		return dashBoard;
	}

	public void setDashBoard(DashBoard dashBoard) {
		this.dashBoard = dashBoard;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

}
