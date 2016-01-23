package org.smartas.workflow.activiti.parse;

import org.activiti.bpmn.model.BaseElement;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.engine.impl.bpmn.parser.BpmnParse;
import org.activiti.engine.impl.bpmn.parser.handler.AbstractBpmnParseHandler;
import org.springframework.core.annotation.Order;
import org.springframework.util.StringUtils;

@Order(999)
public class SequenceFlowParseHandler extends AbstractBpmnParseHandler<SequenceFlow> {

	@Override
	protected void executeParse(BpmnParse bpmnParse, SequenceFlow sequenceFlow) {
		String conditionExpression = sequenceFlow.getConditionExpression();
		if (!StringUtils.hasText(conditionExpression)) {
			sequenceFlow.setConditionExpression(conditionExpression.replace("this.id", "'" + sequenceFlow.getId() + "'"));
		}
	}

	@Override
	protected Class<? extends BaseElement> getHandledType() {
		return SequenceFlow.class;
	}

}
