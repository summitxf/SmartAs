/**
 * 
 */
package org.smartas.security.ui;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.security.User;
import org.smartas.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author chenb
 *
 */
@RestController()
@RequestMapping("/security/user")
@Resource(code = 1000, model = "Smart", desc = "User UI")
public class UserUI extends BaseUI<User> {

	@Autowired
	private UserService userService;

	protected UserService getService() {
		return userService;
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}

}
