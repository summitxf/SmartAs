/**
 * 
 */
package ${pkg}.ui;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import ${pkg}.${name};
import ${pkg}.service.${name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ftl
 *
 */
@RestController()
@RequestMapping("/xxx/${name?uncap_first}")
@Resource(code = xxxx, model = "Smart", desc = "${name} UI")
public class ${name}UI extends BaseUI<${name}> {
	@Autowired
	private ${name}Service service;

	protected ${name}Service getService() {
		return service;
	}
	
	////
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}
}
