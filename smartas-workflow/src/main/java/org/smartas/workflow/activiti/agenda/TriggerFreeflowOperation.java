package org.smartas.workflow.activiti.agenda;

import org.activiti.bpmn.model.FlowElement;
import org.activiti.bpmn.model.FlowNode;
import org.activiti.engine.impl.agenda.AbstractOperation;
import org.activiti.engine.impl.delegate.TriggerableActivityBehavior;
import org.activiti.engine.impl.interceptor.CommandContext;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.smartas.workflow.activiti.Freeflow;

public class TriggerFreeflowOperation extends AbstractOperation {

	protected Freeflow freeflow;

	/**
	 * @return the freeflow
	 */
	public Freeflow getFreeflow() {
		return freeflow;
	}

	/**
	 * @param freeflow
	 *            the freeflow to set
	 */
	public void setFreeflow(Freeflow freeflow) {
		this.freeflow = freeflow;
	}

	public TriggerFreeflowOperation(CommandContext commandContext, ExecutionEntity execution, Freeflow freeflow) {
		super(commandContext, execution);
		this.freeflow = freeflow;
	}

	public void run() {
		FlowElement currentFlowElement = execution.getCurrentFlowElement();

		if (currentFlowElement == null) {
			currentFlowElement = findCurrentFlowElement(execution);
			execution.setCurrentFlowElement(currentFlowElement);
		}
		FlowNode flowNode = (FlowNode) currentFlowElement;
		TriggerableActivityBehavior activityBehavior = (TriggerableActivityBehavior) flowNode.getBehavior();
		activityBehavior.trigger(execution, "freeflow", freeflow);
	}

}