/*
 * 
 * 创建日期：2006-9-7
 * 
 * 版权所有：J.Bob
 */

package org.smartas.core;

import java.io.Serializable;
import java.util.List;



/**
 * 这个接口主要实现的功能和Dao接口一样，通用的功能就没有比较每个管理接口在自己实现了
 * 这也是一个比较重要的基础结构，唯一不好解决的是getObject()方法返回的是Object。
 * 需要寻找一个比较好的办法来实现，这个地方现在只能返回Object，有最终用户强行转换
 * 
 * 
 * 许多action中其实都不需要转换这个对象到特殊对象。需要的时候由用户自己决定。
 * 
 * @author chenjpu
 * 
 */
public interface Service<T extends Entity,PK extends Serializable> {

	/**
	 * 更具id号获得对象，可以返回。如果返回null，不作相应的异常处理
	 * 
	 * @param id
	 * @return
	 */

	T get(PK id) throws BusinessAccessException;

	/**
	 * 更具id号获得对象，一般不应该返回null。如果返回null，应该做相应的异常处理
	 * 
	 * @param id
	 * @return
	 * @throws BusinessAccessException
	 */

	T find(PK id) throws BusinessAccessException;
	
	/**
	 * 获得对象的总数
	 * 
	 * @return
	 */
	int getAllSize() throws BusinessAccessException;

	/**
	 * 获得指定范围内的对象集合
	 * 
	 * @param page
	 * @param pageSize
	 * @return
	 * @throws BusinessAccessException
	 */
	Pageable<T> getAll(int page, int pageSize) throws BusinessAccessException;

	List<T> getAll() throws BusinessAccessException;

	/**
	 * 存储对象 注意:这个地方应该会有检查是否存在此记录的业务逻辑
	 * 
	 * @param newObject
	 * @throws BusinessAccessException
	 */
	Serializable save(T o) throws BusinessAccessException;

	void update(T o) throws BusinessAccessException;
	
	/*T merge(T entity);
	
	
	void evict(T entity);*/

	/**
	 * 删除记录
	 * 
	 * @param id
	 * @throws BusinessAccessException
	 */
	void remove(PK id) throws BusinessAccessException;

	void remove(T o) throws BusinessAccessException;
}
