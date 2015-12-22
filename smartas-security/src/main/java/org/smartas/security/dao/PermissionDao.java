/**
 * 
 */
package org.smartas.security.dao;

import org.apache.ibatis.annotations.Param;
import org.smartas.core.BaseDao;
import org.smartas.security.model.Permission;

/**
 * @author chenb
 *
 */
public interface PermissionDao extends BaseDao<Permission> {

	void delPermsByRoleId(long roleId);

	void insertPerms(@Param("roleId") long roleId, @Param("perms") String[] perms);

	String[] getPermissionsByRoleId(long roleId);
}
