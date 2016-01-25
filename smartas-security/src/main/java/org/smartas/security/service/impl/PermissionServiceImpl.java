package org.smartas.security.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import org.smartas.security.Permission;
import org.smartas.security.dao.PermissionDao;
import org.smartas.security.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author chenb
 *
 */
@Service
public class PermissionServiceImpl extends BaseServiceImpl<Permission> implements PermissionService {

	@Autowired
	private PermissionDao dao;

	protected PermissionDao getDao() {
		return dao;
	}

	public void updatePermissions(long roleId, String[] perms) {
		dao.delPermsByRoleId(roleId);
		if (perms.length > 0) {
			dao.insertPerms(roleId, perms);
		}
	}

	public String[] getPermissionsByRoleId(long roleId) {
		return dao.getPermissionsByRoleId(roleId);
	}
}
