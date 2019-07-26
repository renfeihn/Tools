package tc.cama.aweb.svg.impl;

import java.util.HashMap;
import java.util.Map;

import tc.cama.aweb.svg.common.graphviz.Digraph;
import tc.cama.aweb.svg.common.graphviz.Graph;
import tc.cama.aweb.svg.data.GraphData;
import tc.cama.aweb.svg.tmpl.SvgGraph;


public class ASvgGraph extends SvgGraph {

	private Graph graph;

	public ASvgGraph(GraphData data) {
		super(data);
		graph = new Digraph(data.getName());
	}

	@Override
	public void config() {
		// svg图属性
		graph.attr("fontname").value("FangSong");
		graph.attr("bgcolor").value("white");
		graph.attr("rankdir").value("LR");

		graph.attr("size").value("10,10");       //用来设置图的大小
				
		graph.attr("shape").value("rectangle");

		// 节点默认属性
		graph.node().attr("style").value("rounded,filled");
		graph.node().attr("fontname").value("FangSong");
		graph.node().attr("fillcolor").value("greenyellow");
		graph.node().attr("height").value("0.3");
		graph.node().attr("fontsize").value("8.0");     //节点字体大小  
		
		graph.node().attr("penwidth").value("0.8");		//节点边框粗细 默认为1

		// 线条默认属性
		graph.edge().attr("style").value("solid");
		graph.edge().attr("fontname").value("FangSong");
		graph.edge().attr("color").value("royalblue");
		
		
		graph.edge().attr("penwidth").value("0.8");       //线的粗细 默认为1
	}

	@Override
	public String generate() {
		GraphData data = getData();

		config();   //载入全局属性

		//设置对齐参照
		for (int i = 0; i < data.getNode().size(); i++) {
			graph.addRank("same;" + data.getNode().get(i).getCategory() + ","
					+ data.getNode().get(i).getName());
		}

		// 画节点
		Map<String, String> map1 = new HashMap<String, String>();
//		map1.put("shape", "rectangle");
//		map1.put("fillcolor", "deepskyblue");

		Map<String, String> map2 = new HashMap<String, String>();
		
		
		Map<String, String> map3 = new HashMap<String, String>();    //边的属性集合
		
		
		//加入分类节点
		for (int i = 0; i < data.getCategory().size(); i++) {
			map2.clear();            // 清空集合
			map2.put("style", "--"); // 设置属性缺省值，只有这样才能显示分类线图
			map2.put("shape", "plaintext");
			map2.put("id", data.getCategory().get(i).getName()+"_category");
			
			graph.addNode(data.getCategory().get(i).getName(),
					data.getCategory().get(i).getLabel()).attrs().putAll(map2);
		}

		//画出分类线
		for (int i = 0; i < data.getCategory().size() - 1; i++) {
			graph.addEdge(data.getCategory().get(i).getName(), data
					.getCategory().get(i + 1).getName()).attr("id").value(data.getCategory().get(i).getName()
							+"_edge_"+data.getCategory().get(i + 1).getName()+"_category");
		}

		//画其余节点与连线
		for (int i = 0; i < data.getNode().size(); i++) {
			if(data.getNode().get(i).getShapeData()==null ){
				graph.addNode(data.getNode().get(i).getName(), data.getNode()
						.get(i).getLabel()).attr("id").value(data.getNode().get(i).getName());
			}else{
				map1.clear();
				map1.put("shape", data.getNode().get(i).getShapeData().getShape());
				map1.put("fillcolor", data.getNode().get(i).getShapeData().getColor());
				map1.put("height",data.getNode().get(i).getShapeData().getHeight());
				if(data.getNode().get(i).getShapeData().getFontsize()!=null && data.getNode().get(i).getShapeData().getFontsize()!=""){
					map1.put("fontsize",data.getNode().get(i).getShapeData().getFontsize());
				}
				map1.put("id",data.getNode().get(i).getName());
				
				graph.addNode(data.getNode().get(i).getName(), data.getNode()
						.get(i).getLabel()).attrs().putAll(map1);
			}
			
//						if (data.getNode().get(i).getNext().size() >= 1) {
//							for (int j = 0; j < data.getNode().get(i).getNext().size(); j++) {
//								graph.addEdge(data.getNode().get(i).getName(), data
//										.getNode().get(i).getNext().get(j));
//							}
//						}

			if (data.getNode().get(i).getEdge().size() >= 1){
				for (int j=0;j<data.getNode().get(i).getEdge().size();j++){
					map3.clear();
					map3.put("color", data.getNode().get(i).getEdge().get(j).			//线条颜色
							getShapeData().getColor());
					map3.put("penwidth", data.getNode().get(i).getEdge().get(j).        //线条粗细
							getShapeData().getPenwidth());
					map3.put("id",data.getNode().get(i).getName()+"_edge_"
							+data.getNode().get(i).getEdge().get(j).getNext());
					
					if(data.getNode().get(i).getEdge().get(j).getShapeData()==null){
						graph.addEdge(data.getNode().get(i).getName(),
								data.getNode().get(i).getEdge().get(j).getNext())
								.attr("id").value(data.getNode().get(i).getName()+"_edge_"
								+data.getNode().get(i).getEdge().get(j).getNext());
					}else{
						graph.addEdge(data.getNode().get(i).getName(),
								data.getNode().get(i).getEdge().get(j).getNext())
								.attrs().putAll(map3);
						
					}
				
				}

			}

		}

		String fp = svg.generateSVG(graph);
		return fp;
	}

}
