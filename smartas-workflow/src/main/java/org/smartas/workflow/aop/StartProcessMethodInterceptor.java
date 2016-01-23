package org.smartas.workflow.aop;

import org.aopalliance.intercept.MethodInvocation;

/**
 * @author chebing
 *
 */
public class StartProcessMethodInterceptor extends ActivitiInterceptor {

	public Object invoke(MethodInvocation invocation) throws Throwable {
		/*Headers headers =  super.getWorkflowHeaders();
		String processDefinitionId = WorkflowUitls.getRequestProcessDefinitionId(headers);
		Assert.hasText(processDefinitionId, "you must provide the name of process to start");
		Object result;
		try {
			result = invocation.proceed();
			
			
			
			Object entity = invocation.getArguments()[0];
			
			if(entity instanceof PtFormBig){
				processBusinessKey(((PtFormBig)entity).getId());
			}
			
			
			Map<String,Object> variables = getWorkflowVariables(headers);
			variables.put(ClassUtils.getShortNameAsProperty(entity.getClass()), entity);
			ProcessInstance pins = runtimeService.startProcessInstanceById(processDefinitionId, getBusinessKey(result), variables);
			HttpServletResponse response = WebUtils.getResponse();
			response.setHeader("processInstanceId", pins.getProcessInstanceId());
		} catch (Throwable th) {
			throw new RuntimeException(th);
		}*/

		return invocation.proceed();
	}
}