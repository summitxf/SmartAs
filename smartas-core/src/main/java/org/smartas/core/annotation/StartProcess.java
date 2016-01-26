package org.smartas.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.TYPE })
public @interface StartProcess {

	/**
	 * The key of the process definition to start, as provided in the 'id'
	 * attribute of a bpmn20.xml process definition.
	 * 
	 * 如果为空，则按实体对象的简短名称作为流程id
	 */
	String value() default "";

}
