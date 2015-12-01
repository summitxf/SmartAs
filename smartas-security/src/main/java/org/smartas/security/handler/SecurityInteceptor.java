package org.smartas.security.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

public class SecurityInteceptor extends HandlerInterceptorAdapter {
	private UrlPathHelper urlPathHelper = new UrlPathHelper();

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler)
			throws java.lang.Exception {

		if (!(handler instanceof HandlerMethod)) {
			return true;
		}

		HandlerMethod handlerMethod = (HandlerMethod) handler;
		Operation opt = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), Operation.class);

		if (opt == null) {
			return true;
		}

		Resource res = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), Resource.class);
		if (res == null) {
			return false;
		}

		return true;
	}

}