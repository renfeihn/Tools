package tc.cama.aweb.svg.tmpl;

import tc.cama.aweb.svg.data.GraphData;
import tc.cama.aweb.svg.impl.SVGServiceImpl;

public abstract class SvgGraph {

	private GraphData data;
	protected SVGServiceImpl svg = new SVGServiceImpl();

	public SvgGraph(GraphData data) {
		this.data = data;
	}

	public GraphData getData() {
		return data;
	}

	public abstract void config();

	public abstract String generate();
}
