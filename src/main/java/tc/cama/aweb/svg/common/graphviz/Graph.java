package tc.cama.aweb.svg.common.graphviz;

import java.util.List;

/**
 * type Graph component of the graphviz tools.
 * 
 * @see <a
 *      href="http://www.graphviz.org/content/dot-language">http://www.graphviz.org/content/dot-language</a>
 * @author Everton Cardoso
 * 
 */
public interface Graph extends Component {

	/**
	 * attributes default of the nodes.
	 */
	Node node();

	/**
	 * attributes default of the edges.
	 */
	Edge edge();

	/**
	 * list of the nodes.
	 */
	List<Node> nodes();

	/**
	 * list of the edges.
	 */
	List<Edge> edges();

	/**
	 * type of the Graph componenet (graph, digraph.. etc)
	 */
	String getType();

	/**
	 * create a node with id to graph.
	 */
	Node addNode(String name, String label);
	
	/**
	 * create a node with id to graph.
	 */
	Node addNode(String name, String label, boolean html);

	/**
	 * create a edge with two nodes.
	 */
	Edge addEdge(Node nodeFrom, Node nodeTo);
	
	Edge addEdge(String nodeFrom, String nodeTo);

	boolean containsNode(Node node);

	public Graph subGraph(String name, boolean identity);

	List<Graph> subGraphs();

	boolean containsSubGraph(String name);
	
	void addRank(String rank);
	

}
