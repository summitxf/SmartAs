/**
 * 
 */
package org.smartas.security.ui;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.support.WebApplicationObjectSupport;

/**
 * @author chenb 需要动态构建的首页环境变量
 * 
 *         用ftl渲染
 * 
 *         ftl/info.ftl
 */
@Controller()
@RequestMapping("/security/env")
public class EnvUI extends WebApplicationObjectSupport {

	/**
	 * 包括用户及环境信息
	 * 
	 * @return
	 */
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	public String workspace(Model model) {
		String[] profiles = getApplicationContext().getEnvironment().getDefaultProfiles();
		model.addAttribute("profile", StringUtils.join(profiles, ","));
		return "info";
	}
}
