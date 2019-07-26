package tc.cama.aweb.svg.data;

public class CategoryData {
	String name;
	String index;
	String label;
	ShapeData shapeData;

	public CategoryData(String name, String label) {
		super();
		this.name = name;
		this.label = label;
	}
	public CategoryData(String index,String name, String label) {
		super();
		this.name = name;
		this.index = index;
		this.label = label;
	}

	public CategoryData(String name, String label, ShapeData shapeData) {
		super();
		this.name = name;
		this.label = label;
		this.shapeData = shapeData;
	}

	public ShapeData getShapeData() {
		return shapeData;
	}

	public void setShapeData(ShapeData shapeData) {
		this.shapeData = shapeData;
	}

	public String getIndex() {
		return index;
	}
	public void setIndex(String index) {
		this.index = index;
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
		CategoryData other = (CategoryData) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	
}
