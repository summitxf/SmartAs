package org.smartas.workflow.activiti.behavior;

import java.util.List;

import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.impl.bpmn.behavior.UserTaskActivityBehavior;
import org.activiti.engine.impl.context.Context;
import org.activiti.engine.impl.el.ExpressionManager;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntity;
import org.activiti.engine.impl.persistence.entity.TaskEntityManager;
import org.smartas.workflow.activiti.Freeflow;
import org.smartas.workflow.activiti.agenda.TakeOutgoingFreeflowOperation;

public class FreeflowUserTaskActivityBehavior extends UserTaskActivityBehavior {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4168019535562523041L;

	public FreeflowUserTaskActivityBehavior(ExpressionManager expressionManager, UserTask userTask) {
		super(expressionManager, userTask);
	}

	public void trigger(DelegateExecution execution, String signalName, Object signalData) {
		TaskEntityManager taskEntityManager = Context.getCommandContext().getTaskEntityManager();
		List<TaskEntity> taskEntities = taskEntityManager.findTasksByExecutionId(execution.getId()); // Should be only one
		for (TaskEntity taskEntity : taskEntities) {
			if (!taskEntity.isDeleted()) {
				throw new ActivitiException("UserTask should not be signalled before complete");
			}
		}
		//处理任务自由流
		if ("freeflow".equals(signalName)) {
			Context.getAgenda().planOperation(
					new TakeOutgoingFreeflowOperation(Context.getCommandContext(), (ExecutionEntity) execution, (Freeflow) signalData),
					(ExecutionEntity) execution);
		} else {
			leave(execution);
		}

	}
}
