package org.smartas.core.dao;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.smartas.core.POJO;
import org.smartas.core.GenericDao;
import org.smartas.core.Page;
import org.springframework.dao.DataAccessException;

/**
 * 
 * @author chenjpu
 */
@SuppressWarnings("all")
public class BatisGenericDao<T extends POJO, PK extends Serializable> extends SqlSessionDaoSupport implements GenericDao<T, PK> {

	protected Class<T> clazz;

	public BatisGenericDao(Class<T> clazz) {
		this.clazz = clazz;
	}

	public T getById(PK id) throws DataAccessException {
		return super.getSqlSession().selectOne(clazz.getName(), id);
	}

	public List<T> selectAll() throws DataAccessException {
		return super.getSqlSession().selectList(selectStatement(clazz));
	}

	public List<T> select(final Page page) throws DataAccessException {
		return super.getSqlSession().selectList(selectStatement(clazz),new RowBounds(page.getFirstResult(), page.getMaxResult()));
	}

	public int getCountAll() throws DataAccessException {
		return ((Number)super.getSqlSession().selectOne(countStatement(clazz))).intValue();
	}

	public void deleteById(final Serializable id) throws DataAccessException {
		super.getSqlSession().delete(deleteStatement(clazz), id);
	}

	public void delete(T entity) {
		super.getSqlSession().delete(deleteStatement(clazz), entity.getId());
	}

	public void insert(T o) throws DataAccessException {
		super.getSqlSession().insert(insertStatement(clazz), o);
	}

	public void update(T o) throws DataAccessException {
		super.getSqlSession().update(updateStatement(clazz), o);
	}
	
	protected final List<T> select(String statement,final int offset, final int limit) throws DataAccessException {
		return this.select(statement, null, offset, limit);
	}
	protected final List<T> select(String statement,Object params,final int offset, final int limit) throws DataAccessException {
		return super.getSqlSession().selectList(statement(clazz,statement),params,new RowBounds(offset, limit));
	}
	
	protected final <B> B execute(BatisCallback action) throws DataAccessException {
		return (B)action.doInBatis(super.getSqlSession());
	}

	protected final <B> List<B> executeFind(BatisCallback BatisCallback) throws DataAccessException {
		return this.<List<B>>execute(BatisCallback);
	}

	protected final int executeInt(BatisCallback BatisCallback) throws DataAccessException {
		return this.<Number> execute(BatisCallback).intValue();
	}

	protected final long executeLong(BatisCallback BatisCallback) throws DataAccessException {
		return this.<Number> execute(BatisCallback).longValue();
	}


	// 所有这些方法都可以重写

	protected String getNamespace(Class<?> clazz) {
		return clazz.getName();
	}

	protected String selectByIdStatement(Class<?> clazz) {
		return getNamespace(clazz) + ".getById";
	}

	protected String selectStatement(Class<?> clazz) {
		return getNamespace(clazz) + ".select";
	}

	protected String countStatement(Class<?> clazz) {
		return getNamespace(clazz) + ".count";
	}

	protected String deleteStatement(Class<?> clazz) {
		return getNamespace(clazz) + ".delete";
	}

	protected String insertStatement(Class<?> clazz) {
		return getNamespace(clazz) + ".insert";
	}

	protected String updateStatement(Class<?> clazz) {
		return getNamespace(clazz) + ".update";
	}
	protected String mergeStatement(Class<?> clazz) {
		return getNamespace(clazz) + ".merge";
	}
	
	protected String statement(Class<?> clazz,String statement) {
		return getNamespace(clazz) + "." + statement;
	}
}