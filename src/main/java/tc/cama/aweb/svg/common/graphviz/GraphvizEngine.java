package tc.cama.aweb.svg.common.graphviz;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Graphviz engine to generate of graph output
 * 
 * @author Everton Cardoso
 * 
 */
public class GraphvizEngine {

	private boolean isLinux = System.getProperty("os.name").toLowerCase()
			.indexOf("linux") != -1;
	/**
	 * directory path where the dot command will be executed.
	 */
	private String directoryPathExecute = ".";

	public GraphvizEngine() {
	}

	/**
	 * generate the output file
	 * 
	 * @param graph
	 * @param types
	 * @param layoutManager
	 * @return
	 */
	public int output(Graph graph, List<OutputType> types, String layoutManager) {

		String dotContent = graph.output();
		System.out.println(dotContent);

		try {
			String prog = findExecutable(layoutManager);
			File tmpDot = createDotFileTemp("in", dotContent);

			StringBuilder outputTypes = new StringBuilder();
			for (OutputType type : types) {
				outputTypes.append(" -T").append(type.name()).append(" -o")
						.append(type.filePath());
			}

			String dotCommand = null;
			if (isLinux) {
				dotCommand = prog + outputTypes + " " + tmpDot.getPath();
			} else {
				dotCommand = "\"" + prog + "\"" + outputTypes + " " + "\""
						+ tmpDot.getPath() + "\"";
			}
			Process process = Runtime.getRuntime().exec(dotCommand, null,
					new File(directoryPathExecute));

			int exitVal = process.waitFor();

			return exitVal;
		} catch (IOException e) {

			throw new GraphvizOutputException(e.getMessage(), e);

		} catch (InterruptedException e) {

			throw new GraphvizOutputException(e.getMessage(), e);
		}

	}

	private String findExecutable(String prog) {
		if (isLinux) {
			return prog;
		}
		Map<String, String> env = System.getenv();
		String[] paths = new String[0];
		for (String key : env.keySet()) {
			if (key.equalsIgnoreCase("path")) {
				paths = env.get(key).split(File.pathSeparator);
			}
		}
		for (String path : paths) {
			String file = (path == null) ? prog
					: (path + File.separator + prog);
			if (!isLinux) {
				file = file + ".exe";
			}
			if (new File(file).canExecute() && !new File(file).isDirectory()) {
				return file;
			}
		}

		throw new GraphvizEngineException(prog + " program not found.");
	}

	/**
	 * create a file temp with the content of the dot.
	 * 
	 * @param dotContent
	 * @return
	 */
	private File createDotFileTemp(String suffix, String dotContent) {
		try {
			File temp = File.createTempFile("graph", suffix);
			if (dotContent != null) {
				BufferedWriter out = new BufferedWriter(new FileWriter(temp));
				try {
					out.write(dotContent);
				} finally {
					out.close();
				}
			}
			return temp;
		} catch (IOException e) {
			throw new GraphvizOutputException(e.getMessage(), e);
		}
	}

	/**
	 * define where the dot command will be executed.
	 * 
	 * @param dir
	 * @return
	 */
	public GraphvizEngine fromDirectoryPath(String path) {
		this.directoryPathExecute = path;
		return this;
	}

	public OutputType getOutputType(String type) {
		return new OutputType(type);
	}

}
