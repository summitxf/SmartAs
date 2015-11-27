/*
 * 
 * 创建日期：2010-4-16 上午11:28:52
 *
 * 创  建  人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.core;


/**
 * @author chenb
 *
 */
public abstract class BaseEntity implements Entity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3617220118055104348L;
	
	private Long id;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

}
