package cn.com.agree.aweb.filter.cycle;

import java.util.Date;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.aim.alibaba.fastjson.JSON;
import com.aim.alibaba.fastjson.serializer.SerializeConfig;
import com.aim.alibaba.fastjson.serializer.SimpleDateFormatSerializer;

/**
 * 管理当前Context应用的周期
 *
 * @author lihao lihao01@cfischina.com Jul 20, 2015
 */
public class StandardContextCycle implements ContextCycle {

	/**
	 * 
	 */

	private final static Logger log = LoggerFactory.getLogger(StandardContextCycle.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see cn.com.agree.aweb.base.filter.ContextCycle#initialize(javax.servlet.
	 * ServletContext)
	 */
	@Override
	public void initialize(ServletContext servletContext) {
		try {
			log.info("初始化json日期格式化配置");
			SerializeConfig.getGlobalInstance().put(Date.class,
					new SimpleDateFormatSerializer(JSON.DEFFAULT_DATE_FORMAT));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see cn.com.agree.aweb.base.filter.ContextCycle#destroy(javax.servlet.
	 * ServletContext)
	 */
	@Override
	public void destroy(ServletContext servletContext) {
	}

}
