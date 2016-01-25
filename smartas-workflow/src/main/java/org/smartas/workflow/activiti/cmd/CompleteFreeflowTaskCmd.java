package org.smartas.workflow.activiti.cmd;

import java.util.Map;

import org.activiti.engine.ActivitiException;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.delegate.event.ActivitiEventDispatcher;
import org.activiti.engine.delegate.event.ActivitiEventType;
import org.activiti.engine.delegate.event.impl.ActivitiEventBuilder;
import org.activiti.engine.impl.cmd.NeedsActiveTaskCmd;
import org.activiti.engine.impl.context.Context;
import org.activiti.engine.impl.identity.Authentication;
import org.activiti.engine.impl.interceptor.CommandContext;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.task.DelegationState;
import org.activiti.engine.task.IdentityLinkType;
import org.smartas.workflow.activiti.Freeflow;
import org.smartas.workflow.activiti.agenda.TriggerFreeflowOperation;

public class CompleteFreeflowTaskCmd extends NeedsActiveTaskCmd<Void> {

	private static final long serialVersionUID = 1L;
	protected Map<String, Object> variables;
	protected boolean localScope;
	protected Freeflow freeflow;

	public CompleteFreeflowTaskCmd(String taskId, Map<String, Object> variables, Freeflow freeflow) {
		super(taskId);
		this.variables = variables;
		this.freeflow = freeflow;
	}

	public CompleteFreeflowTaskCmd(String taskId, Map<String, Object> variables, boolean localScope, Freeflow freeflow) {
		super(taskId);
		this.variables = variables;
		this.localScope = localScope;
		this.freeflow = freeflow;
	}

	protected Void execute(CommandContext commandContext, TaskEntity task) {
		// Backwards compatibility
		/*if (task.getProcessDefinitionId() != null) {
			if (Activiti5Util.isActiviti5ProcessDefinitionId(commandContext, task.getProcessDefinitionId())) {
				Activiti5CompatibilityHandler activiti5CompatibilityHandler = Activiti5Util.getActiviti5CompatibilityHandler();
				activiti5CompatibilityHandler.completeTask(task, variables, localScope);
				return null;
			}
		}*/

		if (variables != null) {
			if (localScope) {
				task.setVariablesLocal(variables);
			} else if (task.getExecutionId() != null) {
				task.setExecutionVariables(variables);
			} else {
				task.setVariables(variables);
			}
		}

		executeTaskComplete(commandContext,task);
		return null;
	}

	@Override
	protected String getSuspendedTaskException() {
		return "Cannot complete a suspended task";
	}

	protected void executeTaskComplete(CommandContext commandContext, TaskEntity taskEntity) {
		// Task complete logic

		if (taskEntity.getDelegationState() != null && taskEntity.getDelegationState().equals(DelegationState.PENDING)) {
			throw new ActivitiException("A delegated task cannot be completed, but should be resolved instead.");
		}

		commandContext.getTaskEntityManager().fireTaskListenerEvent(taskEntity, TaskListener.EVENTNAME_COMPLETE);
		if (Authentication.getAuthenticatedUserId() != null && taskEntity.getProcessInstanceId() != null) {
			ExecutionEntity processInstanceEntity = commandContext.getExecutionEntityManager().findById(taskEntity.getProcessInstanceId());
			commandContext.getIdentityLinkEntityManager().involveUser(processInstanceEntity, Authentication.getAuthenticatedUserId(),
					IdentityLinkType.PARTICIPANT);
		}

		ActivitiEventDispatcher eventDispatcher = Context.getProcessEngineConfiguration().getEventDispatcher();
		if (eventDispatcher.isEnabled()) {
			if (variables != null) {
				eventDispatcher.dispatchEvent(ActivitiEventBuilder.createEntityWithVariablesEvent(ActivitiEventType.TASK_COMPLETED,
						taskEntity, variables, localScope));
			} else {
				eventDispatcher.dispatchEvent(ActivitiEventBuilder.createEntityEvent(ActivitiEventType.TASK_COMPLETED, taskEntity));
			}
		}

		commandContext.getTaskEntityManager().deleteTask(taskEntity, TaskEntity.DELETE_REASON_COMPLETED, false, false);

		// Continue process (if not a standalone task)
		if (taskEntity.getExecutionId() != null) {
			ExecutionEntity executionEntity = commandContext.getExecutionEntityManager().findById(taskEntity.getExecutionId());
			commandContext.getAgenda().planOperation(new TriggerFreeflowOperation(commandContext, executionEntity,freeflow), executionEntity);
		}
	}

}