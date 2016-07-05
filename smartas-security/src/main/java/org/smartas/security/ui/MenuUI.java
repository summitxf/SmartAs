/**
 * 
 */
package org.smartas.security.ui;

import java.util.List;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.security.Menu;
import org.smartas.security.service.MenuService;
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
@RequestMapping("/security/menu")
@Resource(code = 1001, model = "Smart", desc = "Menu UI")
public class MenuUI extends BaseUI<Menu> {
	@Autowired
	private MenuService service;

	protected MenuService getService() {
		return service;
	}

	@RequestMapping(value = "/navbar", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<Menu> navbar(Model model) {
		//预处理数据，去除父未发布的所有子
		List<Menu> list = service.findNavbarMenus();
		
		return list;
	}

}
