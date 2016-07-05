package org.smartas.demo.workflow.service.impl;

import org.smartas.core.service.BaseFlowServiceImpl;
import org.smartas.demo.workflow.DemoWorkflow;
import org.smartas.demo.workflow.dao.DemoWorkflowDao;
import org.smartas.demo.workflow.service.DemoWorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ftl
 *
 */
@Service
public class DemoWorkflowServiceImpl extends BaseFlowServiceImpl<DemoWorkflow> implements DemoWorkflowService {

	@Autowired
	private DemoWorkflowDao dao;

	protected DemoWorkflowDao getDao() {
		return dao;
	}

	////

}
