package org.smartas.security.model;

import org.smartas.core.model.BaseModel;

/**
 * 
 */
public class Role extends BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1449084482294160348L;
	public static final String SUPER_RIGHTS = "__ALL";
	public static String ROLE_PUBLIC = "ROLE_PUBLIC";
	public static String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";

	private Short status;
	private String rights;
	private boolean defaultIn;

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
	 * @return the rights
	 */
	public String getRights() {
		return rights;
	}

	/**
	 * @param rights
	 *            the rights to set
	 */
	public void setRights(String rights) {
		this.rights = rights;
	}

	/**
	 * @return the isDefaultIn
	 */
	public boolean isDefaultIn() {
		return defaultIn;
	}

	/**
	 * @param isDefaultIn
	 *            the isDefaultIn to set
	 */
	public void setDefaultIn(boolean defaultIn) {
		this.defaultIn = defaultIn;
	}

}