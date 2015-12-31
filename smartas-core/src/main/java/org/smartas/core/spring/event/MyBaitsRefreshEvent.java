package org.smartas.core.spring.event;

/**
 * 
 * @author chenb
 *
 */
public class MyBaitsRefreshEvent extends AppEvent {
	/**
	 * 
	 */
	private static final long serialVersionUID = -892572421269110349L;

	private boolean sucess = true;

	/**
	 * @return the sucess
	 */
	public boolean isSucess() {
		return sucess;
	}

	/**
	 * @param sucess
	 *            the sucess to set
	 */
	public void setSucess(boolean sucess) {
		this.sucess = sucess;
	}

	public MyBaitsRefreshEvent() {
		super("dev");
	}
}
