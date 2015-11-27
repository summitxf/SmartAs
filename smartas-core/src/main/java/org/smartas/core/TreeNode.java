package org.smartas.core;

import java.io.Serializable;

/**
 * @author chenb
 *
 */
public abstract class TreeNode implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 644980061285907200L;

	private Serializable id;
	
	private String name;
	
	public TreeNode(Serializable id,String name) {
		this.id = id;
		this.name = name;
	}
	public TreeNode() {
	}
	public abstract boolean isLeaf();

	public Serializable getId() {
		return id;
	}

	public void setId(Serializable id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
