package tc.cama.aweb.svg.common.graphviz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

/**
 * the Digraph Component of graphviz tools.
 * 
 * @author Everton Cardoso
 * 
 */
public class Digraph implements Graph {

	private String name;

	private Attrs attrs;

	private int idCount;

	/**
	 * representation of general node attributes
	 */
	private Node nodeDefault;

	/**
	 * representation of general node attributes
	 */
	private Edge edgeDefault;

	/**
	 * nodes of the graph
	 */
	private Map<String, Node> nodes;

	/**
	 * edges of the graph
	 */
	private List<Edge> edges;
	private List<String> ranks = new ArrayList<String>();
	private List<Graph> subGraphs;

	protected boolean identity = true;

	/**
	 * create a Digraph with name.
	 */
	public Digraph(String name) {
		this.name = name;
		this.attrs = new Attrs(this);
		this.nodeDefault = Node.getDefault(name);
		this.edgeDefault = Edge.getDefault(name);
		this.nodes = new HashMap<String, Node>();
		this.edges = new ArrayList<Edge>();
		this.subGraphs = new ArrayList<Graph>();
	}

	/*
	 * @see net.javagraphviz.Component#attribute(java.lang.String)
	 */
	public Attr attr(String key) {
		return this.attrs.get(key);
	}

	/*
	 * @see net.javagraphviz.Component#attributes()
	 */
	public Attrs attrs() {
		return this.attrs;
	}

	/**
	 * return the digraph name.
	 */
	public String name() {
		return this.name;
	}

	/*
	 * @see net.javagraphviz.Graph#node()
	 */
	public Node node() {
		return this.nodeDefault;
	}

	/*
	 * @see net.javagraphviz.Graph#addNode(java.lang.String)
	 */
	public Node addNode(String name, String label) {
		return addNode(name, label, false);
	}
	
	@Override
	public Node addNode(String name, String label, boolean html) {
		name = nodes.containsKey(name) ? name + idCount++ : name;
		Node node = new Node(name, label, this,html);
		System.out.println("name = " +name);
		nodes.put(name, node);
		return node;
	}

	/*
	 * @see net.javagraphviz.Graph#addEdge(net.javagraphviz.Node,
	 * net.javagraphviz.Node)
	 */
	public Edge addEdge(Node nodeFrom, Node nodeTo) {
		if (!containsNode(nodeFrom) || !containsNode(nodeFrom))
			throw new IllegalArgumentException("nodes not found");
		return addEdge(nodeFrom.name(), nodeTo.name());
	}

	public Edge addEdge(String nodeFrom, String nodeTo) {
		Edge edge = new Edge(nodeFrom, nodeTo, this);
		edges.add(edge);
		return edge;
	}

	public Edge addUndirectedEdge(Node nodeA, Node nodeB) {
		Edge edge = addEdge(nodeA, nodeB);
		edge.attr("dir").value("none");
		return edge;
	}

	public boolean containsNode(Node node) {
		boolean contains = this.nodes().contains(node);
		if (!contains)
			for (Graph graph : subGraphs) {
				contains = graph.containsNode(node);
				if (contains)
					break;
			}
		return contains;
	}

	/*
	 * @see net.javagraphviz.Graph#edge()
	 */
	public Edge edge() {
		return this.edgeDefault;
	}

	public List<Edge> edges() {
		return new ArrayList<Edge>(this.edges);
	}

	public List<Node> nodes() {
		return new ArrayList<Node>(this.nodes.values());
	}

	public List<Graph> subGraphs() {
		return this.subGraphs;
	}

	public String getType() {
		return "digraph";
	}

	public String output() {

		StringBuilder xDOTScript = new StringBuilder("");
		String xSeparator = "";
		StringBuilder xData = new StringBuilder("");

		// mount the graph attributes
		if (!this.attrs.list().isEmpty()) {
			for (Attr attr : this.attrs.list()) {
				xData.append(xSeparator + attr.name() + " = "
						+ attr.value().toGv());
				xSeparator = ", ";
			}
			xDOTScript.append(" graph [" + xData + "];");
		}

		// reset variables
		xSeparator = "";
		xData = new StringBuilder("");

		// mount the node attributes
		if (!this.node().attrs().list().isEmpty()) {
			for (Attr attr : this.node().attrs().list()) {
				xData.append(xSeparator + attr.name() + " = "
						+ attr.value().toGv());
				xSeparator = ", ";
			}
			xDOTScript.append(" node [" + xData + "];");
		}

		// reset variables
		xSeparator = "";
		xData = new StringBuilder("");

		// mount the edge attributes
		if (!this.edge().attrs().list().isEmpty()) {
			for (Attr attr : this.edge().attrs().list()) {
				xData.append(xSeparator + attr.name() + " = "
						+ attr.value().toGv());
				xSeparator = ", ";
			}
			xDOTScript.append(" edge [" + xData + "];");
		}
		
		//rank
		if(!this.ranks.isEmpty()){
			xDOTScript.append(StringUtils.join(this.ranks,";"));
		}

		// reset variables
		xSeparator = "";
		xData = new StringBuilder("");

		// mount the subgraph
		for (Graph subGraph : subGraphs) {
			xDOTScript.append(xSeparator + subGraph.output());
		}

		// mount components output
		// nodes
		for (Component component : this.nodes()) {
			xDOTScript.append(" " + component.output() + "");
		}
		// edges
		for (Component component : this.edges()) {
			xDOTScript.append(" " + component.output() + "");
		}

		// structure final
		StringBuilder tmp = new StringBuilder();
		if (identity) {
			tmp.append(this.getType()).append(" ").append(this.name());
		}
		tmp.append(" {").append(xDOTScript).append("}");

		return (tmp.toString());

	}

	@Override
	public Graph subGraph(final String name, boolean identity) {
		final String realName = SubGraph.prefix + name;
		for (Graph graph : subGraphs) {
			if (graph.name().equalsIgnoreCase(realName)) {
				return graph;
			}
		}
		SubGraph sub = new SubGraph(name, identity);
		subGraphs.add(sub);
		return sub;
	}

	@Override
	public boolean containsSubGraph(String name) {
		final String realName = SubGraph.prefix + name;
		for (Graph graph : subGraphs) {
			if (graph.name().equalsIgnoreCase(realName)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public void addRank(String rank) {
		// TODO Auto-generated method stub
		ranks.add("{rank="+rank+"}");
	}

	



	
}
