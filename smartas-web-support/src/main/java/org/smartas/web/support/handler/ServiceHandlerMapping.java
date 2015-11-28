/**
 * 
 */
package org.smartas.web.support.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.util.UrlPathHelper;

/**
 * @author chenb
 *
 */
public class ServiceHandlerMapping extends RequestMappingHandlerMapping {
	
	private String prefix = "/servicecs";
	
	public ServiceHandlerMapping() {
		setUrlPathHelper(new ServicePathHelper());
	}
	
	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	/**
	 * 服務地址
	 * @author chenb
	 *
	 */
	class ServicePathHelper extends UrlPathHelper {
		public String getLookupPathForRequest(HttpServletRequest request) {
			String path = super.getLookupPathForRequest(request);
			return path.substring(prefix.length());
		}
	}
}
