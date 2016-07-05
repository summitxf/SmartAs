package org.smartas.security.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import org.smartas.security.User;
import org.smartas.security.dao.UserDao;
import org.smartas.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author chenb
 *
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

	@Autowired
	private UserDao dao;

	protected UserDao getDao() {
		return dao;
	}

	public User findByUserAcount(String username) {
		return dao.findByUserAcount(username);
	}
}
