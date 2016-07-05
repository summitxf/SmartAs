/**
 * 
 */
package org.smartas.workflow.activiti;

import java.util.Map;

import org.activiti.engine.TaskService;

/**
 * 自由流task服务接口
 * 
 * @author chenb
 *
 */
public interface FreeflowTaskService extends TaskService {

	void complete(String taskId, Freeflow freeflow);

	void complete(String taskId, Map<String, Object> variables, Freeflow freeflow);

	void complete(String taskId, Map<String, Object> variables, boolean localScope, Freeflow freeflow);
}
