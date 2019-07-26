package tc.cama.aweb.svg.data;
import java.util.List;


public class GraphData {
	 String name="yuan";
	
	 List<CategoryData> category;
	
	 List<NodeData> node;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<CategoryData> getCategory() {
		return category;
	}

	public void setCategory(List<CategoryData> category) {
		this.category = category;
	}

	public List<NodeData> getNode() {
		return node;
	}

	public void setNode(List<NodeData> node) {
		this.node = node;
	}
	


	
}
