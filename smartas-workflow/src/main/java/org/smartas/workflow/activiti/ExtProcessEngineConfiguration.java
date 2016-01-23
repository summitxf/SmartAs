package org.smartas.workflow.activiti;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.activiti.engine.impl.bpmn.parser.handler.AbstractBpmnParseHandler;
import org.activiti.engine.impl.form.FormEngine;
import org.activiti.engine.parse.BpmnParseHandler;
import org.activiti.spring.SpringProcessEngineConfiguration;
import org.smartas.core.util.BeansUtils;
import org.smartas.workflow.activiti.form.HtmlFormEngine;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author chebing 扩展工作流引擎配置
 */
public class ExtProcessEngineConfiguration extends SpringProcessEngineConfiguration implements InitializingBean {

	protected void initFormEngines() {
		if (formEngines == null) {
			formEngines = new HashMap<String, FormEngine>();
			FormEngine defaultFormEngine = new HtmlFormEngine();
			formEngines.put(null, defaultFormEngine); // default form engine is looked up with null
			formEngines.put(defaultFormEngine.getName(), defaultFormEngine);
		}
	}

	public void afterPropertiesSet() throws Exception {
		List<BpmnParseHandler> bpmnParseHandlers = getPostBpmnParseHandlers();
		if (bpmnParseHandlers == null) {
			bpmnParseHandlers = new ArrayList<BpmnParseHandler>();
		}
		bpmnParseHandlers.addAll(BeansUtils.getBeansOfType(applicationContext, AbstractBpmnParseHandler.class));
		setPostBpmnParseHandlers(bpmnParseHandlers);
	}
}
