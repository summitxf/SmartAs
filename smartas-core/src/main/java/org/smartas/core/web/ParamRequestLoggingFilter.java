/*
 * 
 * 创建日期：2010-4-16 下午01:36:28
 *
 * 创  建  人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.core.web;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

public class ParamRequestLoggingFilter extends OncePerRequestFilter {

	public static final String DEFAULT_BEFORE_MESSAGE_PREFIX = "Before request [";

	public static final String DEFAULT_BEFORE_MESSAGE_SUFFIX = "]";

	public static final String DEFAULT_AFTER_MESSAGE_PREFIX = "After request [";

	public static final String DEFAULT_AFTER_MESSAGE_SUFFIX = "]";

	public static final String DEFAULT_URL_PATTERN = "/**/*.do";

	private boolean includeQueryString = false;

	private boolean includeClientInfo = false;
	
	private final static PathMatcher pathMatcher = new AntPathMatcher();

	private String urlPattern = DEFAULT_URL_PATTERN;

	// ------------------------------------------------------------- Properties

	public String getUrlPattern() {
		return urlPattern;
	}

	public void setUrlPattern(String urlPattern) {
		this.urlPattern = urlPattern;
	}

	public boolean isIncludeQueryString() {
		return includeQueryString;
	}

	public void setIncludeQueryString(boolean includeQueryString) {
		this.includeQueryString = includeQueryString;
	}

	public boolean isIncludeClientInfo() {
		return includeClientInfo;
	}

	public void setIncludeClientInfo(boolean includeClientInfo) {
		this.includeClientInfo = includeClientInfo;
	}

	/**
	 * TODO:
	 * @param uri
	 * @return
	 */
	private boolean isPattern(String uri) {
		return pathMatcher.match(urlPattern, uri);
	}

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException,
			IOException {
		
		try {
			try{
				chain.doFilter(request, response);
			}catch (ServletException e) {
				e.printStackTrace();
				throw e;
			}catch (Exception e) {
				e.printStackTrace();
			}
		} finally {
			if (isPattern(request.getRequestURI())) {
				StringBuffer buffer = new StringBuffer();
				buffer.append("uri=").append(request.getRequestURI());
				if (isIncludeQueryString()) {
					buffer.append('?').append(request.getQueryString());
				}
				if (isIncludeClientInfo()) {
					String client = request.getRemoteAddr();
					if (client != null) {
						buffer.append(";client=").append(client);
					}
					HttpSession session = request.getSession(false);
					if (session != null) {
						buffer.append(";session=").append(session.getId());
					}
					String user = request.getRemoteUser();
					if (user != null) {
						buffer.append(";user=").append(user);
					}
				}
				buffer.append(" {{{");
				buffer.append(request.getMethod());
				buffer.append("}}} CharacterEncoding " + request.getCharacterEncoding());

				buffer.append("\n>>>>>>>>> Parameters{{{\n");

				Enumeration<?> paras = request.getParameterNames();

				while (paras.hasMoreElements()) {
					Object key = paras.nextElement();
					buffer.append("  >> ");
					buffer.append(key);
					buffer.append("=[");

					String[] values = request.getParameterValues((String) key);

					if (values == null) {
						buffer.append("<null>");
					} else {
						for (int i = 0; i < values.length; i++) {
							if (i != 0) {
								buffer.append(',');
							}
							buffer.append(values[i]);
						}
					}

					buffer.append(']');
					buffer.append('\n');
				}
				buffer.append("}}}");
				System.out.println(buffer.toString());
			}
		}
	}

}
