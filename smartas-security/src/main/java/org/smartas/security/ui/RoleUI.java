/**
 * 
 */
package org.smartas.security.ui;

import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.security.Role;
import org.smartas.security.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author chenb
 *
 */
@RestController()
@RequestMapping("/security/role")
@Resource(code = 1002, model = "Smart", desc = "Role UI")
public class RoleUI extends BaseUI<Role> {
	@Autowired
	private RoleService service;

	protected RoleService getService() {
		return service;
	}

	/*@RequestMapping(value = "/navbar", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<Menu> navbar(Model model) {
		// 预处理数据，去除父未发布的所有子
		List<Menu> list = service.findNavbarMenus();

		return list;
	}*/

}
