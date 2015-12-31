/**
 * 
 */
package org.smartas.core.spring;

import org.smartas.core.spring.event.AppEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

/**
 * @author chenb
 *
 */
public class DefaultEventPublisher implements EventPublisher {

	@Autowired
	private ApplicationContext applicationContext;

	public void publish(AppEvent event) {
		applicationContext.publishEvent(event);
	}
}
