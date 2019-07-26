package tc.cama.aweb.bean;

import java.util.ArrayList;
import java.util.List;
import tc.cama.aweb.model.AwebUserRoleMenuView;
/**
 * 菜单列表树结构  
 * @author zhangkun
 *
 */
public class Node {
	private Menu target;
	private Node parent;
	private List<Node> children = new ArrayList<Node>();

	public Menu getTarget() {
		return target;
	}

	public void setTarget(AwebUserRoleMenuView target) {
		this.target = new Menu(target.getPregid(), target.getMid(), target.getName(), target.getPath(),
				target.getIconPath());
	}

	public Node getParent() {
		return parent;
	}

	public void setParent(Node parent) {
		this.parent = parent;
	}

	public List<Node> getChildren() {
		return children;
	}

	public void setChildren(List<Node> children) {
		this.children = children;
	}

	public Node(AwebUserRoleMenuView target) {
		super();
		if (target == null) {
			return;
		}
		this.target = new Menu(target.getPregid(), target.getMid(), target.getName(), target.getPath(),
				target.getIconPath());
	}

	public void addChild(Node node) {
		this.children.add(node);
	}

	public Node() {
		super();
	}
	
	
}
