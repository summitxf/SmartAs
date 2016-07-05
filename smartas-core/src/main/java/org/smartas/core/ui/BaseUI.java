/**
 * 
 */
package org.smartas.core.ui;

import org.smartas.core.BaseService;
import org.smartas.core.POJO;

/**
 * @author chenb
 *
 * @param <T>
 */
public abstract class BaseUI<T extends POJO> extends GenericUI<T, Long> {

	protected abstract BaseService<T> getService();
}
