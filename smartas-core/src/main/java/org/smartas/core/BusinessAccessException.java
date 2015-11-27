/*
 * $Id: BusinessAccessException.java,v 1.2 2010/01/18 02:58:06 chenbing Exp $
 * 
 * 文件名称：BusinessAccessException.java
 * 
 * 创建日期：2006-9-7
 * 
 * 版权所有：J.Bob
 */

package org.smartas.core;

/**
 * 所有业务操作异常结构体系的更对象。它是一个抽象对象，用户可以更具需要实现具体的业务操作异常
 * 
 * 比如操作对象是null对象，等等。这个地方如果我们的服务层有业务逻辑错误，回抛出BusinessAccessException异常
 * 对于spring框架的DataAccessException我们不在做包装，直接向上抛出
 * 
 * 这个异常体系也是运行时异常，用户可以选择不用编码捕获这些异常
 *
 * @author chenjpu
 *
 */
public class BusinessAccessException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7750201126168763208L;

	public BusinessAccessException(String msg) {
		super(msg);
	}

	public BusinessAccessException(String msg, Throwable ex) {
		super(msg, ex);
	}
}
