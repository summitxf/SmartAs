/**
 * 
 */
package org.smartas.security.dao.impl;

import java.util.Arrays;

import org.apache.ibatis.session.SqlSession;
import org.smartas.core.dao.BatisCallback;
import org.smartas.core.dao.BatisDaoImpl;
import org.smartas.security.dao.UserDao;
import org.smartas.security.model.User;
import org.springframework.stereotype.Repository;

/**
 * @author chenb
 *
 */
public class UserDaoImpl  extends BatisDaoImpl<User> implements UserDao {
	public UserDaoImpl() {
		super(User.class);
	}

	public User findByUserAcount(final String username) {
		return execute(new BatisCallback<User>() {
			public User doInBatis(SqlSession session) {
				User user = (User) session.selectOne(getNamespace(clazz) + ".findByUserName", username);
				/*for (AppRole role : user.getRoles()) {
					user.getRights().addAll(Arrays.asList(role.getRights().split(",")));
				}*/
				return user;
			}
		});
	}
	
	
}
