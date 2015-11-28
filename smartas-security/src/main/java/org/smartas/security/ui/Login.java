/*
 * 
 * 创建日期：2010-4-16 上午09:28:23
 *
 * 创  建  人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.security.ui;

import org.smartas.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller(value = "com.jbob.security.ui.Login")
@RequestMapping("/Authentication")
public class Login {

	@Autowired
	private UserService userService;

	/*@RequestMapping(value = "/CurrentAppUser", method = RequestMethod.GET)
	public String currentAppUser(Model model) {
		AppUser currentUser = SecurityContextUtil.getCurrentUser();
		Department curDep = currentUser.getDepartment();
		if (curDep == null) {
			curDep = new Department();
			curDep.setId(Long.valueOf(0L));
			curDep.setName("Root");
		}
		//Iterator publicIds = AppUtil.getPublicMenuIds().iterator();
		Set<String> rights = new HashSet<String>(xmlMenuManager.getPublicIds());
		rights.addAll(currentUser.getRights());
		StringBuffer sb = new StringBuffer();
		sb.append("{success:true,user:{userId:'").append(currentUser.getId()).append("',fullname:'").append(currentUser.getFullname())
				.append("',depId:'").append(curDep.getId()).append("',depName:'").append(curDep.getName()).append("',rights:'");
		sb.append(rights.toString().replace("[", "").replace("]",""));
		sb.append("'}}");
		model.addAttribute("json", sb.toString());
		return JSON;
	}*/
	
	@RequestMapping(value = "/Index", method = RequestMethod.GET)
	public String index(Model model) {
		
		return null;
	}

	@RequestMapping(value = "/Login", method = RequestMethod.POST)
	public String login(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
		
		
		
		
		
		/*User user = null;
		if (!"".equals(username) && username != null) {
			user = userService.findByUserAcount(username);
			if (user != null) {
				if (StringUtils.hasText(password)) {
					newPassword = StringUtil.encryptSha256(password);
					if (user.getPassword().equalsIgnoreCase(newPassword)) {
						//if (captcha.isCorrect(checkCode)) {
						if (user.getStatus().shortValue() == 1)
							login = true;
						else
							msg.append("此用户已被禁用.'");
						//}
						//else msg.append("验证码不正确.'");
					} else
						msg.append("密码不正确.'");
				} else
					msg.append("密码不能为空.'");
			} else
				msg.append("用户不存在.'");
		}
		if (login) {
			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
			SecurityContext securityContext = SecurityContextHolder.getContext();
			securityContext.setAuthentication(authenticationManager.authenticate(authRequest));

			SecurityContextHolder.setContext(securityContext);
			//getSession().setAttribute("SPRING_SECURITY_LAST_USERNAME", username);
			//String rememberMe = getRequest().getParameter("_spring_security_remember_me");
			if (rememberMe != null && rememberMe.equals("on")) {
				long tokenValiditySeconds = 0x127500L;
				long tokenExpiryTime = System.currentTimeMillis() + tokenValiditySeconds * 1000L;
				String signatureValue = DigestUtils.md5Hex((new StringBuilder(String.valueOf(username))).append(":")
						.append(tokenExpiryTime).append(":").append(user.getPassword()).append(":").append(key).toString());
				String tokenValue = (new StringBuilder(String.valueOf(username))).append(":").append(tokenExpiryTime).append(":").append(
						signatureValue).toString();
				String tokenValueBase64 = new String(Base64.encodeBase64(tokenValue.getBytes()));
				getResponse().addCookie(makeValidCookie(tokenExpiryTime, tokenValueBase64));
			}
			model.addAttribute("json", "{success:true}");
			//setJson();
		} else {
			msg.append(",failure:true}");
			//setJson(msg.toString());
			model.addAttribute("json", msg.toString());
		}
		return JSON;*/
		
		return null;
	}

	/*protected Cookie makeValidCookie(long expiryTime, String tokenValueBase64) {
		HttpServletRequest request = getRequest();
		Cookie cookie = new Cookie("SPRING_SECURITY_REMEMBER_ME_COOKIE", tokenValueBase64);
		cookie.setMaxAge(0x9660180);
		cookie.setPath(org.springframework.util.StringUtils.hasLength(request.getContextPath()) ? request.getContextPath() : "/");
		return cookie;
	}*/
}
