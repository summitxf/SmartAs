/**
 * 
 */
package org.smartas.core.ui;

import org.smartas.core.BaseService;
import org.smartas.core.Entity;

/**
 * @author chenb
 *
 * @param <T>
 */
public abstract class BaseUI<T extends Entity> extends GenericUI<T, Long> {

	protected abstract BaseService<T> getService();
}
