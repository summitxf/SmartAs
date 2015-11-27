package org.smartas.core;
import java.io.Serializable;


/**
 * 实体基础借口
 * @author chenb
 * 
 */
public interface Entity extends Serializable {
	
	/**
	 * id
	 * @return
	 */
	public abstract Serializable getId();
}