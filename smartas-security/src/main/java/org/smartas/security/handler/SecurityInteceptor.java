package org.smartas.security.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.util.Assert;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SecurityInteceptor extends HandlerInterceptorAdapter {
	// private UrlPathHelper urlPathHelper = new UrlPathHelper();

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler)
			throws java.lang.Exception {

		// .非注解UI直接返回
		if (!(handler instanceof HandlerMethod)) {
			return true;
		}

		// .查询方法的操作注解
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		Operation opt = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), Operation.class);

		// .普通方法,直接返回
		if (opt == null) {
			return true;
		}

		// .方法对应的资源定义
		Resource res = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), Resource.class);
		Assert.notNull(res, handlerMethod.getBeanType() + " need @Resource");
		return true;
	}

}