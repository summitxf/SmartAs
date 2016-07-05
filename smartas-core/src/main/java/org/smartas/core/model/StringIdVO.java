/**
 * 
 */
package org.smartas.core.model;

/**
 * @author chenb
 *
 */
public abstract class StringIdVO extends BaseVO {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6209705411621929527L;
	protected String id;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

}
