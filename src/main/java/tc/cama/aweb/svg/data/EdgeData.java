package tc.cama.aweb.svg.data;

public class EdgeData {
	
	
	String next;				//后一节点
	ShapeData shapeData;		//线条的颜色
	String edgelabel;  			//连线的标签
	
	public String getEdgelabel() {
		return edgelabel;
	}
	public void setEdgelabel(String edgelabel) {
		this.edgelabel = edgelabel;
	}
	public String getNext() {
		return next;
	}
	public void setNext(String next) {
		this.next = next;
	}
	public ShapeData getShapeData() {
		return shapeData;
	}
	public void setShapeData(ShapeData shapeData) {
		this.shapeData = shapeData;
	}
	
	
	public EdgeData(String next, ShapeData shapeData) {
		super();
		this.next = next;
		this.shapeData = shapeData;
	}
	
	/*
	 * 做E图的时候要用，因为它的连线也有标签属性
	 */
	public EdgeData(String next, String edgelabel) {
		super();
		this.next = next;
		this.edgelabel = edgelabel;
	}

	
	
	/*
	 * E图用到的可变颜色数据
	 */
	public EdgeData(String next, String edgelabel,ShapeData shapeData
			) {
		super();
		this.next = next;
		this.shapeData = shapeData;
		this.edgelabel = edgelabel;
	}
//	
	
	
	
}
