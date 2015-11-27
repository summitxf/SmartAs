package org.smartas.core.dao;

import org.apache.ibatis.session.SqlSession;

/**
 * @author chenb
 *
 * @param <T>
 */
public interface BatisCallback<T> {

	T doInBatis(SqlSession session);

}