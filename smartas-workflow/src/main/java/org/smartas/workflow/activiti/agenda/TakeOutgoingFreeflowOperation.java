package org.smartas.workflow.activiti.agenda;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.activiti.bpmn.model.Activity;
import org.activiti.bpmn.model.BoundaryEvent;
import org.activiti.bpmn.model.CancelEventDefinition;
import org.activiti.bpmn.model.FlowElement;
import org.activiti.bpmn.model.FlowNode;
import org.activiti.bpmn.model.Process;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.delegate.event.ActivitiEventType;
import org.activiti.engine.delegate.event.impl.ActivitiEventBuilder;
import org.activiti.engine.impl.agenda.AbstractOperation;
import org.activiti.engine.impl.context.Context;
import org.activiti.engine.impl.interceptor.CommandContext;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.util.CollectionUtil;
import org.activiti.engine.impl.util.ProcessDefinitionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.smartas.workflow.activiti.Freeflow;

public class TakeOutgoingFreeflowOperation extends AbstractOperation {

	private static final Logger logger = LoggerFactory.getLogger(TakeOutgoingFreeflowOperation.class);

	protected Freeflow freeflow;

	public TakeOutgoingFreeflowOperation(CommandContext commandContext, ExecutionEntity activityExecution, Freeflow freeflow) {
		super(commandContext, activityExecution);
		this.freeflow = freeflow;
	}

	public void run() {
		FlowElement flowNode = execution.getCurrentFlowElement();

		if (flowNode == null) {
			flowNode = findCurrentFlowElement(execution);
			execution.setCurrentFlowElement(flowNode);
		}

		// If execution is a scope (and not the process instance), the scope must first be destroyed before we can continue
		if (execution.getParentId() != null && execution.isScope()) {
			agenda.planDestroyScopeOperation(execution);

		} else if (flowNode instanceof Activity) {
			Activity activity = (Activity) flowNode;
			if (CollectionUtil.isNotEmpty(activity.getBoundaryEvents())) {

				List<String> notToDeleteEvents = new ArrayList<String>();
				for (BoundaryEvent event : activity.getBoundaryEvents()) {
					if (CollectionUtil.isNotEmpty(event.getEventDefinitions())
							&& event.getEventDefinitions().get(0) instanceof CancelEventDefinition) {

						notToDeleteEvents.add(event.getId());
					}
				}

				// Delete all child executions
				Collection<ExecutionEntity> childExecutions = commandContext.getExecutionEntityManager()
						.findChildExecutionsByParentExecutionId(execution.getId());
				for (ExecutionEntity childExecution : childExecutions) {
					if (childExecution.getCurrentFlowElement() == null
							|| notToDeleteEvents.contains(childExecution.getCurrentFlowElement().getId()) == false) {
						commandContext.getExecutionEntityManager().deleteExecutionAndRelatedData(childExecution, null, false);
					}
				}
			}
		}

		// Execution listener for end: the flow node is now ended
		if (CollectionUtil.isNotEmpty(flowNode.getExecutionListeners()) && !execution.isProcessInstanceType()) { // a process instance execution can never leave a flownode, but it can pass here whilst cleaning up
			executeExecutionListeners(flowNode, ExecutionListener.EVENTNAME_END);
		}

		// No scope, can continue
		if (execution.getId().equals(execution.getProcessInstanceId()) == false) {
			Context.getProcessEngineConfiguration().getEventDispatcher()
					.dispatchEvent(ActivitiEventBuilder.createActivityEvent(ActivitiEventType.ACTIVITY_COMPLETED, flowNode.getId(),
							flowNode.getName(), execution.getId(), execution.getProcessInstanceId(), execution.getProcessDefinitionId(),
							flowNode));
		}

		Process process = ProcessDefinitionUtil.getProcess(execution.getProcessDefinitionId());
		SequenceFlow freeflowSF = new SequenceFlow(flowNode.getId(), freeflow.getTarget());
		freeflowSF.setTargetFlowElement(process.getFlowElement(freeflow.getTarget(), true));
		freeflowSF.setSourceFlowElement(flowNode);
		freeflowSF.setExecutionListeners(freeflow.getExecutionListeners());
		continueThroughSequenceFlow(freeflowSF);
	}

	protected void continueThroughSequenceFlow(SequenceFlow sequenceFlow) {

		// Execution listener
		if (CollectionUtil.isNotEmpty(sequenceFlow.getExecutionListeners())) {
			executeExecutionListeners(sequenceFlow, null, ExecutionListener.EVENTNAME_TAKE, true); // True -> any event type will be treated as 'take' for a sequence flow
		}

		// Firing event that transition is being taken       
		if (Context.getProcessEngineConfiguration() != null && Context.getProcessEngineConfiguration().getEventDispatcher().isEnabled()) {
			FlowElement sourceFlowElement = sequenceFlow.getSourceFlowElement();
			FlowElement targetFlowElement = sequenceFlow.getTargetFlowElement();
			Context.getProcessEngineConfiguration().getEventDispatcher()
					.dispatchEvent(ActivitiEventBuilder.createSequenceFlowTakenEvent((ExecutionEntity) execution,
							ActivitiEventType.SEQUENCEFLOW_TAKEN, sequenceFlow.getId(),
							sourceFlowElement != null ? sourceFlowElement.getId() : null,
							sourceFlowElement != null ? (String) sourceFlowElement.getName() : null,
							sourceFlowElement != null ? sourceFlowElement.getClass().getName() : null,
							sourceFlowElement != null ? ((FlowNode) sourceFlowElement).getBehavior() : null,
							targetFlowElement != null ? targetFlowElement.getId() : null,
							targetFlowElement != null ? targetFlowElement.getName() : null,
							targetFlowElement != null ? targetFlowElement.getClass().getName() : null,
							targetFlowElement != null ? ((FlowNode) targetFlowElement).getBehavior() : null));
		}

		FlowElement targetFlowElement = sequenceFlow.getTargetFlowElement();
		execution.setCurrentFlowElement(targetFlowElement);
		logger.debug("Sequence flow '{}' encountered. Continuing process by following it using execution {}", sequenceFlow.getId(),
				execution.getId());
		agenda.planContinueProcessOperation(execution);
	}

}