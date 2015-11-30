/**
 * 
 */
package org.smartas.security.model;

/**
 * @author chenb
 *
 */
public class LoginResult {

	private String context;
	
	private String home;
	
	private int status;

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public String getHome() {
		return home;
	}

	public void setHome(String home) {
		this.home = home;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
}
