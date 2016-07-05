package org.smartas.core.ui;

import java.io.Serializable;
import java.util.List;

import org.smartas.core.BusinessAccessException;
import org.smartas.core.POJO;
import org.smartas.core.Pageable;
import org.smartas.core.Service;
import org.smartas.core.annotation.Operation;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author chenb
 *
 * @param <T>
 * @param <PK>
 */
public abstract class GenericUI<T extends POJO, PK extends Serializable> {

	protected abstract Service<T, PK> getService();

	@RequestMapping(value = "/single/{id}", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public T get(@PathVariable("id") PK id) {
		return getService().get(id);
	}

	@RequestMapping(value = "/list/{page}/{pageSize}", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public Pageable<T> getAll1(@PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
		return getService().getAll(page, pageSize);
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<T> getAll() {
		return getService().getAll();
	}

	@RequestMapping(value = "/single", method = RequestMethod.POST)
	@Operation(code = Operation.CREATE, desc = Operation.CREATE_DESC)
	public Serializable save(@RequestBody T entity) {
		return getService().save(entity);
	}

	@RequestMapping(value = "/single", method = RequestMethod.PUT)
	@Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
	public Serializable update(@RequestBody T o) throws BusinessAccessException {
		getService().update(o);
		return o.getId();
	}

	@RequestMapping(value = "/single/{id}", method = RequestMethod.DELETE)
	@Operation(code = Operation.DELETE, desc = Operation.DELETE_DESC)
	public void remove(@PathVariable("id") PK id) throws BusinessAccessException {
		getService().remove(id);
	}

}
