package tc.cama.aweb.svg.common.graphviz;

/**
 * the Node Component of graphviz tools.
 * 
 * @author Everton Cardoso
 * 
 */
public class Node implements Component {

	private Graph graph;
	private String name;
	private Attrs attrs;

	/**
	 * node default.
	 */
	private Node(String name) {
		this.name = name;
		this.attrs = new Attrs(this);
	}

	protected Node(String name, String label, Graph graph) {
		this(name);
		this.graph = graph;
		this.attr("label").value(NEE.translate(label));
	}

	protected Node(String name, String label, Graph graph, boolean html) {
		this(name);
		this.graph = graph;
		if (html) {
			this.attr("html").value(NEE.translate(label));
		} else {
			this.attr("label").value(NEE.translate(label));
		}
	}

	/*
	 * @see net.javagraphviz.Component#attribute(java.lang.String)
	 */
	public Attr attr(String name) {
		return this.attrs.get(name);
	}

	/*
	 * @see net.javagraphviz.Component#attributes()
	 */
	public Attrs attrs() {
		return this.attrs;
	}

	/*
	 * @see net.javagraphviz.Component#name()
	 */
	public String name() {
		return this.name;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Node other = (Node) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	public String output() {

		StringBuilder xOut = new StringBuilder(this.name);
		StringBuilder xAttr = new StringBuilder("");
		String xSeparator = "";

		for (Attr attrs : this.attrs.list()) {
			if ("html".equals(attrs.name())) {
				xAttr.append(xSeparator + "label = " + attrs.value().toGv(false));
			} else {
				xAttr.append(xSeparator + attrs.name() + " = "
						+ attrs.value().toGv());
			}
			xSeparator = ", ";
		}
		if (xAttr.length() > 0) {
			xOut.append(" [" + xAttr.toString() + "]");
		}
		xOut.append(";");

		return (xOut.toString());

	}

	/**
	 * create the node default
	 */
	static Node getDefault(String name) {
		return new Node(name);
	}

	public Graph graph() {
		return graph;
	}

}
