package cn.com.agree.aweb.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;

public class ResumeWord {

	private  Map<String, Template> templates = new HashMap<>(1);

	public ResumeWord() {
		try {
			Configuration configuration = new Configuration();
			configuration.setDefaultEncoding("UTF-8");
			configuration.setClassForTemplateLoading(ResumeWord.class, "/cn/com/agree/templates");
			templates.put("aimlog", configuration.getTemplate("aimlog.ftl"));
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public File createDoc(Map<?, ?> dataMap, String type, String fileName) {
		Writer writer = null;
		try {
			File file = new File(fileName);
			Template t = templates.get(type);
			writer = new OutputStreamWriter(new FileOutputStream(file), "utf-8");
			t.process(dataMap, writer);
			return file;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally{
			try {
				if(null != writer) {
					writer.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
