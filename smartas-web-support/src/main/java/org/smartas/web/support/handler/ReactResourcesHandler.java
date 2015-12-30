package org.smartas.web.support.handler;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

/**
 * 处理react资源
 * 
 * @author chenb
 *
 */
public class ReactResourcesHandler extends ResourceHttpRequestHandler {

	private boolean dev = false;

	/**
	 * @return the dev
	 */
	public boolean isDev() {
		return dev;
	}

	/**
	 * @param dev
	 *            the dev to set
	 */
	public void setDev(boolean dev) {
		this.dev = dev;
	}

	protected String processPath(String path) {
		path = super.processPath(path);
		if (isDev()) {
			return path;
		}
		return path.substring(0, path.length() - 4) + ".js";
	}

	protected MediaType getMediaType(Resource resource) {
		return MediaType.TEXT_HTML;
	}
}