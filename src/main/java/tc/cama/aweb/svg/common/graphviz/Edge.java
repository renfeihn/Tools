package tc.cama.aweb.svg.common.graphviz;

public class Edge implements Component {

	Graph graph;
	private String nodeFrom;
	private String nodeTo;
	private String name;
	private Attrs attrs;

	/**
	 * edge default.
	 */
	private Edge(String name) {
		this.name = name;
		this.attrs = new Attrs(this);
	}

	public Edge(String nodeFrom, String nodeTo, Graph graph) {
		this(nodeFrom + "_" + nodeTo);
		this.graph = graph;
		this.nodeFrom = nodeFrom;
		this.nodeTo = nodeTo;
	}

	/*
	 * @see net.javagraphviz.Component#name()
	 */
	public String name() {
		return this.name;
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

	/**
	 * create the edge default
	 */
	static Edge getDefault(String name) {
		return new Edge(name);
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
		Edge other = (Edge) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	public String output() {

		String xLink = " -> ";

		String xNodeNameOne = nodeFrom;
		String xNodeNameTwo = nodeTo;

		StringBuilder xOut = new StringBuilder(xNodeNameOne + xLink
				+ xNodeNameTwo);
		StringBuilder xAttr = new StringBuilder("");
		String xSeparator = "";

		for (Attr attrs : this.attrs.list()) {
			xAttr.append(xSeparator + attrs.name() + " = "
					+ attrs.value().toGv());
			xSeparator = ", ";
		}
		if (xAttr.length() > 0) {
			xOut.append(" [" + xAttr.toString() + "]");
		}
		xOut.append(";");

		return (xOut.toString());

	}

}
