package tc.cama.aweb.svg;

import tc.cama.aweb.svg.common.graphviz.Graph;

/**
 * @see <a href="http://www.ryandesign.com/canviz/">范例
 *      http://www.ryandesign.com/canviz/</a>
 * @see <a href="http://www.graphviz.org/Documentation.php">文档
 *      http://www.graphviz.org/Documentation.php</a>
 * @author zero
 * 
 */
public interface SVGServiceI {

	/**
	 * 生成svg文件
	 * 
	 * @param graph
	 * @return file name
	 */
	public String generateSVG(Graph graph);
}
