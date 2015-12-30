/**
 * 
 */
package org.smartas.security.ui;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author chenb
 *
 */
@Controller()
@RequestMapping("/security/env")
public class EnvUI {

	/**
	 * 包括用户及环境信息
	 * @return
	 */
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	public String workspace(Model model) {
		model.addAttribute("profile", "pro");
		return "info";
	}
}
