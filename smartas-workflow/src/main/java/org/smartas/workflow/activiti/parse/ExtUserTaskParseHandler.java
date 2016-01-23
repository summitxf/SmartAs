package org.smartas.workflow.activiti.parse;

import org.activiti.bpmn.model.BaseElement;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.impl.bpmn.parser.BpmnParse;
import org.activiti.engine.impl.bpmn.parser.handler.AbstractBpmnParseHandler;
import org.springframework.core.annotation.Order;
import org.springframework.util.StringUtils;

@Order(8888)
public class ExtUserTaskParseHandler extends AbstractBpmnParseHandler<UserTask> {

	//protected static final OverrideTaskAssignmentsListener OVERRIDE_TASKASSIGNMENTS_LISTENER = new OverrideTaskAssignmentsListener();

	protected Class<? extends BaseElement> getHandledType() {
		return UserTask.class;
	}

	protected void executeParse(BpmnParse bpmnParse, UserTask element) {
		if (element.getOutgoingFlows().size() > 1) {
			for (SequenceFlow sf : element.getOutgoingFlows()) {
				if (!StringUtils.hasText(sf.getConditionExpression())) {
					sf.setConditionExpression("${sequenceFlowId == this.id}");
				}
			}
		}
		//element.addTaskListener(TaskListener.EVENTNAME_CREATE, OVERRIDE_TASKASSIGNMENTS_LISTENER);
	}
}