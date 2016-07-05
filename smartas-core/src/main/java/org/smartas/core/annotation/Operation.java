/**
 * 
 */
package org.smartas.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author chenb
 *
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Operation {

	/**
	 * 创建
	 */
	int CREATE = 1000;
	String CREATE_DESC = "create";
	/**
	 * 更新
	 */
	int UPDATE = 1002;
	String UPDATE_DESC = "update";
	/**
	 * 读
	 */
	int READ = 1003;
	String READ_DESC = "read";
	/**
	 * 删除
	 */
	int DELETE = 1004;
	String DELETE_DESC = "delete";
	
	
	/**
	 * 创建流程
	 */
	int CREATE_PROCESS = 1005;
	String CREATE_PROCESS_DESC = "create process";
	
	/**
	 * 审批流程
	 */
	int APPROVE_PROCESS = 1006;
	String APPROVE_PROCESS_DESC = "approve process";


	int code();

	String desc();
}
