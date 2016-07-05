/**
 * 
 */
package org.smartas.tools;

/**
 * @author chenb
 *
 */
public class Project {

	private String name;
	
	private String[] packages;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the packages
	 */
	public String[] getPackages() {
		return packages;
	}

	/**
	 * @param packages the packages to set
	 */
	public void setPackages(String[] packages) {
		this.packages = packages;
	}
}
