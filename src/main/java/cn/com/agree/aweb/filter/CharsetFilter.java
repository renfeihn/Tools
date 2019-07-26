package cn.com.agree.aweb.filter;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.agree.aweb.Constants;

/**
 * 此处修改编码，如有配置特殊字符过滤，在此处进行转义
 *
 * @author lihao lihao01@cfischina.com
 *         Apr 27, 2015
 */
public class CharsetFilter implements Filter {

    private String encoding = null;
    private Properties properties = null;
    private static final Logger log = LoggerFactory.getLogger(CharsetFilter.class);
    private String exIncludeUrl;
    private String[] exIncludeUrls;

    /*
     * (non-Javadoc)
     * @see javax.servlet.Filter#destroy()
     */
    public void destroy() {
        this.encoding = null;
        this.properties = null;
    }

    /*
     * (non-Javadoc)
     * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        //uri encoding
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        httpRequest.setCharacterEncoding(encoding);

        //response charset
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setContentType("text/html;charset=" + encoding);

        Boolean isExcluded = false;

        for (String url : exIncludeUrls) { //判断是否在过滤url之外
            if (httpRequest.getRequestURI().contains(url)) {
                isExcluded = true;
                break;
            }
        }

        //若配置了XML特殊字符，则在此处进行转义
        if (properties != null) {
            if (!isExcluded) {
                Map<?, ?> parameterMap = httpRequest.getParameterMap();
                Iterator<?> iterator = parameterMap.values().iterator();
                while (iterator.hasNext()) {
                    String[] params = (String[]) iterator.next();
                    doEscape(params);
                }
            }
        }

        chain.doFilter(request, response);
    }

    /**
     * 过滤特殊字符
     *
     * @param params
     */
    private void doEscape(String[] params) {
        for (int i = 0; i < params.length; i++) {
            //如果&也需要转义，则必须放在首位转义
            //否则会将其他字符转义后的&进行二次转义
            if (properties.keySet().contains("&")) {
                params[i] = params[i].replace("&", properties.getProperty("&"));
            }

            for (Object propertie : properties.keySet()) {
                String key = (String) propertie;
                if ("&".equals(key)) {
                    continue;
                }
                params[i] = params[i].replace(key, properties.getProperty(key));
            }
        }
    }

    /*
     * (non-Javadoc)
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     */
    public void init(FilterConfig filterConfig) throws ServletException {
        encoding = filterConfig.getInitParameter("encoding");
        if (encoding == null) {
            encoding = Constants.ENCODING_UTF8;
        }
        log.info("ServletRequest的CharacterEncoding设置为： " + encoding);
        log.info("ServletResponse的ContentType设置为： " + encoding);


        String escapeKey = filterConfig.getInitParameter("escape-key");
        String escapeVal = filterConfig.getInitParameter("escape-val");
        if (escapeKey != null && escapeVal != null) {
            StringTokenizer keyTnr = new StringTokenizer(escapeKey, "||");
            StringTokenizer valTnr = new StringTokenizer(escapeVal, "||");

            if (keyTnr.countTokens() != 0 &&
                    keyTnr.countTokens() == valTnr.countTokens()) {
                properties = new Properties();

                while (keyTnr.hasMoreTokens()) {
                    properties.put(keyTnr.nextToken(), valTnr.nextToken());
                }

                log.info("启用特殊字符过滤， 转义内容为: " + properties);
            }
        }

        // 过滤一些页面不进行数据转换
        exIncludeUrl = filterConfig.getInitParameter("exIncludeUrl");
        if (null != exIncludeUrl) {
            exIncludeUrls = exIncludeUrl.split(",");
        }
    }

}
