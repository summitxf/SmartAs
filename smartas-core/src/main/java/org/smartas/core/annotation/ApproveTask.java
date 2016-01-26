package org.smartas.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD })
public @interface ApproveTask {

	/**
	 * Specifies whether the current conversation should be ended.
	 */
	// boolean endConversation() default false;
}
