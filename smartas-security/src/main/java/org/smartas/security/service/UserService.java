package org.smartas.security.service;

import org.smartas.core.BaseService;
import org.smartas.security.User;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author chenb
 *
 */
public interface UserService extends BaseService<User> {

	@Transactional()
	User findByUserAcount(String username);
}
