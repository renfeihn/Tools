package cn.com.agree.aweb.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * 系统初始化
 *
 * @author lihao lihao01@cfischina.com Apr 24, 2015
 */
public class InitializeFilter implements Filter {

    private FilterConfig filterConfig = null;
    //    private ContextCycleRegistry registry = null;
    private static final Logger log = LoggerFactory.getLogger(InitializeFilter.class);

    private static final String LOGIN_PAGE = "/redirect.jsp?active=false";
    private List<String> directRequest;
    private List<String> directRequest_IDE;

    @Override
    /*
     * (non-Javadoc)
	 * @see javax.servlet.Filter#destroy()
	 */
    public void destroy() {
//        if (registry != null) {
//            registry.destroyAll(getServletContext());
//        }
        this.filterConfig = null;
    }

    @Override
    /*
	 * (non-Javadoc)
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        Map<String, String[]> parameterMap = httpRequest.getParameterMap();
        if (parameterMap != null) {
            try {
                if (parameterMap.getClass().getName().equals("org.apache.catalina.util.ParameterMap")) {
                    org.apache.catalina.util.ParameterMap<String, String[]> map = (org.apache.catalina.util.ParameterMap<String, String[]>) parameterMap;
                    map.setLocked(false);
                }
                List<String> keys = new ArrayList<String>(parameterMap.keySet());
                for (String key : keys) {
                    if (key.endsWith("[]")) {
                        String[] value = parameterMap.get(key);
                        parameterMap.put(key.substring(0, key.length() - 2), value);
                    }
                }
            } finally {
                if (parameterMap.getClass().getName().equals("org.apache.catalina.util.ParameterMap")) {
                    org.apache.catalina.util.ParameterMap<String, String[]> map = (org.apache.catalina.util.ParameterMap<String, String[]>) parameterMap;
                    map.setLocked(true);
                }
            }
        }
        String uri = httpRequest.getRequestURI();
        if (uri.indexOf("?") > 0) {
            uri = uri.substring(0, uri.indexOf("?"));
        }
        if (directRequest.contains(httpRequest.getRequestURI()) || directRequest_IDE.contains(uri)) {
            chain.doFilter(request, response);
        } else if (httpRequest.getRequestURI().endsWith(".jsp") ||
                httpRequest.getRequestURI().endsWith(".do")) {
            HttpSession session = httpRequest.getSession(false);
            if (session != null) {
                chain.doFilter(request, response);
            } else {
                sendRedirectToLoginPage(response);
            }
        } else {
            chain.doFilter(request, response);
        }

    }

    /**
     * @param response
     * @throws IOException
     */
    private void sendRedirectToLoginPage(ServletResponse response) throws IOException {
        ((HttpServletResponse) response).sendRedirect(getServletContext().getContextPath() + LOGIN_PAGE);
    }

    @Override
	/*
	 * (non-Javadoc)
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;

        String contextPath = this.filterConfig.getServletContext().getContextPath();
//		String registryPath = filterConfig.getInitParameter(Constants.REGISTRY);
//		log.info("Registry配置文件路径为[{}]", contextPath + File.separator + registryPath);
//
//		InputStream in = XMLUtil.getResourceAsStream(this.getClass(), registryPath);
//		try {
//			registry = ContextCycleRegistryFactory.createRegistry(in);
//			registry.regist(getServletContext());
//		} catch (DocumentException e) {
//			log.error("Registry配置文件读取或者解析异常", e);
//		} finally {
//			if (in != null) {
//				try {
//					in.close();
//				} catch (IOException e) {
//					log.error("Registry配置文件流关闭失败", e);
//				}
//			}
//		}

        this.directRequest = Arrays.asList(new String[]{
                contextPath + "/LoginAction_signIn.do",
                contextPath + "/LoginAction_signOut.do",
                contextPath + "/LoginAction_redirect.do",
                contextPath + "/redirect.jsp"
        });

        this.directRequest_IDE = Arrays.asList(new String[]{
                contextPath + "/NoPasswdLogAction_login.do"
        });

    }

    /**
     * 获取ServletContext
     *
     * @return
     */
    public ServletContext getServletContext() {
        return filterConfig.getServletContext();
    }


}
