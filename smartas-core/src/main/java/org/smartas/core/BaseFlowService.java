package org.smartas.core;

import java.io.Serializable;

import org.smartas.core.annotation.ApproveTask;
import org.smartas.core.annotation.StartProcess;

/**
 * 
 * @author chenbing
 *
 */
public interface BaseFlowService<T extends FlowAware> extends BaseService<T> {

	/**
	 * 默认行文的流程发起
	 * 
	 * @param vo
	 */
	@StartProcess()
	Serializable start(T vo);

	/**
	 * 默认行为的流程审批
	 * 
	 * @param vo
	 */
	@ApproveTask
	void approve(T vo);
}