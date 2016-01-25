/**
 * 
 */
package org.smartas.workflow.activiti.impl;

import java.util.Map;

import org.activiti.engine.impl.TaskServiceImpl;
import org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.smartas.workflow.activiti.Freeflow;
import org.smartas.workflow.activiti.FreeflowTaskService;
import org.smartas.workflow.activiti.cmd.CompleteFreeflowTaskCmd;

/**
 * @author chenb
 *
 */
public class FreeflowTaskServiceImpl extends TaskServiceImpl implements FreeflowTaskService {
	public FreeflowTaskServiceImpl() {

	}
	public FreeflowTaskServiceImpl(ProcessEngineConfigurationImpl processEngineConfiguration) {
		super(processEngineConfiguration);
	}

	public void complete(String taskId, Freeflow freeflow) {
		commandExecutor.execute(new CompleteFreeflowTaskCmd(taskId, null, freeflow));
	}

	public void complete(String taskId, Map<String, Object> variables, Freeflow freeflow) {
		commandExecutor.execute(new CompleteFreeflowTaskCmd(taskId, variables, freeflow));
	}

	public void complete(String taskId, Map<String, Object> variables, boolean localScope, Freeflow freeflow) {
		commandExecutor.execute(new CompleteFreeflowTaskCmd(taskId, variables, localScope, freeflow));
	}
}
