/*
 * 
 * 创建日期：2010-4-16 上午09:28:23
 *
 * 创  建  人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.security.ui;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.smartas.security.model.Credentials;
import org.smartas.security.model.LoginResult;
import org.smartas.security.model.User;
import org.smartas.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "com.jbob.security.ui.Login")
@RequestMapping("/security")
public class Login {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/Index", method = RequestMethod.GET)
	public String index(Model model) {

		return null;
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public LoginResult login(@RequestBody Credentials credentials, HttpServletRequest request) {
		User user = userService.findByUserAcount(credentials.getUsername());
		LoginResult result = new LoginResult();
		result.setContext(request.getContextPath());
		System.out.println(DigestUtils.sha256Hex(credentials.getPassword()));
		if (user == null || !StringUtils.equals(DigestUtils.sha256Hex(credentials.getPassword()), user.getPassword())) {
			result.setStatus(400);
			return result;
		}
		// userService.getAll(1,5);
		request.getSession().setAttribute("user", user);
		result.setStatus(200);
		return result;
	}

}
