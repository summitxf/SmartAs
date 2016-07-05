package org.smartas.workflow.aop;

import java.util.Set;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.aopalliance.intercept.MethodInterceptor;
import org.springframework.beans.factory.annotation.Autowired;

abstract class ActivitiInterceptor implements MethodInterceptor {

	private Set<String> excludeVariableNames;

	public void setExcludeVariableNames(Set<String> excludeVariableNames) {
		this.excludeVariableNames = excludeVariableNames;
	}

	@Autowired
	protected RuntimeService runtimeService;

	@Autowired
	protected TaskService taskService;

	@Autowired
	protected HistoryService historyService;

	/**
	 * @return the excludeVariableNames
	 */
	public Set<String> getExcludeVariableNames() {
		return excludeVariableNames;
	}

	/*
	 * protected final Map<String, Object> getWorkflowVariables() { Map<String,
	 * Object> variables = new HashMap<String, Object>(); for (Entry<String,
	 * Object> entry : headers.entrySet()) {
	 * if(!excludeVariableNames.contains(entry.getKey())){
	 * variables.put(entry.getKey(), entry.getValue()); } } return variables; }
	 */
}
