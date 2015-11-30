/**
 * 
 */
package org.smartas.security.model;

import java.io.Serializable;

/**
 * @author chenb
 *
 */
public class Credentials implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6220323019727672121L;

	private String username;
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
