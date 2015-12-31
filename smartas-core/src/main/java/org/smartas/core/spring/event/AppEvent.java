package org.smartas.core.spring.event;

import org.springframework.context.ApplicationEvent;

/**
 * 应用框架事件
 * @author chenb
 *
 */
public abstract class AppEvent extends ApplicationEvent {
	/**
	 * 
	 */
	private static final long serialVersionUID = -892572421269110349L;

	public AppEvent(Object source) {
		super(source);
	}
}
