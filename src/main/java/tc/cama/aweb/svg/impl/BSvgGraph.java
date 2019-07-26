package tc.cama.aweb.svg.impl;

import tc.cama.aweb.svg.common.graphviz.Digraph;
import tc.cama.aweb.svg.common.graphviz.Graph;
import tc.cama.aweb.svg.data.GraphData;
import tc.cama.aweb.svg.tmpl.SvgGraph;

public class BSvgGraph extends SvgGraph{

	private Graph graph;

	public BSvgGraph(GraphData data) {
		super(data);
		graph=new Digraph(data.getName());
	}

	@Override
	public void config() {
		// svg图属性
		graph.attr("fontname").value("FangSong");
		graph.attr("bgcolor").value("white");
		//		graph.attr("size").value("30,40");       //用来设置图的大小

		// 节点默认属性
		graph.node().attr("shape").value("plaintext");
		graph.node().attr("fontname").value("FangSong");
		graph.node().attr("margin").value("0");
		graph.node().attr("labelloc").value("c");
		graph.node().attr("fontcolor").value("red");
		// 线条默认属性
		graph.edge().attr("style").value("solid");
		graph.edge().attr("fontname").value("FangSong");
		graph.edge().attr("color").value("royalblue");
	}

	@Override
	public String generate() {
		GraphData data=getData();
		config();    //设置全局属性


		//画其余节点与连线
		for (int i = 0; i < data.getNode().size(); i++) {

			graph.addNode(data.getNode().get(i).getName(), data.getNode()
					.get(i).getLabel(),data.getNode().get(i).isHtml()).attr("image").value("C:\\Users\\asus\\Desktop\\a.png");
			
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
