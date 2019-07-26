package tc.bank.cama.core.bean;

import java.util.ArrayList;
import java.util.List;
import tc.bank.cama.cmdb.model.table.CmdbObjectSummary;

/**
 * 分类列表树结构
 * 
 * @author zhangkun
 *
 */
public class CateNode {
	// private CmdbObjectSummary target;;
	private CateNode parent;
	private String curCatename;
	private List<CateNode> children = new ArrayList<CateNode>();

	public CateNode getParent() {
		return parent;
	}

	public void setParent(CateNode parent) {
		this.parent = parent;
	}

	public List<CateNode> getChildren() {
		return children;
	}

	public void setChildren(List<CateNode> children) {
		this.children = children;
	}

	public CateNode(String curname) {
		super();
		if (curname == null) {
			return;
		}
		this.setCurCatename(curname);
	}

	public void addChild(CateNode node) {
		this.children.add(node);
	}

	public String getCurCatename() {
		return curCatename;
	}

	public void setCurCatename(String curCatename) {
		this.curCatename = curCatename;
	}
}