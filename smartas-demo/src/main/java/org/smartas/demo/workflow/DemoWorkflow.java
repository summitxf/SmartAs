package org.smartas.demo.workflow;

import org.smartas.core.model.FlowAwareVO;

/**
 * 
 * 
 * @author ftl
 *
 */
public class DemoWorkflow extends FlowAwareVO {

	///

	/**
	 * 
	 */
	private static final long serialVersionUID = -7054391071593992109L;
	private String name;
	private int age;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the age
	 */
	public int getAge() {
		return age;
	}

	/**
	 * @param age
	 *            the age to set
	 */
	public void setAge(int age) {
		this.age = age;
	}
}
