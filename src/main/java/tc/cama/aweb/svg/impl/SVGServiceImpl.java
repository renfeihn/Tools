package tc.cama.aweb.svg.impl;


import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.struts2.ServletActionContext;

import tc.cama.aweb.svg.SVGServiceI;
import tc.cama.aweb.svg.common.graphviz.Graph;
import tc.cama.aweb.svg.common.graphviz.GraphvizEngine;
import tc.cama.aweb.svg.common.graphviz.OutputType;




public class SVGServiceImpl implements SVGServiceI {

	protected String basePath = "tmp" + File.separator;
	protected GraphvizEngine engine;

	public SVGServiceImpl() {
		engine = new GraphvizEngine();
		this.afterPropertiesSet();
	}

	public void afterPropertiesSet() {
		// File tmpFile = new File(System.getProperty("aim3.basedir"),
		// basePath);
		File tmpFile= new File(ServletActionContext.getServletContext().getRealPath("svg"));
	//	File tmpFile = new File(System.getProperty("user.home"), basePath);
		if (!tmpFile.exists()) {
			tmpFile.mkdir();
		}

		String path = tmpFile.getAbsolutePath();

		engine.fromDirectoryPath(path);

	}

	@Override
	public String generateSVG(Graph graph) {
		if (graph == null) {
			return null;
		}
		List<OutputType> types = new ArrayList<OutputType>();
		OutputType type = engine.getOutputType("svg");
		String outFilename = UUID.randomUUID().toString() + "." + type.name();
		type.toFilePath(outFilename);
		types.add(type);
		int ret = engine.output(graph, types, "dot");
		if (ret != 0) {
			return null;
		}
		return basePath + outFilename;
	}

}
