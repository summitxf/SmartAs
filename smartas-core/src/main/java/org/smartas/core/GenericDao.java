package org.smartas.core;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * @author chenjpu
 * 所有dao的父接口,用于实现通常的数据库访问
 * 
 * 注意::这个接口改进,主要用了jdk1.5的特性
 * 运用方法参数化类型.
 * @version 1.2
 */
public interface GenericDao<T extends Entity, PK extends Serializable> {
	/**
	 * 从数据库查询满足条件的对象,这里我们不处理找不到结果的情况,应为存在业务要求
	 * 数据库中是否已有这条记录
	 * @param id
	 * @return
	 * @throws DataAccessException
	 */
	T select(PK id);

	/**
	 * 返回某类对象在数据库中的记录数,分页用的比较多
	 * @return
	 * @throws DataAccessException
	 */
	int count();

	/**
	 * 返回数据库中此类记录的所有数据,按id排序
	 * @return
	 * @throws DataAccessException
	 */
	List<T> select();

	/**
	 * 返回数据库中此类记录的数据,满足查询边界.主要用在iBatis上,现在还没有研究hibernate上这个方法怎么实现
	 * @param skip
	 * @param pageSize
	 * @return
	 * @throws DataAccessException
	 */
	List<T> select(int skip, int max);

	/**
	 * 保存数据记录,更具id是否为空来判断是否插入新记录还是更新操作
	 * @param newObject
	 * @throws DataAccessException
	 */
	T insert(T entity);

	/**
	 * 更新数据记录
	 * @param Object
	 * @throws DataAccessException
	 */
	void update(T entity);

	//void merge(T entity);

	/**
	 * 删除记录
	 * @param id
	 * @throws DataAccessException
	 */
	void delete(PK id);

	void delete(T entity);

	//~~~
	//void evict(T entity);
	//List<T> getAll(QueryFilter filter);
}
