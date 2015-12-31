/**
 * 
 */
package org.smartas.security.dao;

import org.smartas.core.BaseDao;
import org.smartas.security.model.User;
import org.springframework.stereotype.Repository;

/**
 * @author chenb
 *
 */
@Repository
public interface UserDao extends BaseDao<User> {

	User findByUserAcount(String username);
}
