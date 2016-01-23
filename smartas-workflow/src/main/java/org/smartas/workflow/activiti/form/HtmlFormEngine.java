package org.smartas.workflow.activiti.form;

import java.util.HashMap;
import java.util.Map;

import org.activiti.engine.form.StartFormData;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.impl.form.FormEngine;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.smartas.core.Entity;

/**
 * @author chebing
 *
 *         基于html技术的工作流表单引擎
 */
public class HtmlFormEngine implements FormEngine {
	public String getName() {
		return "html";
	}

	public Object renderStartForm(StartFormData startForm) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("startForm", startForm);
		result.put("processDefinition", startForm.getProcessDefinition());
		return result;
	}

	public Object renderTaskForm(TaskFormData taskForm) {
		Map<String, Object> result = new HashMap<String, Object>();
		TaskEntity task = (TaskEntity) taskForm.getTask();
		ExecutionEntity execution = task.getExecution();

		//PvmProcessDefinition ppd = execution.getProcessDefinition();
		result.put("taskForm", taskForm);
		//result.put("task", new TaskRest(task));
		result.put("execution", execution);
		result.put("processInstance", execution.getProcessInstance());
		//result.put("processDefinition", execution.getProcessDefinition());
		//result.put("outgoingTransitions", execution.getActivity().getOutgoingTransitions());
		Map<String, Object> variables = task.getVariables();

		for (Object ob : variables.values()) {
			if (ob instanceof Entity) {
				//((Entity) ob).init();
			}
		}
		result.putAll(variables);
		return result;
	}
}
