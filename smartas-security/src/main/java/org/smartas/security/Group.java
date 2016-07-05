package org.smartas.security;

import org.smartas.core.model.CommonVO;

/**
 * 
 */
public class Group extends CommonVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7455231256212125627L;
	/**
	 * 
	 */
	private Short status;
	private boolean isDefaultIn;

	/**
	 * @return the status
	 */
	public Short getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(Short status) {
		this.status = status;
	}

	/**
	 * @return the isDefaultIn
	 */
	public boolean isDefaultIn() {
		return isDefaultIn;
	}

	/**
	 * @param isDefaultIn
	 *            the isDefaultIn to set
	 */
	public void setDefaultIn(boolean isDefaultIn) {
		this.isDefaultIn = isDefaultIn;
	}

}