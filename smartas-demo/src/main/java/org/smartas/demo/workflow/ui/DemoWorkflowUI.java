/**
 * 
 */
package org.smartas.demo.workflow.ui;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseFlowUI;
import org.smartas.demo.workflow.DemoWorkflow;
import org.smartas.demo.workflow.service.DemoWorkflowService;
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
@RequestMapping("/demo/workflow")
@Resource(code = 9000, model = "Smart", desc = "DemoWorkflow UI")
public class DemoWorkflowUI extends BaseFlowUI<DemoWorkflow> {
	@Autowired
	private DemoWorkflowService service;

	protected DemoWorkflowService getService() {
		return service;
	}

	////
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}
}
