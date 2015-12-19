package org.smartas.security.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import org.smartas.security.dao.RoleDao;
import org.smartas.security.model.Role;
import org.smartas.security.service.AppRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author chenb
 *
 */
@Service
public class AppRoleServiceImpl extends BaseServiceImpl<Role> implements AppRoleService {

	@Autowired
	private RoleDao dao;

	protected RoleDao getDao() {
		return dao;
	}
}
