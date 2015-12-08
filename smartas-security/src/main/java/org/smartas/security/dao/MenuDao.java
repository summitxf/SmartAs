/**
 * 
 */
package org.smartas.security.dao;

import java.util.List;

import org.smartas.core.BaseDao;
import org.smartas.security.model.Menu;

/**
 * @author chenb
 *
 */
public interface MenuDao extends BaseDao<Menu> {

	/**
	 * 查询发布的有效菜单
	 * 
	 * @return
	 */
	List<Menu> findNavbarMenus();

}
