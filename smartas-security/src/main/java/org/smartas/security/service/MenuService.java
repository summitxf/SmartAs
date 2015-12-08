/**
 * 
 */
package org.smartas.security.service;

import java.util.List;

import org.smartas.core.BaseService;
import org.smartas.security.model.Menu;

/**
 * @author chenb
 *
 */
public interface MenuService extends BaseService<Menu> {

	List<Menu> findNavbarMenus();
}
