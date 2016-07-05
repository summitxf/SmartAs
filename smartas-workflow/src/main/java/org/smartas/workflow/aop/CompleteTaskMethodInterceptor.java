package org.smartas.workflow.aop;

import org.aopalliance.intercept.MethodInvocation;

/**
 * @author chebing
 *
 */
public class CompleteTaskMethodInterceptor extends ActivitiInterceptor {

	public Object invoke(MethodInvocation invocation) throws Throwable {
		Object rval = invocation.proceed();
		/*Headers headers =  super.getWorkflowHeaders();
		String taskId = WorkflowUitls.getRequestTaskId(headers);
		try{
			taskService.claim(taskId, Authentication.getAuthenticatedUserId());

		}catch(ActivitiObjectNotFoundException e){
			e.printStackTrace();
			throw new RuntimeException("任务已经被别人操作!");
			
		}
		Map<String,Object> variables = getWorkflowVariables(headers);
		taskService.complete(taskId,variables);
		HttpServletResponse response = WebUtils.getResponse();
		response.setHeader("processInstanceId", WorkflowUitls.getRequestProcessInstanceId(headers));*/
		return rval;
	}
}