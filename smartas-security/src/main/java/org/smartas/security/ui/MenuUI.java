/**
 * 
 */
package org.smartas.security.ui;

import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.security.model.Menu;
import org.smartas.security.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
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

	/*@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<Menu> list(Model model) {
		return service.getAll();
	}*/

}
