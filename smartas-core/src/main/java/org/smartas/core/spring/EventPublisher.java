/**
 * 
 */
package org.smartas.core.spring;

import org.smartas.core.spring.event.AppEvent;

/**
 * @author chenb
 *
 */
public interface EventPublisher {

	void publish(AppEvent event);
}
