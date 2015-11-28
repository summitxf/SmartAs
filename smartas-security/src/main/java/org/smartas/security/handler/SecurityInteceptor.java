package org.smartas.security.handler;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

public class SecurityInteceptor extends HandlerInterceptorAdapter{
	private UrlPathHelper urlPathHelper = new UrlPathHelper();
	private Set<String> excludedUrls;
	 
    public void setExcludedUrls(Set<String> excludedUrls) {
        this.excludedUrls = excludedUrls;
    }

	@Override
	public   boolean  preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler)throws java.lang.Exception {
		String lookupPath = urlPathHelper.getLookupPathForRequest(req);
		if(excludedUrls.contains(lookupPath)){
			return true;
		}
        HttpSession session = req.getSession(false);
        if(session == null || session.getAttribute("user") == null){
        	//1.第一次請求
        	//resp.sendRedirect(urlPathHelper.getContextPath(req) + "/login.html");
        	//2.服務請求
        	//return false;
        	//throw new AuthorizationException();
        }
        return true;
     }

	 
}