/*
 * 
 * 创建日期：2010-4-16 上午11:28:52
 *
 * 创  建  人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.core.model;

import org.smartas.core.POJO;

/**
 * @author chenb
 *
 */
public abstract class BaseVO implements POJO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3617220118055104348L;

	protected String tenantId;// 多租户
	protected String scope;//
	protected int revision = 1;//版本

	/**
	 * @return the tenantId
	 */
	public String getTenantId() {
		return tenantId;
	}

	/**
	 * @param tenantId
	 *            the tenantId to set
	 */
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	/**
	 * @return the scope
	 */
	public String getScope() {
		return scope;
	}

	/**
	 * @param scope
	 *            the scope to set
	 */
	public void setScope(String scope) {
		this.scope = scope;
	}

	/**
	 * @return the revision
	 */
	public int getRevision() {
		return revision;
	}

	/**
	 * @param revision
	 *            the revision to set
	 */
	public void setRevision(int revision) {
		this.revision = revision;
	}

	public int getRevisionNext() {
		return revision + 1;
	}
}
