package org.smartas.core.dao;

import org.smartas.core.BaseDao;
import org.smartas.core.POJO;

/**
 * 
 * @author chenb
 *
 * @param <T> 基础表类，对于主键为long类型　，则直接继承该类，若主键为其他类型，
 * 需要直接继承BatisGenericDao
 */
public class BatisDaoImpl<T extends POJO> extends BatisGenericDao<T, Long> implements BaseDao<T> {

	public BatisDaoImpl(Class<T> persistType) {
		super(persistType);
	}

}
