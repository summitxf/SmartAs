package org.smartas.core;
import java.io.Serializable;


/**
 * 实体基础借口
 * @author chenb
 * 
 */
public interface POJO extends Serializable {
	
	/**
	 * id
	 * @return
	 */
	public abstract Serializable getId();
}