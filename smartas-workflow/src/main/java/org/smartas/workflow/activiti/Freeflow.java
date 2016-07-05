/**
 * 
 */
package org.smartas.workflow.activiti;

import java.util.ArrayList;
import java.util.List;

import org.activiti.bpmn.model.ActivitiListener;

/**
 * 自由流
 * 
 * @author chenb
 *
 */
public class Freeflow {

	/**
	 * 流向目标环节
	 */
	private String target;

	//扩展参数

	protected List<ActivitiListener> executionListeners = new ArrayList<ActivitiListener>();

	/**
	 * @return the target
	 */
	public String getTarget() {
		return target;
	}

	/**
	 * @param target
	 *            the target to set
	 */
	public void setTarget(String target) {
		this.target = target;
	}

	/**
	 * @return the executionListeners
	 */
	public List<ActivitiListener> getExecutionListeners() {
		return executionListeners;
	}

	/**
	 * @param executionListeners
	 *            the executionListeners to set
	 */
	public void setExecutionListeners(List<ActivitiListener> executionListeners) {
		this.executionListeners = executionListeners;
	}
}
