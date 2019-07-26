package tc.cama.aweb.svg.common.graphviz;

/**
 * type value of the componenet attribute
 * 
 * @author Everton Cardoso
 * 
 */
public interface AttrType {

	/**
	 * output of the attribute value.
	 */
	String toGv();

	public String toGv(boolean qur);

}
