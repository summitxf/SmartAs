/**
 * 
 */
package org.smartas.workflow;

/**
 * @author chenb
 *
 */
public class Workflow {

	private String taskId;
	private String processDefId;
	private String processId;
	/**
	 * @return the taskId
	 */
	public String getTaskId() {
		return taskId;
	}
	/**
	 * @param taskId the taskId to set
	 */
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	/**
	 * @return the processDefId
	 */
	public String getProcessDefId() {
		return processDefId;
	}
	/**
	 * @param processDefId the processDefId to set
	 */
	public void setProcessDefId(String processDefId) {
		this.processDefId = processDefId;
	}
	/**
	 * @return the processId
	 */
	public String getProcessId() {
		return processId;
	}
	/**
	 * @param processId the processId to set
	 */
	public void setProcessId(String processId) {
		this.processId = processId;
	}
}
