package tc.cama.aweb.svg.tmpl;

import java.util.HashMap;
import java.util.Map;

import tc.cama.aweb.svg.data.GraphData;
import tc.cama.aweb.svg.impl.ASvgGraph;
import tc.cama.aweb.svg.impl.BSvgGraph;
import tc.cama.aweb.svg.impl.CSvgGraph;
import tc.cama.aweb.svg.impl.DSvgGraph;
import tc.cama.aweb.svg.impl.ESvgGraph;




/**
 * 有些什么样的内置svg图。
 * 
 * @author yuan
 *
 */
public class TemplateFactory {

	private static final TemplateFactory instance = new TemplateFactory();

	private Map<String, Class<? extends SvgGraph>> graphs = new HashMap<String, Class<? extends SvgGraph>>();

	private TemplateFactory() {
		// 内置的svg图
		regist(GraphType.A.name(), ASvgGraph.class);
		regist(GraphType.B.name(), BSvgGraph.class);
		regist(GraphType.C.name(), CSvgGraph.class);
		regist(GraphType.D.name(), DSvgGraph.class);
		regist(GraphType.E.name(), ESvgGraph.class);
	}

	public static TemplateFactory getInstance() {
		return instance;
	}

	/**
	 * 注册SVG图
	 * 
	 * @param type
	 * @param graph
	 */
	public void regist(String type, Class<? extends SvgGraph> graph) {
		graphs.put(type, graph);
	}

	public String generate(String type, GraphData data) {
		Class<? extends SvgGraph> clazz = graphs.get(type);
		SvgGraph graph;
		try {
			graph = clazz.getConstructor(GraphData.class).newInstance(data);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return graph.generate();
	}
}
