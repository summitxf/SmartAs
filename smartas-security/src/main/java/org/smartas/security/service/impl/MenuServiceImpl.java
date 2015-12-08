package org.smartas.security.service.impl;

import java.util.List;

import org.smartas.core.service.BaseServiceImpl;
import org.smartas.security.dao.MenuDao;
import org.smartas.security.model.Menu;
import org.smartas.security.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author chenb
 *
 */
@Service
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements MenuService {

	@Autowired
	private MenuDao dao;

	protected MenuDao getDao() {
		return dao;
	}

	public List<Menu> findNavbarMenus() {
		// TODO Auto-generated method stub
		return dao.findNavbarMenus();
	}

}
