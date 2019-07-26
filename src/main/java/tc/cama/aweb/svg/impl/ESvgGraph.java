package tc.cama.aweb.svg.impl;

import java.util.HashMap;
import java.util.Map;

import tc.cama.aweb.svg.common.graphviz.Digraph;
import tc.cama.aweb.svg.common.graphviz.Graph;
import tc.cama.aweb.svg.data.GraphData;
import tc.cama.aweb.svg.tmpl.SvgGraph;

/**
 * 
 * @author yuan
 *
 */
public class ESvgGraph extends SvgGraph {
	private Graph graph;

	public ESvgGraph(GraphData data) {
		super(data);
		graph = new Digraph(data.getName());
	}

	@Override
	public void config() { // 默认配置
		// svg图全局属性
		graph.attr("fontname").value("Microsoft YaHei");
		graph.attr("bgcolor").value("white");
		graph.attr("rankdir").value("LR");
		// 节点属性
		// graph.node().attr("style").value("filled");
		// graph.node().attr("style").value("rounded,filled");
		graph.node().attr("shape").value("rectangle");
		graph.node().attr("height").value("0.3");
		graph.node().attr("width").value("0.9");
		graph.node().attr("fontcolor").value("#5B62F9");
		graph.node().attr("fontsize").value("13");
		graph.node().attr("color").value("#5B62F9");
		graph.node().attr("fontname").value("Microsoft YaHei");
		// 线条默认属性
		graph.edge().attr("style").value("solid");
		graph.edge().attr("color").value("#5B62F9");
		graph.edge().attr("labelsize").value("3");
		graph.edge().attr("labelfontname").value("Microsoft YaHei");

	}

	@Override
	public String generate() {
		GraphData data = getData();

		config(); // 载入全局属性

		Map<String, String> attrs = new HashMap<String, String>(); // 存放属性集合的Map

		// 设置对齐参照
		for (int i = 0; i < data.getNode().size(); i++) {
			graph.addRank("same;" + data.getNode().get(i).getCategory() + "," + data.getNode().get(i).getName());
		}

		// 加入分类节点
		for (int i = 0; i < data.getCategory().size(); i++) {
			attrs.clear(); // 清空集合
			attrs.put("style", "--"); // 设置属性缺省值，只有这样才能显示分类线图
			attrs.put("shape", "plaintext");
//			attrs.put("id", data.getCategory().get(i).getName() + "_category");
			attrs.put("fontcolor", "black");
			graph.addNode(data.getCategory().get(i).getName(), data.getCategory().get(i).getLabel()).attrs()
					.putAll(attrs);
		}

		// 画出分类线
		for (int i = 0; i < data.getCategory().size() - 1; i++) {
			attrs.clear();
//			attrs.put("id", data.getCategory().get(i).getName() + "_edge_" + data.getCategory().get(i + 1).getName()
//					+ "_category");
			attrs.put("color", "white");
			graph.addEdge(data.getCategory().get(i).getName(), data.getCategory().get(i + 1).getName()).attrs()
					.putAll(attrs);
		}

		// 添加节点
		for (int i = 0; i < data.getNode().size(); i++) {
			attrs.clear();
			if (data.getNode().get(i).getShapeData() == null || data.getNode().get(i).getShapeData().getColor()==null 
				|| "".equals(data.getNode().get(i).getShapeData().getColor())) {
				graph.addNode(data.getNode().get(i).getName(), data.getNode().get(i).getLabel()).attr("id")
						.value(data.getNode().get(i).getId()+"_node");
			} else {
				attrs.put("color", data.getNode().get(i).getShapeData().getColor());
				attrs.put("fontcolor",data.getNode().get(i).getShapeData().getColor());
				attrs.put("id", data.getNode().get(i).getId()+"_node");
				graph.addNode(data.getNode().get(i).getName(), data.getNode().get(i).getLabel()).attrs().putAll(attrs);
			}

			// 添加连线
			if (data.getNode().get(i).getEdge().size() >= 1) {
				for (int j = 0; j < data.getNode().get(i).getEdge().size(); j++) {
					// 设置属性集合
					attrs.clear(); // 清空集合
					attrs.put("label", data.getNode().get(i).getEdge().get(j).getEdgelabel());
					if(data.getNode().get(i).getEdge().get(j).getShapeData()!=null)
						attrs.put("color",data.getNode().get(i).getEdge().get(j).getShapeData().getColor());
					
					if (attrs.get("color") == null || "".equals(attrs.get("color"))) {
						graph.addEdge(data.getNode().get(i).getName(), data.getNode().get(i).getEdge().get(j).getNext())
								.attr("label").value(data.getNode().get(i).getEdge().get(j).getEdgelabel());
					} else {
						graph.addEdge(data.getNode().get(i).getName(), data.getNode().get(i).getEdge().get(j).getNext())
						.attrs().putAll(attrs);
					}
				}
			}
		}

		String fp = svg.generateSVG(graph);
		return fp;

	}
}
