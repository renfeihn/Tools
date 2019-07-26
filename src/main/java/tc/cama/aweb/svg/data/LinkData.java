package tc.cama.aweb.svg.data;

public class LinkData {
	String nodeName;
	String nextNodeName;

	public LinkData(String nodeName, String nextNodeName) {
		super();
		this.nodeName = nodeName;
		this.nextNodeName = nextNodeName;
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNextNodeName() {
		return nextNodeName;
	}

	public void setNextNodeName(String nextNodeName) {
		this.nextNodeName = nextNodeName;
	}

}
