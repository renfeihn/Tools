package tc.cama.aweb.svg.common.graphviz;

import org.apache.commons.lang3.text.translate.NumericEntityEscaper;

/**
 * the graph components (node, edges, etc)
 * 
 * @author Everton Cardoso
 * 
 */
public interface Component {

	public static final NumericEntityEscaper NEE = NumericEntityEscaper
			.between(0x4e00, 0x9fa5);

	/**
	 * return the attribute of the component.
	 * 
	 */
	Attr attr(String name);

	Attrs attrs();

	/**
	 * name of the componenet.
	 */
	String name();

	/**
	 * output the component structure
	 */
	String output();

}
