package tc.cama.aweb.svg.common.graphviz;

public class SubGraph extends Digraph {

	static String prefix = "cluster_";

	protected SubGraph(String name, boolean identity) {
		super(prefix + name);
		this.identity = identity;
	}

	@Override
	public String getType() {
		return "subgraph";
	}

}
