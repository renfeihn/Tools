package tc.cama.aweb.svg.impl;

import tc.cama.aweb.svg.common.graphviz.Digraph;
import tc.cama.aweb.svg.common.graphviz.Graph;
import tc.cama.aweb.svg.data.GraphData;
import tc.cama.aweb.svg.tmpl.SvgGraph;

public class DSvgGraph extends SvgGraph {

	private Graph graph;

	public DSvgGraph(GraphData data) {
		super(data);
		graph = new Digraph(data.getName());
	}

	@Override
	public void config() {
		// svg图属性
		graph.attr("fontname").value("FangSong");
		graph.attr("bgcolor").value("white");
		graph.attr("rankdir").value("LR");

		// 节点默认属性
		graph.node().attr("fontname").value("FangSong");
		graph.node().attr("color").value("deepskyblue");
		graph.node().attr("shape").value("rectangle");
		graph.node().attr("penwidth").value("10");
		graph.node().attr("height").value("0.7");
		graph.node().attr("width").value("1.0");
		graph.node().attr("fontsize").value("10.0");

		// 线条默认属性
		graph.edge().attr("style").value("solid");
		graph.edge().attr("fontname").value("FangSong");
		graph.edge().attr("color").value("royalblue");
	}

	@Override
	public String generate() {
		GraphData data = getData();

		config();   //载入全局属性

		// 画节点
		//画其余节点与连线
		for (int i = 0; i < data.getNode().size(); i++) {
			graph.addNode(data.getNode().get(i).getName(), data.getNode()
					.get(i).getLabel()).attr("color").value("red");
			if (data.getNode().get(i).getEdge().size() >= 1){
				for (int j=0;j<data.getNode().get(i).getEdge().size();j++){
					graph.addEdge(data.getNode().get(i).getName(),
							data.getNode().get(i).getEdge().get(j).getNext())
							.attr("color").value(data.getNode().get(i).getEdge().get(j).
									getShapeData().getColor());	
				}

			}

		}

		String fp = svg.generateSVG(graph);
		return fp;
	}

}
