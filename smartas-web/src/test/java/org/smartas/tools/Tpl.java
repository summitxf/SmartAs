/**
 * 
 */
package org.smartas.tools;

/**
 * @author chenb
 *
 */
public class Tpl {

	private final String tpl;
	
	private final String path;

	public Tpl(String tpl, String path) {
		super();
		this.tpl = tpl;
		this.path = path;
	}

	/**
	 * @return the tpl
	 */
	public String getTpl() {
		return tpl;
	}

	/**
	 * @return the path
	 */
	public String getPath() {
		return path;
	}
}
