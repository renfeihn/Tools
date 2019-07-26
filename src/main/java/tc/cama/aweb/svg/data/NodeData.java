package tc.cama.aweb.svg.data;
import java.util.List;

public class NodeData {

	@Override
	public String toString() {
		return "NodeData [category=" + category + ", name=" + name + ", label=" + label + ", edgeData=" + edgeData
				+ "]";
	}

	String category;
	String name;
	String label;
	String id;
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	List<String> next;
	List<EdgeData> edgeData;
	String url;
	
	
	/*
	 * B图所用的节点数据
	 */
//	public NodeData(String name, String label, List<EdgeData> edgeData,
//			String url) {
//		super();
//		this.name = name;
//		this.label = label;
//		this.edgeData = edgeData;
//		this.url = url;
//	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<EdgeData> getEdge() {
		return edgeData;
	}

	public void setEdge(List<EdgeData> edgeData) {
		this.edgeData = edgeData;
	}

	ShapeData shapeData;
	
	private boolean html;
	
	
//	public NodeData(String name, String label, String category,
//			List<EdgeData> edgeData, ShapeData shapeData) {
//		super();
//		this.name = name;
//		this.label = label;
//		this.category = category;
//		this.edgeData = edgeData;
//		this.shapeData = shapeData;
//	}
	
//	public NodeData(String name, String label, String category,    //此注释部分不要删除，还会有用
//			List<String> next, ShapeData shapeData) {
//		super();
//		this.name = name;
//		this.label = label;
//		this.category = category;
//		this.next = next;
//		this.shapeData = shapeData;
//	}
	

	public NodeData(String category, String name, String label, List<EdgeData> edgeData,ShapeData shapeData,String id) {
		super();
		this.category = category;
		this.name = name;
		this.label = label;
		this.edgeData = edgeData;
		this.shapeData=shapeData;
		this.id=id;
	}

//	public NodeData(String name, String label, String category,
//			String[] next, ShapeData shapeData) {
//		super();
//		this.name = name;
//		this.label = label;
//		this.category = category;
//		this.next = Arrays.asList(next);
//		this.shapeData = shapeData;
//	}

	
//	public NodeData(String name, String label, List<EdgeData> edgeData,
//		ShapeData shapeData) {
//	super();
//	this.name = name;
//	this.label = label;
//	this.edgeData = edgeData;
//	this.shapeData = shapeData;
//}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public List<String> getNext() {
		return next;
	}

	public void setNext(List<String> next) {
		this.next = next;
	}

	public ShapeData getShapeData() {
		return shapeData;
	}

	
	
//	public NodeData(String name, String label, ShapeData shapeData) {   //在画框图时可能会用到
//		super();
//		this.name = name;
//		this.label = label;
//		this.shapeData = shapeData;
//	}

	public void setShapeData(ShapeData shapeData) {
		this.shapeData = shapeData;
	}

	
//	public NodeData(String name, String label, List<EdgeData> edgeData) {
//		super();
//		this.name = name;
//		this.label = label;
//		this.edgeData = edgeData;
//	}
//	


	/*
	 * E图所用到的节点对象   数据格式：GraphData类的对象 例如:new GraphData(String name,List<NodeData>) 
	 * ps:1,NodeData类的list中，用到的构造函数是 new NodeData(String name,List<EdgeData> edgeData)
	 * 	  2,EdgeData类的list中，用到的构造器是new EdgeData(String next,String edgelabel,ShapeData shapeData)  
	 */ 
	
	public NodeData(String name, List<EdgeData> edgeData) {
		super();
		this.name = name;
		this.edgeData = edgeData;
	}

	
	
	/*
	 * E图用到的可变颜色数据
	 */
//	public NodeData(String name, List<EdgeData> edgeData, ShapeData shapeData) {
//		super();
//		this.name = name;
//		this.edgeData = edgeData;
//		this.shapeData = shapeData;
//	}

	/*
	 * C图所用到的节点数据
	 */
	
	//在label为 html标签包裹的类型图中，节点数据需使用此方法，并将html的布尔值变成true(用于去除label的值的双引号) 
//	public NodeData(String name, String label, List<EdgeData> edgeData,boolean html) {
//		super();
//		this.name = name;
//		this.label = label;
//		this.edgeData = edgeData;
//		this.html=html;
//	}

	public boolean isHtml() {
		return html;
	}

	public void setHtml(boolean html) {
		this.html = html;
	}

	
}
