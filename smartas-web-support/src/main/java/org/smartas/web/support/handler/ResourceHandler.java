/**
 * 
 */
package org.smartas.web.support.handler;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

/**
 * @author chenb
 *
 */
public class ResourceHandler extends ResourceHttpRequestHandler {
	private Resource resource;
	
	public void setResource(Resource resource) {
		this.resource = resource;
	}

	@Override
	protected Resource getResource(HttpServletRequest request){
		return resource;
	}
}
