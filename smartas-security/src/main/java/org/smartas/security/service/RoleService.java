package org.smartas.security.service;

import org.smartas.core.BaseService;
import org.smartas.security.model.Role;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author chenb
 *
 */
@Transactional()
public interface RoleService extends BaseService<Role> {

}
