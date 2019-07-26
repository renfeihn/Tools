package tc.cama.aweb.svg.data;
public class ShapeData {

	public ShapeData() {
		super();
	}

	//
	String shape;
	String color;
	String height;
	String width;
	String penwidth;
	String fontsize;

	public String getPenwidth() {
		return penwidth;
	}

	public void setPenwidth(String penwidth) {
		this.penwidth = penwidth;
	}

	public String getFontsize() {
		return fontsize;
	}

	public void setFontsize(String fontsize) {
		this.fontsize = fontsize;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public ShapeData(String shape, String color, String height) {
		super();
		this.shape = shape;
		this.color = color;
		this.height = height;

	}
	
	public ShapeData(String shape, String color, String height, String width,
			String penwidth, String fontsize) {
		super();
		this.shape = shape;
		this.color = color;
		this.height = height;
		this.width = width;
		this.penwidth = penwidth;
		this.fontsize = fontsize;
	}

	public ShapeData(String shape, String color, String height, String width) {
		super();
		this.shape = shape;
		this.color = color;
		this.height = height;
		this.width = width;
	}

	public String getShape() {
		return shape;
	}

	public void setShape(String shape) {
		this.shape = shape;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

}
