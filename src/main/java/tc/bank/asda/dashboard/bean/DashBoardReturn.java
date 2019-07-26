package tc.bank.asda.dashboard.bean;

import java.io.Serializable;

import tc.bank.asda.dashboard.model.DashBoard;
import tc.bank.asda.dashboard.model.DashBoardRelation;

public class DashBoardReturn implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4501179303294441110L;

	private DashBoard dashBoard;
	
	private DashBoardRelation relation;

	public DashBoard getDashBoard() {
		return dashBoard;
	}

	public void setDashBoard(DashBoard dashBoard) {
		this.dashBoard = dashBoard;
	}

	public DashBoardRelation getRelation() {
		return relation;
	}

	public void setRelation(DashBoardRelation relation) {
		this.relation = relation;
	}

	public DashBoardReturn(DashBoard dashBoard, DashBoardRelation relation) {
		super();
		this.dashBoard = dashBoard;
		this.relation = relation;
	}

	public DashBoardReturn() {
		super();
	}
}
